import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-agent-movie',
  templateUrl: './admin-agent-movie.component.html',
  styleUrl: './admin-agent-movie.component.css'
})
export class AdminAgentMovieComponent {
  currentTab: string = 'Films';

  constructor() { }

  openTab(tabName: string) {
    this.currentTab = tabName;
  }
}
