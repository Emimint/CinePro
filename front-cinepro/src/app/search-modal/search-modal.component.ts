import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css'
})
export class SearchModalComponent {

  films: Film[] = [];


  constructor(private filmService: FilmService){}
    ngOnInit():void{
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

  public searchFilm(key: string): void {
    console.log(key);
    const results: Film[] = [];
    for (const film of this.films) {
      if (
        film.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
        
      ) {
        results.push(film);
      }
    }
    this.films = results;
    if (!key) {
      this.getFilms();
     }
  }

}
