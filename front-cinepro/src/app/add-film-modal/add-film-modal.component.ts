import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-add-film-modal',
  templateUrl: './add-film-modal.component.html',
  styleUrls: ['./add-film-modal.component.css']
})
export class AddFilmModalComponent{

  modalTitle: string = 'Ajouter un film';
  formFields: { label: string, formControlName: string }[] = [
    { label: 'Titre Original', formControlName: 'originalTitle' },
    { label: 'Catégorie', formControlName: 'category' },
    { label: 'Réalisateur', formControlName: 'directors' },
    { label: 'URL', formControlName: 'url' },
    { label: 'Titre', formControlName: 'title' },
    { label: 'Doublage', formControlName: 'dubbing' },
    { label: 'Acteurs', formControlName: 'actors' },
    { label: 'Classement', formControlName: 'ranking' }
  ];

  constructor(private filmService: FilmService) {}

  onSubmit(formData: any): void {
    this.filmService.addFilm(formData).subscribe(
      response => {
        console.log('Film enregistré avec succès :', response);
        // Réinitialiser le formulaire ou effectuer d'autres actions après l'enregistrement
      },
      error => {
        console.error('Erreur lors de l\'enregistrement du film :', error);
        // Gérer les erreurs ici
      }
    );
  }
}
