import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { ShowSelectionComponent } from './show-selection/show-selection.component';
import { MovieTicketComponent } from './movie-ticket/movie-ticket.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  //{ path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  { path: 'booking', component: ShowSelectionComponent },
  { path: 'movie-ticket', component: MovieTicketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
