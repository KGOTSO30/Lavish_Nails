import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

import { Client} from '../shared/client'

import {
 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  logout() {
    throw new Error('Method not implemented.');
  }
  private afs!: AngularFirestore;
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth,) { }


  /*
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)
    .then((result) => {
    //  this.SetUserData(result.user);
    }));
  }


  signUp(name: string, email: string, password: string){
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
     
    
    ).pipe(switchMap(({ user }) => updateProfile( user, { displayName: name})))
  }

  logout() {
    return from(this.auth.signOut());
  }

  */
/*
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: Client = {
      clientId: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      status: user.status,
      completedAppointments: user.completedAppointments,
      totalSpend: user.totalSpend,
      
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
*/
}
