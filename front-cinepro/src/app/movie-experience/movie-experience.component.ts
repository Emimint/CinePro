import { Component, Input } from '@angular/core';
import { Seance } from '../models/seance';
import { Film } from '../models/film';

@Component({
  selector: 'app-movie-experience',
  templateUrl: './movie-experience.component.html',
  styleUrl: './movie-experience.component.css',
})
export class MovieExperienceComponent {
  @Input() seance: Seance;
  @Input() selectedMovie: Film;
}
