import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { timestamp } from 'rxjs';
import {Appointment} from 'src/app/models/appointment.model'
import {CrudService} from 'src/app/shared/crud.service'

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  @Input() appointment?: Appointment;
  @Output() refreshList: EventEmitter<any>  = new EventEmitter();
  currentAppointment: Appointment = {
    
    
    appointmentStatus: '',
    appointmentService: '',
    appstatus: false
  };
  message = '';
  constructor(private appointmentService: CrudService) { }


  ngOnInit(): void {
    this.message = '';
    this.currentAppointment =  { ...this.appointment}
  }

  updateCompleted(status: boolean): void {
    if (this.currentAppointment.appointmentId){
      this.appointmentService.update(this.currentAppointment.appointmentId, {appstatus: status})
      .then(() => {
        this.currentAppointment.appstatus = status;
        this.message = 'Status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }
  updateAppointment(): void {
    const data = {
      service: this.currentAppointment.appointmentService,
      appointmentStatus: this.currentAppointment.appointmentStatus
    };
    if (this.currentAppointment.appointmentId) {
        this.appointmentService.update(this.currentAppointment.appointmentId, data)
          .then(() => {
            this.message = 'The Appointment was updated successfully!';
          })
          .catch(err => console.log(err));
    }
  }

  deleteAppointment(): void {
    if (this.currentAppointment.appointmentId) {
        this.appointmentService.delete(this.currentAppointment.appointmentId)
          .then(() => {
            this.refreshList.emit();
            this.message = 'The Appointment was deleted successfully';
          })
          .catch(err => console.log(err));
    }
  }
}

/*
 <mat-card class="demo-inline-calendar-card">
          <mat-calendar [(selected)]="selected"></mat-calendar>
        </mat-card>
        <p>Selected date: {{selected}}</p>
*/
