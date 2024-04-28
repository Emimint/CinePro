import { Component, Input, OnInit } from '@angular/core';
import { Cinema } from '../models/cinema';

@Component({
  selector: 'app-theater-list',
  templateUrl: './theater-list.component.html',
  styleUrl: './theater-list.component.css',
})
export class TheaterListComponent implements OnInit {
  @Input() cinemas: any;
  ngOnInit(): void {
    console.log('cinémas', this.cinemas);
  }

  public getCinemaAddress(cinema: Cinema): string {
    if (cinema.adresse) {
      return `${cinema.adresse.numeroCivique}, ${cinema.adresse.nomRue}, ${cinema.adresse.codePostal}, ${cinema.adresse.ville}`;
    }
    return '';
  }
}
