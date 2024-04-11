import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './footer/footer.component';
import { TicketBookingStepComponent } from './ticket-booking-step/ticket-booking-step.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';
import { MovieTicketComponent } from './movie-ticket/movie-ticket.component';
import { MovieExperienceComponent } from './movie-experience/movie-experience.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccueilComponent,
    FooterComponent,
    TicketBookingStepComponent,
    SearchModalComponent,
    MovieCarouselComponent,
    MovieTicketComponent,
    MovieExperienceComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
