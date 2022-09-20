import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Appointments } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  @Output() addApt = new EventEmitter();

  model!: Appointments;

  user$ = this.usersService.currentUserProfile$;
  
  addAppointment(formInformation: any) {

    this.model = {
      
     // name:  formInformation.clientName,
      serviceType: formInformation.serviceType,
      serviceName: formInformation.serviceName,
      size: formInformation.size,
     // appointmentNotes: formInformation.aptNotes,
      appointmentDate: new Date(formInformation.aptDate.year + '-' + formInformation.aptDate.month + '-'  +  formInformation.aptDate.day + ' ' +  formInformation.aptTime)
    };

    this.appointmentService.addAppointment(this.model);



  }
  constructor(private usersService: UsersService,private appointmentService: AppointmentService) {  }

  ngOnInit() {
  }



}