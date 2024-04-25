import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { Cinema } from '../models/cinema';
import { CinemaService } from '../services/cinema.service';

@Component({
  selector: 'app-admin-agent-movie',
  templateUrl: './admin-agent-movie.component.html',
  styleUrl: './admin-agent-movie.component.css',
})
export class AdminAgentMovieComponent {
  currentTab: string = 'Films';
  films: Film[] = [];
  cinemas: Cinema[] = [];

  constructor(
    private filmService: FilmService,
    private cinemaService: CinemaService
  ) {}

  openTab(tabName: string) {
    this.currentTab = tabName;
  }

  ngOnInit(): void {
    this.getFilms();
    this.getCinemas();
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

  public getCinemas(): void {
    this.cinemaService.getAllCinemas().subscribe(
      (cinemas) => {
        this.cinemas = cinemas;
        this.getCinemasAddresses();
      },
      (error) => {
        console.error('Error fetching cinemas:', error);
      }
    );
  }

  private getCinemasAddresses(): void {
    this.cinemas.forEach((cinema) => {
      this.cinemaService.getCinemaAddressById(cinema.id).subscribe(
        (adresse) => {
          cinema.adresse = adresse;
        },
        (error) => {
          console.error('Error fetching address for cinema:', error);
        }
      );
    });
  }

  public getCinemaAddress(cinema: Cinema): string {
    if (cinema.adresse) {
      return `${cinema.adresse.numeroCivique}, ${cinema.adresse.nomRue}, ${cinema.adresse.codePostal}, ${cinema.adresse.ville}`;
    }
    return '';
  }
}
