import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
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
import { ShoppingCartModalComponent } from './shopping-cart-modal/shopping-cart-modal.component';
import { PromoCarouselComponent } from './promo-carousel/promo-carousel.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { FoodSectionComponent } from './food-section/food-section.component';
import { MovieDescriptionComponent } from './movie-description/movie-description.component';
import { MovieDescriptionsComponent } from './movie-descriptions/movie-descriptions.component';

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
    ShoppingCartModalComponent,
    PromoCarouselComponent,
    MovieListComponent,
    FoodSectionComponent,
    MovieDescriptionComponent,
    MovieDescriptionsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule,CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
