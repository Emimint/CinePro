import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatBookingStepComponent } from './seat-booking-step.component';

describe('SeatBookingStepComponent', () => {
  let component: SeatBookingStepComponent;
  let fixture: ComponentFixture<SeatBookingStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatBookingStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeatBookingStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
