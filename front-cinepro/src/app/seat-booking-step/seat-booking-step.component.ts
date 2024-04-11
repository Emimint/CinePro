import { Component } from '@angular/core';

//  declare function showSeatInfo(seatId: string, seatElement: string): void;
//  declare function toggleSeatStatus(seatId: string): void;
declare function greet(): void;
declare function initSeatMap();

@Component({
  selector: 'app-seat-booking-step',
  templateUrl: './seat-booking-step.component.html',
  styleUrls: ['./seat-booking-step.component.css'],
})
export class SeatBookingStepComponent {
  constructor() {
  }

}
