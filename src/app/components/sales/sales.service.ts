import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/compat/firestore";
import { Sales } from './sales';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor() { }
}
