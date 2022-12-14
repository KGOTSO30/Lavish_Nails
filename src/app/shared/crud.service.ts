import { Injectable } from '@angular/core';
import{ Client } from '../models/client.model';
import { Appointment} from '../models/appointment.model';

import {
 
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';



@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private dbPath = '/appointments';
  private dbPath1 = '/clients';

  appointmentsRef!: AngularFirestoreCollection<Appointment>;
  clientsRef!: AngularFirestoreCollection<Client>;

  constructor( private db: AngularFirestore){
    this.appointmentsRef = db.collection(this.dbPath);
    this.clientsRef = db.collection(this.dbPath1);
  }
 
  getAll(): AngularFirestoreCollection<Appointment>{
    return this.appointmentsRef;
  }

  create(appointment: Appointment): any {
    return this.appointmentsRef.add({...appointment});
  }

  update(appointmentId: string, data: any): Promise<void> {
    return this.appointmentsRef.doc(appointmentId).update(data);
  }

  delete(appointmentId: string): Promise<void> {
    return this.appointmentsRef.doc(appointmentId).delete();
  }
    

}














/*
constructor(private db: AngularFireDatabase) {

  // Create Client
 AddClient(client: Client){
    this.clientsRef.push({
     
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phoneNumber: client.phoneNumber,
      status: client.status,
      completedAppointments: client.completedAppointments,
      totalSpend: client.totalSpend,
    });
  }
  GetClient(clientId: String) {
    this.clientRef = this.db.object('client-list/'+ clientId)
    return this.clientRef;
  }
  
 }
 */