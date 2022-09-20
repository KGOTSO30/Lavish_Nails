import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
//import { ProfileUser } from '../models/user';
import { AuthService } from './auth.service';
import { Client} from '../shared/client';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/compat/firestore";


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: Firestore, private authService: AuthService,private  firestoreservice: AngularFirestore) {}

  get currentUserProfile$(): Observable<Client | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<Client>;
      })
    );
  }

  addUser(user: Client): Observable<any> {
    const ref = doc(this.firestore, 'users', user.uid);
    console.log(ref);
    return from(setDoc(ref, user));
    
  }

  updateUser(user: Client): Observable<any> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }


  
  applyFilterZone() {
    return this.firestoreservice.collection('users').valueChanges();
    //this.customerCollection = this.firestoreservice.collection('users');
   // this.customers = this.customerCollection.valueChanges();
    }
}