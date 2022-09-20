import { Injectable } from '@angular/core';

import { Salon} from './salon';

import {
 
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';


export class Sales {

  Id?: string;
  TotalSales!: number
   
}


@Injectable({
  providedIn: 'root'
})
export class SalonService {
 private dbPath = '/services';
 private dbPath1 = '/sales/Acrylic/AcylicDocCollection';
 
 private dbPath2 = '/sales/Polygel/PolygelDocCollection';

 private dbPath3 = '/sales/Rubberbase/RubberbaseDocColection';

 salonRef!: AngularFirestoreCollection<Salon>;


 // Sales Collections
 salesRef!: AngularFirestoreCollection<Sales>;
 polygelSalesRef!: AngularFirestoreCollection<Sales>;
 rubberbaseSalesRef!: AngularFirestoreCollection<Sales>;


  constructor( private db: AngularFirestore) {
    this.salonRef = db.collection(this.dbPath); 

    this.salesRef = db.collection(this.dbPath1); 
    this.polygelSalesRef = db.collection(this.dbPath2);
    this.rubberbaseSalesRef = db.collection(this.dbPath3);
     
   }

   getAll(): AngularFirestoreCollection<Salon>{
    return this.salonRef;
  }

  getAcrylicSales(): AngularFirestoreCollection<Sales>{
    
    return this.salesRef;
  }

  getPolygelSales(): AngularFirestoreCollection<Sales>{
    
    return this.polygelSalesRef;
  }

  getRubberbaseSales(): AngularFirestoreCollection<Sales>{
    
    return this.rubberbaseSalesRef;
  }


  
}
