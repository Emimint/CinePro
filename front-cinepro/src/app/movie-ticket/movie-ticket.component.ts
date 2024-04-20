import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-ticket',
  templateUrl: './movie-ticket.component.html',
  styleUrl: './movie-ticket.component.css',
})
export class MovieTicketComponent {
  @Input() backgroundColor: string = 'black';
  @Input() color: string = 'black';
}
