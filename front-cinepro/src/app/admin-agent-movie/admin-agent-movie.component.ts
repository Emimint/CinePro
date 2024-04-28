import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { Cinema } from '../models/cinema';
import { CinemaService } from '../services/cinema.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-admin-agent-movie',
  templateUrl: './admin-agent-movie.component.html',
  styleUrl: './admin-agent-movie.component.css',
})
export class AdminAgentMovieComponent {
  currentTab: string = 'Films';
  films: Film[] = [];
  cinemas: Cinema[] = [];
  addForm: FormGroup;
  updateForm: FormGroup;
  @ViewChild('addFilmModal') addFilmModal!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private filmService: FilmService,
    private cinemaService: CinemaService,
    private router: Router
  ) {}

  openTab(tabName: string) {
    this.currentTab = tabName;
  }

  ngOnInit(): void {
    this.getFilms();
    this.getCinemas();
    this.addForm = this.formBuilder.group({
      titre: ['', Validators.required],
      langue: [''],
      duree: [''],
      soustitre: [''],
      doublage: [''],
      categorie: [''],
      titreOriginal: [''],
      description: [''],
      dateDeSortie: [''],
      classement: [''],
      videoUrl: [''],
      listeActeurs: [''],
      listeRealisateurs: [''],
      file: [''],
    });
  }

  public getFilms(): void {
    this.filmService.list().subscribe(
      (films) => {
        this.films = films;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
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

  public getCinemaAddress(cinema: Cinema): string {
    if (cinema.adresse) {
      return `${cinema.adresse.numeroCivique}, ${cinema.adresse.nomRue}, ${cinema.adresse.codePostal}, ${cinema.adresse.ville}`;
    }
    return '';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.addForm.patchValue({
      file: file,
    });
  }

  public onAddFilm(): void {
    if (this.addForm.valid) {
      const formData = new FormData();
      formData.append('file', this.addForm.get('file').value);
      formData.append('titre', this.addForm.get('titre').value);
      formData.append('langue', this.addForm.get('langue').value);
      formData.append('soustitre', this.addForm.get('soustitre').value);
      formData.append('doublage', this.addForm.get('doublage').value);
      formData.append('titreOriginal', this.addForm.get('titreOriginal').value);
      formData.append('categorie', this.addForm.get('categorie').value);
      formData.append('listeActeurs', this.addForm.get('listeActeurs').value);
      formData.append(
        'listeRealisateurs',
        this.addForm.get('listeRealisateurs').value
      );
      formData.append('duree', this.addForm.get('duree').value);
      formData.append('videoUrl', this.addForm.get('videoUrl').value);
      formData.append('description', this.addForm.get('description').value);
      formData.append('dateDeSortie', this.addForm.get('dateDeSortie').value);

      this.filmService.addFilm(formData).subscribe((response) => {
        console.error('Successfully added movie:', response);
        this.resetForm(this.addForm);
        this.closeModal();
        this.router.navigate(['/admin-agent-movie']);
      });
    }
  }

  // public onUpdateFilm(filmId: number): void {
  public onUpdateFilm(): void {
    // if (this.updateForm.valid) {
    //   const formData = new FormData();
    //   formData.append('file', this.updateForm.get('file').value);
    //   formData.append('titre', this.updateForm.get('titre').value);
    //   formData.append('langue', this.updateForm.get('langue').value);
    //   formData.append('soustitre', this.updateForm.get('soustitre').value);
    //   formData.append('doublage', this.updateForm.get('doublage').value);
    //   formData.append('duree', this.updateForm.get('duree').value);
    //   formData.append('videoUrl', this.updateForm.get('videoUrl').value);
    //   formData.append(
    //     'listeActeurs',
    //     this.updateForm.get('listeActeurs').value
    //   );
    //   formData.append(
    //     'listeRealisateurs',
    //     this.updateForm.get('listeRealisateurs').value
    //   );
    //   formData.append(
    //     'titreOriginal',
    //     this.updateForm.get('titreOriginal').value
    //   );
    //   formData.append('categorie', this.updateForm.get('categorie').value);
    //   formData.append('description', this.updateForm.get('description').value);
    //   formData.append(
    //     'dateDeSortie',
    //     this.updateForm.get('dateDeSortie').value
    //   );
    //   this.filmService.updateFilm(filmId, formData).subscribe(
    //     (response) => {
    //       console.log('Film updated successfully:', response);
    //       // Close modal or reload page here
    //     },
    //     (error) => {
    //       console.error('Error updating film:', error);
    //     }
    //   );
    // }
  }

  private resetForm(form: FormGroup): void {
    if (form) {
      form.reset();
    }
  }

  public openUpdateModal(film: Film): void {
    this.updateForm = this.formBuilder.group({
      titre: [film.titre],
      langue: [film.langue],
      duree: [film.duree],
      soustitre: [film.soustitre],
      doublage: [film.doublage],
      categorie: [film.categorie],
      titreOriginal: [film.titreOriginal],
      description: [film.description],
      dateDeSortie: [
        new Date(film.dateDeSortie).toISOString().substring(0, 10),
      ],
      classement: [film.classement],
      videoUrl: [film.videoUrl],
      listeActeurs: [film.listeActeurs],
      listeRealisateurs: [film.listeRealisateurs],
      file: [''],
    });
    this.onUpdateFilm();
    // this.onUpdateFilm(film.id);
  }

  public deleteFilm(filmId: number): void {
    if (confirm('Are you sure you want to delete this film?')) {
      this.filmService.deleteFilm(filmId).subscribe(
        (response) => {
          console.log('Film deleted successfully:', response);
          this.router.navigate(['/admin-agent-movie']);
        },
        (error) => {
          console.error('Error deleting film:', error);
        }
      );
    }
  }

  closeModal(): void {
    $(this.addFilmModal.nativeElement).modal('hide');
  }
}
