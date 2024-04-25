import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { Seance } from '../models/seance';

@Component({
  selector: 'app-show-selection',
  templateUrl: './show-selection.component.html',
  styleUrls: ['./show-selection.component.css'],
})
export class ShowSelectionComponent implements OnInit {
  films: Film[] = [];
  seances: Seance[] = [];
  filmId: string = '';
  selectedMovie: Film;

  constructor(private filmService: FilmService) {}
  ngOnInit(): void {
    this.getFilms();
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

  fetchFilmImage(film: Film): void {
    this.filmService.fetchFilmImage(film.id).subscribe(
      (image) => {
        film.image = image;
      },
      (error) => {
        console.error("Erreur lors de la recuperation de l'image:", error);
      }
    );
  }

  onMovieSelection(): void {
    this.selectedMovie = this.films.find(
      (film: Film) => film.id === Number(this.filmId)
    );
    this.getSeances();
  }

  getSeances(): void {
    this.filmService.getFilmSeances(this.selectedMovie.id).subscribe(
      (seances) => {
        this.seances = seances;
        console.log(this.seances);
      },
      (error) => {
        console.error('Error fetching seances:', error);
      }
    );
  }
}
