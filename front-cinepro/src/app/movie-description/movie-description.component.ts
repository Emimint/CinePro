import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../services/film.service';
import { Film } from '../models/film';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrl: './movie-description.component.css',
})
export class MovieDescriptionComponent implements OnInit {
  film: Film;
  showMoreInfo: any[] = [];

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    var filmId: Number = +this.route.snapshot.paramMap.get('filmId');
    if (filmId) {
      this.getFilm(+filmId);
    }
  }

  toggleMoreInfo(): void {
    if (this.showMoreInfo.length === 0) {
      this.showMoreInfo.push({});
    } else {
      this.showMoreInfo = [];
    }
  }

  getFilm(id: number): void {
    this.filmService.getFilm(id).subscribe((film) => {
      this.film = film;
    });
  }
}
