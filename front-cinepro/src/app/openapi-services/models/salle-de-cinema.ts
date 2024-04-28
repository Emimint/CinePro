/* tslint:disable */
/* eslint-disable */
import { Seance } from '../models/seance';
export interface SalleDeCinema {
  id?: number;
  nbrRangees?: number;
  nbrSections?: number;
  nbrSieges?: number;
  numero?: number;
  seances?: Array<Seance>;
  totalDesSieges?: number;
}
