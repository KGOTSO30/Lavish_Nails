import {Component,  Output, EventEmitter, OnInit} from '@angular/core';

import { AppointmentService } from '../appointment.service';
import {Observable, pipe} from 'rxjs';
import { AppointmentItem } from '../book-now.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  showSpinner = true;
  hasAppointments = false;
  appointments2!: AppointmentItem[];


  @Output() deleteEvt = new EventEmitter();

  handleDelete(theApt: object) {
   // this.appointmentService.
    this.appointmentService.deleteAppointment(theApt);
  }


  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {

    this.getAllAppointments();

  }
  getAllAppointments(): void {
    this.appointmentService.getAppointments().subscribe( actions => {
      this.showSpinner = false;
      if (actions.length > 0) {
        this.hasAppointments = true;
      }
      this.appointments2 =  actions;

    });

  }

}