import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrl: './movie-description.component.css'
})
export class MovieDescriptionComponent {
  showMoreInfo: any[] =   [];
  toggleMoreInfo(): void{
   if(this.showMoreInfo.length === 0) {
     this.showMoreInfo.push({});
   }else{
    this.showMoreInfo =   [];
   }
  }
}
