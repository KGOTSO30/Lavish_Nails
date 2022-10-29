import { Injectable, NgZone } from '@angular/core';
import { Client} from '../shared/client'
import * as  auth from '@angular/fire/auth';
import { Product, Mt } from 'src/app/components/appointment-cart/models/product';
//import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, concatMap, from, map, Observable, of, switchMap, take, tap } from 'rxjs';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,} from '@angular/fire/auth';
import { emailVerified } from '@angular/fire/auth-guard';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
 // public isLoggedIn$: BehaviorSubject<boolean>;
  userData: any; // Save logged in user data
  user$: Observable<any>;
  
  currentUser$ = authState(this.auth);
 // timestamp: any;
  authState: any;
 //////////// firebase eStore funcitons START ///////////////
 

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


 // Send email verification when new user sign up
 SendVerificationMail() {
  return this.afAuth.currentUser
    .then((cred: any) => {
      
      return cred.sendEmailVerification();
    })
    .then(() => {
      this.router.navigate(['verify-email-address']);
    });
}

// Sign up with email/password
/* signUp(email: string, password: string){
  return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      /* Call the SendVerificaitonMail() function when new user sign 
      up and returns promise 

      this.SendVerificationMail();
      this.SetUserData(result.user);
    })
    .catch((error) => {
      window.alert(error.message);
    });
} */

signUp(email: string, password: string): Observable<UserCredential> {
  this.router.navigate(['login']);
  return from(createUserWithEmailAndPassword(this.auth, email, password))
  
  
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
 //  emailVerified: user.emailVerified,
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
    photoURL: user.photoURL,
    emailVerified: user.true,
  };

  return userRef.set(data, { merge: true });

}

/////////////// //// A                                          . */ ///////////////////
//Admin auth

private itemDoc!: AngularFirestoreDocument<any>;
item!: Observable<any>;
get timestamp() {
  var d = new Date();
  return d;
  //return firebase.firestore.FieldValue.serverTimestamp();
}

 // helper functions
getUser(): Promise<any> {
  return this.afAuth.authState.pipe(take(1)).toPromise();
}

getCollectionURL(filter: string){
 // let localCenter = localStorage.getItem('center') ? localStorage.getItem('center') : this._defaultCenterColl;
 // return this._eStoreColl + "/" + localCenter + "/" + coll;
/**
  let _collURL = "";
  if (filter == "customer") { _collURL = this._custColl; }
  if (filter == "lead") { _collURL = this._leadColl; }
  return _collURL;
   */
  return "Store/Lavish/" + filter;
}

isUserLoggedIn():  Observable<boolean> {
  return this.afAuth.user.pipe(
    take(1),
    map(user => !!user), // <-- map to boolean
    tap(loggedIn => {
     return loggedIn;
    })
  );
}

isUserAdmin() {
  let colUrl = !this.isUserLoggedIn() ? "abcd" : this.auth.currentUser?.uid;
  colUrl = "Store/Lavish/admins/" + colUrl;
  this.getDoc(colUrl,"I3MmB214AyPnem8EJ70b3cdMyAw2");
}


getDoc(coll: string, docId: string) {
  return this.afs.collection(coll).doc(docId).valueChanges();
}
setNewDoc(coll: string, data: any, docId?: any) {
  const id = this.afs.createId();
  const item = { id, name };
  const timestamp = this.timestamp
  var docRef = this.afs.collection(coll).doc(item.id);
  return docRef.set({
      ...data,
      _id: id,
      updatedAt: timestamp,
      createdAt: timestamp,
      delete_flag: "N",
      authid: this.auth.currentUser?.uid,
      username: this.auth.currentUser?.displayName,
      useremail: this.auth.currentUser?.email
  });
}



setNewAppDoc(coll: string, data: any,serviceName: any,price: any, docId?: any) {
  const id = this.afs.createId();
  const item = { id, name };
  const timestamp = this.timestamp
  var docRef = this.afs.collection(coll).doc(item.id);
  return docRef.set({
      ...data,
      _serviceName: serviceName,
      _price: price,
      _id: id,
      updatedAt: timestamp,
      createdAt: timestamp,
      delete_flag: "N",
      authid: this.auth.currentUser?.uid,
      username: this.auth.currentUser?.displayName,
      useremail: this.auth.currentUser?.email
     
  });
}

updateAppDoc(coll: string, docId: string, data: any, serviceName: any,price: any) {
  const timestamp = this.timestamp
  var docRef = this.afs.collection(coll).doc(docId);
  return docRef.update({
      ...data,
      _serviceName: serviceName,
      _price: price,
      updatedAt: timestamp,
      delete_flag: "N",
      username: this.auth.currentUser?.displayName,
      useremail: this.auth.currentUser?.email
  });
}



updateDoc(coll: string, docId: string, data: any) {
  const timestamp = this.timestamp
  var docRef = this.afs.collection(coll).doc(docId);
  return docRef.update({
      ...data,
      updatedAt: timestamp,
      delete_flag: "N",
      username: this.auth.currentUser?.displayName,
      useremail: this.auth.currentUser?.email
  });
}
deleteDoc(coll: string, docId: string) {
  const timestamp = this.timestamp
  var docRef = this.afs.collection(coll).doc(docId);
  return docRef.delete();
}

getProducts() {
  return this.afs.collection('Store/Lavish/product'
    
  ).valueChanges();
  // return this.afs.collection(this.getCollectionURL(coll), ref =>
  //     ref.where('delete_flag', '==', 'N')
  //         .orderBy('name', 'desc')
  // )
/* 
  {
    updatedAt: timestamp,
    delete_flag: "Y",
    username: this.auth.currentUser?.displayName,
    useremail: this.auth.currentUser?.email
} */
  //     .snapshotChanges().map(actions => {
  //         return actions.map(a => {
  //             const data = a.payload.doc.data();
  //             const id = a.payload.doc.id;
  //             return { id, ...data };
  //         });
  //     });
}

getProducts2() {
 /*  return this.afs.collection('Store/Lavish/product', ref =>
      ref.where('delete_flag', '==', 'N')
         // .orderBy('name', 'desc')
  ).valueChanges(); */
   return this.afs.collection('product', ref =>
       ref.where('delete_flag', '==', 'N')
           .orderBy('name', 'desc')
   )
       .valueChanges()
}


getAppProduct(docId: string) {
//  coll = this._eStoreColl + "/" + localStorage.getItem('center') + "/" + coll;
  let coll = 'Store/Lavish/user-carts';
  return this.getDoc(coll, docId);
}

deleteAppProduct(docId: string){
  let coll = 'Store/Lavish/user-carts';
  return this.deleteDoc(coll,docId);

}

getProduct(docId: string) {
  //  coll = this._eStoreColl + "/" + localStorage.getItem('center') + "/" + coll;
    let coll = 'Store/Lavish/product';
    return this.getDoc(coll, docId);
  }
  
  deleteProduct(docId: string){
    let coll = 'Store/Lavish/product';
    return this.deleteDoc(coll,docId);
  }
updateProduct(coll: string,formData: any){
  return this.updateDoc('Store/Lavish/product',formData._id,formData);
}




  private itemsCollection!: AngularFirestoreCollection<any>;
  private itemDoc2!: AngularFirestoreDocument<any>;
  item2!: Observable<any>;

getDocs( filters?: any) {
  this.itemsCollection = this.afs.collection('Store/Lavish/product');
  return this.itemsCollection.valueChanges();
  
}
getAppDocs( filters?: any) {
  this.itemsCollection = this.afs.collection('Store/Lavish/user-carts');
  return this.itemsCollection.valueChanges();
  
}
}