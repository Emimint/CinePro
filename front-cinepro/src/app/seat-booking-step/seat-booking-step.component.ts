import { Component, AfterViewInit } from '@angular/core';

declare const initSeatMap: any;

@Component({
  selector: 'app-seat-booking-step',
  templateUrl: './seat-booking-step.component.html',
  styleUrls: ['./seat-booking-step.component.css'],
})
export class SeatBookingStepComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    // Initialisation de la carte des sièges du côté frontend :
    initSeatMap(3, 5, 8);
  }
}
