import { Film } from './film';
import { SalleDeCinema } from './salle-de-cinema';

export class Seance {
  id: number;
  heureDebut: Date;
  ultraAVX: boolean;
  imax: boolean;
  troisD: boolean;
  salleDeCinema: SalleDeCinema;
  film: Film;
}
