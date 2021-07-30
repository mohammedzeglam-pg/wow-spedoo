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
      <svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="none"><path d="M0 0h24v24h-24v-24Z"></path><path stroke="#323232" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.001v2.439"></path><path stroke="#323232" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13h-2"></path><path stroke="#323232" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13h2"></path><path stroke="#323232" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.36 6.64l-4.956 4.956"></path><path stroke="#323232" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.981 11c1.105 0 2 .895 2 2 0 1.105-.895 2-2 2 -1.105 0-2-.895-2-2 0-1.105.895-2 2-2"></path><path stroke="#323232" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.64 6.64l2.12 2.12"></path><path stroke="#323232" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.24 17.24l2.12 2.12 .004.004c3.515-3.515 3.515-9.213 0-12.728 -3.515-3.515-9.213-3.515-12.728 0 -3.515 3.515-3.515 9.213 0 12.728l.004-.004 2-2"></path></g></svg>
      `,
      link: 'hello',
    },
  ];
  string2HTML(str: string) {
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(str, 'text/html');
    // console.log(doc.body.firstElementChild);
    // return doc.body.firstElementChild;
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }
  constructor(private sanitizer: DomSanitizer) {}
}
