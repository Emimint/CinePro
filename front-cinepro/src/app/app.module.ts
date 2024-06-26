import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimeFormatPipe } from './time-format.pipe';
import { TruncatePipe } from './text-format.pipe';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './footer/footer.component';
import { TicketBookingStepComponent } from './ticket-booking-step/ticket-booking-step.component';
import { SeatBookingStepComponent } from './seat-booking-step/seat-booking-step.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';
import { MovieTicketComponent } from './movie-ticket/movie-ticket.component';
import { MovieExperienceComponent } from './movie-experience/movie-experience.component';
import { PaymentUserComponent } from './payment-user/payment-user.component';
import { ShowSelectionComponent } from './show-selection/show-selection.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { ShoppingCartModalComponent } from './shopping-cart-modal/shopping-cart-modal.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PromoCarouselComponent } from './promo-carousel/promo-carousel.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { FoodSectionComponent } from './food-section/food-section.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminAgentMovieComponent } from './admin-agent-movie/admin-agent-movie.component';
import { MovieDescriptionComponent } from './movie-description/movie-description.component';
import { TheaterListComponent } from './theater-list/theater-list.component';
import { TheaterListContainerComponent } from './theater-list-container/theater-list-container.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccueilComponent,
    FooterComponent,
    TicketBookingStepComponent,
    SeatBookingStepComponent,
    MovieExperienceComponent,
    SearchModalComponent,
    MovieCarouselComponent,
    MovieTicketComponent,
    ContactComponent,
    PaymentUserComponent,
    ShowSelectionComponent,
    BookingPageComponent,
    ShoppingCartModalComponent,
    AboutPageComponent,
    PromoCarouselComponent,
    MovieListComponent,
    FoodSectionComponent,
    LoginPageComponent,
    AdminAgentMovieComponent,
    MovieDescriptionComponent,
    TheaterListComponent,
    TheaterListContainerComponent,
    TimeFormatPipe,
    TruncatePipe,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTooltipModule,
  ],
  providers: [provideHttpClient(withFetch()), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
