import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { Seance } from '../models/seance';
import { Cinema } from '../models/cinema';

@Component({
  selector: 'app-show-selection',
  templateUrl: './show-selection.component.html',
  styleUrls: ['./show-selection.component.css'],
})
export class ShowSelectionComponent implements OnInit {
  films: Film[] = [];
  seances: Seance[] = [];
  cinemas: Cinema[] = [];
  filmId: string = '';
  selectedMovie: Film;
  selectedCinema: Cinema;
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
    this.selectedMovie = this.films.find(
      (film: Film) => film.id === Number(this.filmId)
    );
    this.selectedDate = null;
    this.selectedCinema = null;
    this.getSeances();
    this.getCinemas();
  }

  onCinemaSelection(event: any): void {
    const selectedCinemaName = event.target.value;
    console.log('selectedCinema', selectedCinemaName);

    this.selectedCinema = this.cinemas.find(
      (cinema: Cinema) => cinema.nomCinema === selectedCinemaName
    );

    // this.seances = this.seances.filter(
    //   (seance: Seance) =>
    //     this.filmService.getCinemaBySeance(seance.id)?.id ===
    //     this.selectedCinema.id
    // );
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

  getCinemas(): void {
    this.filmService.getFilmCinemas(this.selectedMovie.id).subscribe(
      (cinemas) => {
        this.cinemas = cinemas;
      },
      (error) => {
        console.error('Error fetching cinemas:', error);
      }
    );
    console.log('cinemas', this.cinemas);
  }
}
