import { Image } from './image';

export class Film {
  id: number;
  langue?: string;
  soustitre?: string;
  doublage?: string;
  titre?: string;
  titreOriginal?: string;
  description?: string;
  dateDeSortie?: Date;
  classement?: number;
  image?: Image;
}
