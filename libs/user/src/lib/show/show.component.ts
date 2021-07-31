import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserResponse } from '@wow-spedoo/api-interfaces';
import { map } from 'rxjs/internal/operators/map';
import { SubSink } from 'subsink';
import { UserService } from '../user.service';

@Component({
  selector: 'wow-spedoo-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit, OnDestroy {
  notify = {
    message: '',
    state: false,
    isDanger: false,
    isPrimary: false,
  };
  sub = new SubSink();
  take = 10;
  page = 1;
  link = '';
  content: UserResponse[] = [];
  tableHeader = [
    { name: 'اسم المستخدم' },
    { name: 'الاسم الأول' },
    { name: 'اللقب' },
    { name: 'رقم الهاتف' },
    { name: 'سماحية تسجيل الدخول' },
  ];
  userFetch = [
    {
      name: 'الكل',
      link: '',
    },
    {
      name: 'شريك',
      link: '/partner',
    },
    {
      name: 'توصيل',
      link: '/delivery',
    },
    {
      name: 'استلام',
      link: '/pick',
    },
  ];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  onSuccess(res: { data: UserResponse[] }) {
    this.content = [];
    for (const user of res.data) {
      this.content.push(user);
    }
  }
  changePage(eve: { name: string; value: number }) {
    if (eve.name === 'page') {
      this.page = eve.value;
      this.fetchUserData();
    }
  }

  changeRole(select: EventTarget | null) {
    const element = select as HTMLSelectElement;
    if (element) {
      this.link = element.value;
      this.page = 1;
      this.take = 10;

      this.fetchUserData();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  changeTake(eve: EventTarget | null) {
    const take = parseInt((eve as HTMLInputElement)?.value);
    if (take >= 0) {
      this.take = take;
    } else {
      this.fetchUserData();
    }
  }

  private fetchUserData() {
    this.sub.add(
      this.userService
        .fetchUsers(this.link, { take: this.take, skip: this.page - 1 })
        .pipe(map((data) => this.onSuccess(data)))
        .subscribe(),
    );
  }
  deleteUser(id: number) {
    this.sub.add(
      this.userService
        .deleteUser(id)
        .pipe(
          map((data) => {
            this.notify.isPrimary = true;
            this.notify.message = data.message;
            this.notify.state = true;
          }),
        )
        .subscribe(),
    );
  }
}
