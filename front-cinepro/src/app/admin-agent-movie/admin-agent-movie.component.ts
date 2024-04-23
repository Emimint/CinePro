import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-admin-agent-movie',
  templateUrl: './admin-agent-movie.component.html',
  styleUrl: './admin-agent-movie.component.css',
})
export class AdminAgentMovieComponent {
  currentTab: string = 'Films';
  films: Film[] = [];

  constructor(private filmService: FilmService) {}

  openTab(tabName: string) {
    this.currentTab = tabName;
  }

  ngOnInit(): void {
    this.getFilms();
  }

  public getFilms(): void {
    this.filmService.list().subscribe(
      (films) => {
        this.films = films;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }
}
