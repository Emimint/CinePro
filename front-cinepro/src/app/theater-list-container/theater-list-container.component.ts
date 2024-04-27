import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CinemaService } from '../services/cinema.service';
import { Cinema } from '../models/cinema';

declare var initMap: any;

@Component({
  selector: 'app-theater-list-container',
  templateUrl: './theater-list-container.component.html',
  styleUrl: './theater-list-container.component.css',
})
export class TheaterListContainerComponent implements OnInit {
  cinemas: Cinema[] = [];
  montrealLocations: { name: string; longitude: number; latitude: number }[] = [
    { name: 'Downtown Montreal', longitude: -73.5673, latitude: 45.5017 },
    { name: 'Montreal Botanical Garden', longitude: -73.559, latitude: 45.56 },
    { name: 'Mount Royal', longitude: -73.5877, latitude: 45.5 },
    { name: 'Old Port of Montreal', longitude: -73.5501, latitude: 45.5091 },
    { name: 'Olympic Stadium', longitude: -73.5517, latitude: 45.5583 },
  ];

  constructor(private cinemaService: CinemaService) {}
  ngOnInit(): void {
    this.getCinemas();
    initMap(this.montrealLocations);
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
}
