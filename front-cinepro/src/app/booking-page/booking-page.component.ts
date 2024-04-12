import { Component,OnInit } from '@angular/core';

declare function initSeatMap();
@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css'
})
export class BookingPageComponent implements OnInit {
   
  ngOnInit(){
    initSeatMap();
  }
  
}
