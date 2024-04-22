import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  films: Film[] = [];

  constructor(private filmService: FilmService) {}
  ngOnInit(): void {
    this.getFilms();
    console.log(this.films);
  }

  public getFilms(): void {
    this.filmService.list().subscribe(
      (films) => {
        this.films = films;
        this.films.forEach((film) => this.fetchFilmImage(film));
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  fetchFilmImage(movie: Film): void {
    this.filmService.fetchFilmImage(movie.id).subscribe(
      (image) => {
        movie.image = image;
      },
      (error) => {
        console.error('Error fetching image for movie:', error);
      }
    );
  }
}
