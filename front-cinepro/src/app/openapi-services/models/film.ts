/* tslint:disable */
/* eslint-disable */
import { Seance } from '../models/seance';
export interface Film {
  categorie?: string;
  classement?: number;
  dateDeSortie?: string;
  description?: string;
  doublage?: string;
  duree?: string;
  id?: number;
  langue?: string;
  listeActeurs?: string;
  listeRealisateurs?: string;
  seances?: Array<Seance>;
  soustitre?: string;
  titre?: string;
  titreOriginal?: string;
  videoUrl?: string;
}
