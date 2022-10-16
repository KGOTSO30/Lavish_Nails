import { Component, OnInit } from '@angular/core';
//import { library} from '@fortawesome/fontawesome-svg-core';
//import {faTimes, faPlus, faCalendarPlus, faMugHot} from '@fortawesome/free-solid-svg-icons';
import { without } from 'lodash';

import { Observable } from 'rxjs';

import { AppointmentService } from './appointment.service';
import { Appointments } from './appointment';


//library.add(faTimes, faPlus, faCalendarPlus, faMugHot);

export interface AppointmentItem extends Appointments { id: string; }

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css']
})
export class BookNowComponent implements OnInit {

  constructor( private appointmentService: AppointmentService) {

  }
  title = 'Pick a date and time';

  showSpinner = true;

  appointments!: Observable<AppointmentItem[]>;


  ngOnInit(): void {
    this.getAllAppointments();

  }
  getAllAppointments(): void {
    this.appointments = this.appointmentService.getAppointments();
    this.appointments.subscribe( () => this.showSpinner = false);

  }

}
