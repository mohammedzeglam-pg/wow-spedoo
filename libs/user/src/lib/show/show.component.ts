import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserResponse } from '@wow-spedoo/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { map } from 'rxjs/internal/operators/map';
import { SubSink } from 'subsink';
import { UserService } from '../user.service';

@Component({
  selector: 'wow-spedoo-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit, OnDestroy {
  modal = {
    addZone: false,
    addProfit: false,
  };
  zoneSubject = new BehaviorSubject<{ modal: boolean; user: number }>({
    modal: false,
    user: 0,
  });
  profitSubject = new BehaviorSubject<{ modal: boolean; user: number }>({
    modal: false,
    user: 0,
  });

  sub = new SubSink();
  take = 10;
  page = 1;
  link = '';
  content = <any>[];
  tableHeader = [
    { name: 'اسم المستخدم' },
    { name: 'الاسم الأول' },
    { name: 'اللقب' },
    { name: 'رقم الهاتف' },
    { name: 'الوظيفة' },
    { name: 'سماحية تسجيل الدخول' },
    { name: 'الاحداث' },
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

  roles = [
    {
      key: 'admin',
      value: 'أدمن',
    },
    {
      key: 'manager',
      value: 'مدير',
    },
    {
      key: 'partner',
      value: 'شريك',
    },
    {
      key: 'picker',
      value: 'فتى استلام',
    },
    {
      key: 'delivery',
      value: 'فتى توصيل',
    },
  ];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserData();
    this.zoneSubject.subscribe((data) => {
      this.modal.addZone = data.modal;
    });
    this.profitSubject.subscribe((data) => {
      this.modal.addProfit = data.modal;
    });
  }

  onSuccess(data: UserResponse[]) {
    this.content = data.map((el) => {
      const obj: any = {
        ...el,
      };
      if (obj.is_allowed) {
        obj.is_allowed = 'نعم';
      } else {
        obj.is_allowed = 'لا';
      }
      for (const role of this.roles) {
        if (obj.role.toLowerCase() == role.key) {
          obj['access'] = role.value;
        }
      }
      return obj;
    });
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
      this.userService.deleteUser(id).subscribe(() => this.fetchUserData()),
    );
  }
  addZone(id: number) {
    this.modal.addZone = true;
    this.zoneSubject.next({ modal: true, user: id });
  }
  addProfit(id: number) {
    this.modal.addProfit = true;
    this.profitSubject.next({ modal: true, user: id });
  }
}
