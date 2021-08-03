import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
type Prop = {
  name: string;
  icon: string;
  link: string;
  sub?: [
    {
      name: string;
      icon: string;
      link: string;
    },
  ];
};
@Component({
  selector: 'wow-spedoo-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  props: Prop[] = [
    {
      name: 'لوحة التحكم',
      icon: `
       fa-tasks
      `,
      link: '/dashboard',
    },
    {
      name: 'المستخدمين',
      icon: `
      fa-users
      `,
      link: '/dashboard/user',
      sub: [
        {
          name: 'اضافة',
          icon: `
          fa-user-plus
          `,
          link: '/dashboard/user/create',
        },
      ],
    },
    {
      name: 'طرق الدفع',
      link: '/dashboard/payment',
      icon: `
      fa-credit-card
      `,
      sub: [
        {
          name: 'اضافة',
          icon: ` fa-plus `,
          link: '/dashboard/payment/create',
        },
      ],
    },
    {
      name: 'الأقاليم',
      link: '/dashboard/region',
      icon: `
      fa-location-arrow
      `,
    },
  ];
  string2HTML(str: string) {
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }
  constructor(private sanitizer: DomSanitizer) {}
}
