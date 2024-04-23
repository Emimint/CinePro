import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilmService } from '../services/film.service';
import { Film } from '../models/film';

@Component({
  selector: 'app-movie-ticket',
  templateUrl: './movie-ticket.component.html',
  styleUrl: './movie-ticket.component.css',
})
export class MovieTicketComponent {
  @Input() backgroundColor: string = 'black';
  @Input() color: string = 'black';
  @Input() filmId: string;
  @Input() showVideo: boolean = true;

  film: Film;

  constructor(
    private filmService: FilmService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.filmId) {
      this.getFilm(+this.filmId);
    }
  }

  getFilm(id: number): void {
    this.filmService.getFilm(id).subscribe((film) => {
      this.film = film;
      this.fetchFilmImage(film);
    });
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

  getSafeVideoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.film.videoUrl);
  }
}
