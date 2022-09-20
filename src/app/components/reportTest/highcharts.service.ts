import { Injectable } from '@angular/core';

import {
  Observable
} from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/compat/firestore";
import {
  map
} from "rxjs/operators";

export interface chartModal {
  currency: string,
    rate: number
}

export interface AcrylicModal {
  FullSet: number,
  FullSet_w_gelPolish: number,
  FullSet_Ombre_French: number,
  Ombre_French: number,
  Overlay: number,
  Overlay_w_gelPolish: number,
  TotalSales: number,


}
export interface salesRendered {
  
  serviceType: string,
  serviceName: string,
  price: number,
  extras: boolean,

}



export interface totalVisitCount {
  totalVisitCount: number;
}


@Injectable({
  providedIn: 'root'
})
export class HighchartsService {

  

  totalVisitCount = 0;



  private saleCollection!: AngularFirestoreCollection < salesRendered > ;
  sales$!: Observable<salesRendered[]>;

///  example chart data (currency vs rate)

  private rateCollection: AngularFirestoreCollection < chartModal > ;
  rates$: Observable < chartModal[] > ;



  constructor(private readonly firestoreservice: AngularFirestore) {

// 'sales/Acrylic/AcrylicDocCollection'
/// For example chart data (currency vs rate)
    
    this.rateCollection = firestoreservice.collection < chartModal > ('chartData');
    this.saleCollection = firestoreservice.collection < salesRendered > ('servicesRendered');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.rates$ = this.rateCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as chartModal;
        const id = a.payload.doc.id;
        return {
          id,
          ...data
        };
      }))
    );


    //Acrylic

    this.sales$ = this.saleCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as salesRendered;
        const id = a.payload.doc.id;
        return {
          id,
          ...data
        };
      }))
    );

    



  /// counting documents of the cancelled collection

    const visitArray = this.firestoreservice.collection("cancelledAppointments").snapshotChanges();
    visitArray.subscribe(payload => {
      this.totalVisitCount = payload.length;
  });





  }





}
