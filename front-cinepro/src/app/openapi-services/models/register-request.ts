/* tslint:disable */
/* eslint-disable */
export interface RegisterRequest {
  email?: string;
  nom?: string;
  password?: string;
  prenom?: string;
  role?: 'UTILISATEUR' | 'ADMINISTRATEUR' | 'AGENTCINEMA';
}
