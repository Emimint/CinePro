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
  selectedDate: Date | null = null;

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
    console.log('Selected movie:', this.selectedMovie);
    console.log('Selected date:', this.selectedDate);
    this.selectedMovie = this.films.find(
      (film: Film) => film.id === Number(this.filmId)
    );
    this.getSeances();
  }

  getSeances(): void {
    if (!this.selectedDate) {
      this.filmService.getFilmSeances(this.selectedMovie.id).subscribe(
        (seances) => {
          this.seances = seances;
          console.log(this.seances);
        },
        (error) => {
          console.error('Error fetching seances:', error);
        }
      );
    } else {
      this.filmService.getFilmSeances(this.selectedMovie.id).subscribe(
        (seances) => {
          this.seances = seances.filter((seance) => {
            const selectedDate = new Date(this.selectedDate);
            const seanceDate = new Date(seance.heureDebut);
            return (
              selectedDate.getFullYear() === seanceDate.getFullYear() &&
              selectedDate.getMonth() === seanceDate.getMonth() &&
              selectedDate.getDate() === seanceDate.getDate()
            );
          });
        },
        (error) => {
          console.error('Error fetching seances:', error);
        }
      );
    }
  }
}
