import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'front-cinepro';

  ngOnInit(): void {
    if (!navigator.geolocation) {
      alert(
        'Vous devez activer la géolocalisation dans les paramètres de votre navigateur.'
      );
      return;
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('latitude: ', position.coords.latitude);
        console.log('longitude: ', position.coords.longitude);
      });
    }
  }
}
