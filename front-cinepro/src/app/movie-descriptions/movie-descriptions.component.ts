import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-descriptions',
  templateUrl: './movie-descriptions.component.html',
  styleUrl: './movie-descriptions.component.css'
})
export class MovieDescriptionsComponent {
  showMoreInfo: any[] =   [];
  toggleMoreInfo(): void{
   if(this.showMoreInfo.length === 0) {
     this.showMoreInfo.push({});
   }else{
    this.showMoreInfo =   [];
   }
  }
}
