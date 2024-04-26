import { Reservation } from './reservation';
import { Seance } from './seance';

export class Siege {
  id: number;
  numeroSiege: string;
  rangeeSiege: string;
  sectionSiege: string;
  estReserve: boolean;
  reservation: Reservation;
  seance: Seance;
}
