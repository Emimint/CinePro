import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CinemaService } from '../services/cinema.service';
import { Cinema } from '../models/cinema';

declare var initMap: any;

@Component({
  selector: 'app-theater-list-container',
  templateUrl: './theater-list-container.component.html',
  styleUrl: './theater-list-container.component.css',
})
export class TheaterListContainerComponent implements AfterViewInit {
  cinemas: Cinema[] = [];
  cinemasPositions: { name: string; longitude: number; latitude: number }[] =
    [];

  constructor(private cinemaService: CinemaService) {}
  ngAfterViewInit(): void {
    this.getCinemas();
  }

  public getCinemas(): void {
    this.cinemaService.getAllCinemas().subscribe(
      (cinemas) => {
        this.cinemas = cinemas;
        this.getCinemasAddresses();
      },
      (error) => {
        console.error('Erreur lors de la récupération des cinémas:', error);
      }
    );
  }

  public getCinemasAddresses(): void {
    this.cinemas.forEach((cinema) => {
      this.cinemaService.getCinemaAddressById(cinema.id).subscribe(
        (adresse) => {
          cinema.adresse = adresse;
          this.cinemasPositions.push({
            name: cinema.nomCinema,
            longitude: cinema.adresse.longitude,
            latitude: cinema.adresse.latitude,
          });
          try {
            initMap(this.cinemasPositions);
          } catch (error) {
            console.warn('initMap non prêt');
          }
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des adresses des cinémas:',
            error
          );
        }
      );
    });
  }
}
