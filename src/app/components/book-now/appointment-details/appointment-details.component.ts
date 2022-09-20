import {Component, Injectable, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AppointmentService } from '../appointment.service';
import { AppointmentItem } from '../book-now.component';
import { library } from '@fortawesome/fontawesome-svg-core';
//import { faFemale, faMale } from '@fortawesome/free-solid-svg-icons';

//library.add(faFemale, faMale);

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailComponent implements OnInit {

  date?: Date;
  appointment!: AppointmentItem;
  showSpinner = true;
  constructor(
              private route: ActivatedRoute,
              private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.getAppointment();

  }

  getAppointment(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.appointmentService.getAppointment(id!)
        .subscribe((appointment: AppointmentItem) => {
          this.showSpinner = false ;
          this.appointment = appointment;
        }
        );
  }
}