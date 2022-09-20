import { Component, OnInit } from '@angular/core';
import {Appointment} from 'src/app/models/appointment.model'
import {CrudService} from 'src/app/shared/crud.service'
import { map } from 'rxjs/operators';
import { idToken } from '@angular/fire/auth';



@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointments?: Appointment[];
  currentAppointment?: Appointment;
  currentIndex = -1;
  service = '';
  constructor(private appoinmentService: CrudService) { }

  ngOnInit(): void {
    this.retrieveAppointments();
  }

  refreshList(): void {
    this.currentAppointment = undefined;
    this.currentIndex = -1;
    this.retrieveAppointments();
  }

  retrieveAppointments(): void {
    this.appoinmentService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => 
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.appointments = data;
    });
 }

 setActiveAppointment( appointment: Appointment, index: number){
  this.currentAppointment = appointment;
  this.currentIndex = index;
 }

}
