import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CinemaService } from '../services/cinema.service';
import { Cinema } from '../models/cinema';

declare const initMap: any;

@Component({
  selector: 'app-theater-list-container',
  templateUrl: './theater-list-container.component.html',
  styleUrl: './theater-list-container.component.css',
})
export class TheaterListContainerComponent implements OnInit, AfterViewInit {
  cinemas: Cinema[] = [];
  markers: any = [];

  constructor(private cinemaService: CinemaService) {}
  ngOnInit(): void {
    this.getCinemas();
  }
  ngAfterViewInit(): void {
    initMap();
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

  // public addMarker(lng, lat, name) {
  //   var marker = L.marker([lng, lat]).addTo(map);
  //   marker.bindPopup(name);
  //   this.markers.push(marker);
  // }
}
