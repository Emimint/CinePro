/* tslint:disable */
/* eslint-disable */
import { Siege } from '../models/siege';
export interface Seance {
  heureDebut?: string;
  id?: number;
  imax?: boolean;
  sieges?: Array<Siege>;
  troisD?: boolean;
  ultraAVX?: boolean;
}
