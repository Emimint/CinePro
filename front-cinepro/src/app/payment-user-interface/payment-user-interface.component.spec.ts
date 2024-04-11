import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentUserInterfaceComponent } from './payment-user-interface.component';

describe('PaymentUserInterfaceComponent', () => {
  let component: PaymentUserInterfaceComponent;
  let fixture: ComponentFixture<PaymentUserInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentUserInterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentUserInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
