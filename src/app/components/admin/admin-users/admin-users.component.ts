import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserProfile } from 'src/app/shared/user-profile';
import { Client} from 'src/app/shared/client';
import {
  Observable
} from 'rxjs';

import { UsersService } from 'src/app/services/user.service';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/compat/firestore";


export interface ClientItem extends Client {
  DisplayName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
 }


 
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  dataSequenceSource!: MatTableDataSource<any>;
  // dataSequenceSource = new  ClientDataSource(this.client);
 
   displayedSequenceColumns : string[] = [
     
     'Name',
     'Surname',
     'Email',
     'PhoneNumber',
    
     ]
 
    private customerCollection!: AngularFirestoreCollection<ClientItem>;
    customers!: Observable<ClientItem[]>;
 
    
 
     applyFilterZone() {
    // return this.firestoreservice.collection('users').valueChanges();
     this.customerCollection = this.firestoreservice.collection('users');
     this.customers = this.customerCollection.valueChanges();
     }

  constructor(
    private readonly firestoreservice: AngularFirestore
  ) { }

  ngOnInit(): void {

    
   this.applyFilterZone();
   
   this.customers.subscribe(
     (data) => (this.dataSequenceSource = new MatTableDataSource(data))
   );
   
   
  }

}
