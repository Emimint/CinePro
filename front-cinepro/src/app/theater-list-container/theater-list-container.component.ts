import { AfterViewInit, Component } from '@angular/core';

declare const initMap: any;

@Component({
  selector: 'app-theater-list-container',
  templateUrl: './theater-list-container.component.html',
  styleUrl: './theater-list-container.component.css',
})
export class TheaterListContainerComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initMap();
  }
}
