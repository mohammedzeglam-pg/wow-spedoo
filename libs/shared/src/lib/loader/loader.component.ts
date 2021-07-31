import { Component } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'wow-spedoo-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService) {}
}
