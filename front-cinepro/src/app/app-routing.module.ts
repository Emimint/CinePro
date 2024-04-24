import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { ShowSelectionComponent } from './show-selection/show-selection.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AdminAgentMovieComponent } from './admin-agent-movie/admin-agent-movie.component';
import { MovieDescriptionComponent } from './movie-description/movie-description.component';
import { FoodSectionComponent } from './food-section/food-section.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'show-selection', component: ShowSelectionComponent },
  { path: 'booking', component: BookingPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'admin-agent-movie', component: AdminAgentMovieComponent },
  { path: 'description/:filmId', component: MovieDescriptionComponent },
  { path: 'food-section', component: FoodSectionComponent },
  { path: 'profile', component: ProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
