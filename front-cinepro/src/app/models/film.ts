import { Image } from './image';

export class Film {
  id: number;
  langue?: string;
  soustitre?: string;
  doublage?: string;
  categorie?: string;
  titre?: string;
  duree?: string;
  videoUrl?: string;
  listeActeurs?: string;
  listeRealisateurs?: string;
  titreOriginal?: string;
  description?: string;
  dateDeSortie?: Date;
  classement?: number;
  image?: Image;
}
