import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css'],
})
export class BookingPageComponent implements OnInit {
  currentStep: number = 1;
  formData: any = {};
  timerCounter: number = 20; // on peut changer à 300 secondes (i.e. 5 minutes) en production.
  timerSubscription: Subscription;
  source = interval(1000);

  ngOnInit(): void {
    this.timerSubscription = this.source.subscribe(() => {
      this.timeDecrement();
    });
  }

  timeDecrement() {
    if (this.timerCounter > 0) {
      this.timerCounter--;
    } else {
      this.timerSubscription.unsubscribe();
    }
  }

  bookingDisplayStep(step: number) {
    this.currentStep = step;
    this.updateProgressBar();
  }

  bookingNextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
      this.updateProgressBar();
    }
  }

  bookingPrevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgressBar();
    }
  }

  // Code pour mettre à jour le visuel de la barre de progression :
  updateProgressBar() {
    const allSteps = document.querySelectorAll("[class^='step-container']");
    allSteps.forEach((step: any) => {
      step.style.color = 'gray';
    });
    const currentStepProgress = '.step-container-' + this.currentStep;
    const currentStepElement = document.querySelector(
      currentStepProgress
    ) as HTMLElement;
    if (currentStepElement) {
      currentStepElement.style.color = '#1759ab';
    }
  }

  submitForm() {
    console.log('Form submitted:', this.formData);
    this.formData = {};
    this.currentStep = 1;
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }
}
