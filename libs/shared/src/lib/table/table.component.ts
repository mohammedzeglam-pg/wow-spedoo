import { Component, EventEmitter, Input, Output } from '@angular/core';
type TableHeader = { name: string; title?: string };
type Eve = { name: string; value: number };
@Component({
  selector: 'wow-spedoo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Output() changePagination = new EventEmitter<Eve>();
  @Input() page = 1;
  @Input() tableHeader: TableHeader[] = [];
  nextPage(): void {
    this.page++;
    this.changePagination.emit({
      name: 'page',
      value: this.page,
    });
  }

  prevPage(): void {
    if (this.page <= 1) {
      return;
    }
    this.page--;
    this.changePagination.emit({
      name: 'page',
      value: this.page,
    });
  }
}
