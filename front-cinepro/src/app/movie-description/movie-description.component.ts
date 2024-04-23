import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrl: './movie-description.component.css',
})
export class MovieDescriptionComponent implements OnInit {
  filmId: number;
  showMoreInfo: any[] = [];

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.filmId = +this.route.snapshot.paramMap.get('filmId');
  }

  toggleMoreInfo(): void {
    if (this.showMoreInfo.length === 0) {
      this.showMoreInfo.push({});
    } else {
      this.showMoreInfo = [];
    }
  }
}
