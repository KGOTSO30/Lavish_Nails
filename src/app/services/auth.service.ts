import { Injectable, NgZone } from '@angular/core';
import { Client} from '../shared/client'
import * as  auth from '@angular/fire/auth';
//import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, concatMap, from, Observable, of, switchMap } from 'rxjs';
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
 // public isLoggedIn$: BehaviorSubject<boolean>;
  userData: any; // Save logged in user data
  user$: Observable<any>;
  
  currentUser$ = authState(this.auth);


  constructor(
    private auth: Auth,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<Client>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
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
    
   // const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    //this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
    
    
  }

////////////////////////////////////////////////////////////////////////////////////////////////

signUp(email: string, password: string): Observable<UserCredential> {
  this.router.navigate(['login']);
  return from(createUserWithEmailAndPassword(this.auth, email, password));
  
}

login(email: string, password: string) {
  //localStorage.setItem('loggedIn', 'true');
  //this.isLoggedIn$.next(true);
 // return from(signInWithEmailAndPassword(this.auth, email, password));
  
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  
 
}

logout(){
  //localStorage.setItem('loggedIn', 'false');
  //this.isLoggedIn$.next(false);
  return this.afAuth.signOut().then(() => {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  });
 // return from(this.auth.signOut());
 
}











 // Sign in with Google
 GoogleAuth() {
  return this.AuthLogin(new auth.GoogleAuthProvider());
}
AuthLogin(provider:any) {
  return this.afAuth
    .signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      });
    })
    .catch((error) => {
      window.alert(error);
    });
}

SetUserData(user: any) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    `users/${user.uid}`
  );
  const userData: Client = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  //01  emailVerified: user.emailVerified,
  };
  return userRef.set(userData, {
    merge: true,
  });
}
///////////////////////////////////////////////////////////////////////////////////////

async googleSignin() {
  const provider = new auth.GoogleAuthProvider();
  const credential = await this.afAuth.signInWithPopup(provider);
  this.router.navigate(['home']);
  return this.updateUserData(credential.user);
}

private updateUserData(user: any) {
  // Sets user data to firestore on login
  const userRef: AngularFirestoreDocument<Client> = this.afs.doc(`users/${user.uid}`);

  const data = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL
  };

  return userRef.set(data, { merge: true });

}

}