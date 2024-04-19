import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css'],
})
export class BookingPageComponent {
  currentStep: number = 1;
  formData: any = {};

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
}
