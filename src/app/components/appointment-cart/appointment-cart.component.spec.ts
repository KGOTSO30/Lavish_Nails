import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCartComponent } from './appointment-cart.component';

describe('AppointmentCartComponent', () => {
  let component: AppointmentCartComponent;
  let fixture: ComponentFixture<AppointmentCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
