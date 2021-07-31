import { Component, Input } from '@angular/core';

@Component({
  selector: 'wow-spedoo-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() notify = {
    message: '',
    state: false,
    isDanger: false,
    isPrimary: false,
  };

  deleteNotification() {
    this.notify.state = false;
    this.notify.isDanger = false;
    this.notify.isPrimary = false;
  }
}
