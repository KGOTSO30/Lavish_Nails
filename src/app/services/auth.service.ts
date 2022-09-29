import { Injectable, NgZone } from '@angular/core';
import { Client} from '../shared/client'
import * as  auth from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  
  currentUser$ = authState(this.auth);


  constructor(
    private auth: Auth,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */

    
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    
    
  }

////////////////////////////////////////////////////////////////////////////////////////////////

signUp(email: string, password: string): Observable<UserCredential> {
  return from(createUserWithEmailAndPassword(this.auth, email, password));
}

login(email: string, password: string): Observable<any> {
  return from(signInWithEmailAndPassword(this.auth, email, password));
  
}

logout(): Observable<any> {
  return from(this.auth.signOut());
}











 // Sign in with Google
 GoogleAuth() {
  return this.AuthLogin(new GoogleAuthProvider());
}
// Auth logic to run auth providers

AuthLogin(provider:any) {
  return this.afAuth
    .signInWithPopup(provider)
    .then((result) => {
      console.log('You have been successfully logged in!');
    })
    .catch((error) => {
      console.log(error);
    });
}

SetUserData(user: any) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    `users/${user.uid}`
  );
  const userData: Client = {
    uid: user.uid,
    email: user.email,
   // displayName: user.displayName,
    photoURL: user.photoURL,
  //01  emailVerified: user.emailVerified,
  };
  return userRef.set(userData, {
    merge: true,
  });
}

}