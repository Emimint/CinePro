import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBookingStepComponent } from './ticket-booking-step.component';

describe('TicketBookingStepComponent', () => {
  let component: TicketBookingStepComponent;
  let fixture: ComponentFixture<TicketBookingStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketBookingStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketBookingStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
