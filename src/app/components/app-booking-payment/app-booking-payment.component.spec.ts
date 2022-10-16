import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBookingPaymentComponent } from './app-booking-payment.component';

describe('AppBookingPaymentComponent', () => {
  let component: AppBookingPaymentComponent;
  let fixture: ComponentFixture<AppBookingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBookingPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBookingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
