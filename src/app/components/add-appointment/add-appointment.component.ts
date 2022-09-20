import { Component, OnInit } from '@angular/core';
import {Appointment} from 'src/app/models/appointment.model'
import {CrudService} from 'src/app/shared/crud.service'

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  appointment: Appointment = new Appointment();
  submitted = false;
  selected!: Date | null;
  

  constructor(private appointmentService: CrudService) {
    this.appointment.appointmentDate = this.selected;
   }

  ngOnInit(): void {
  }

  saveAppointment(): void {
    this.appointmentService.create(this.appointment).then(() => {
      console.log('Created new Appointment successfully!');
      this.submitted = true;
    });
  }

  newAppointment(): void {
    this.submitted = false;
    this.appointment = new Appointment();
  }

}


  
