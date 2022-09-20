import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { Salon } from '../salon-service/shared/salon';
import { Sales, SalonService } from '../salon-service/shared/salon.service';
@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {


  salonSales?: Sales[];
  polygelSales?: Sales[];
  rubberbaseSales?: Sales[];

  salonServices?: Salon[];
  currentSalon?: Salon;
  currentIndex = -1;
  serviceName = '';
  constructor(private salonServ: SalonService) { }

  ngOnInit(): void {
    this.retrieveSalonServices();

    this.retrieveAcrylicSales();
    this.retrievePolygelSales();
    this.retrieveRubberbaseSales();
    
  }


  refreshList(): void {
    this.currentSalon = undefined;
    this.currentIndex = -1;
    this.retrieveSalonServices();
    this.retrieveAcrylicSales();
    this.retrievePolygelSales();
    this.retrieveRubberbaseSales();
    
  }

  retrieveSalonServices(): void {
    this.salonServ.getAll().snapshotChanges().pipe(
      map(changes =>  
        changes.map( c => 
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
     ) .subscribe(data => {
        this.salonServices = data;
      });
  }

  retrieveAcrylicSales(): void {
    this.salonServ.getAcrylicSales().snapshotChanges().pipe(
      map(changes =>  
        changes.map( c => 
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
     ) .subscribe(data => {
        this.salonSales = data;
      });
  }

  retrievePolygelSales(): void {
    this.salonServ.getPolygelSales().snapshotChanges().pipe(
      map(changes =>  
        changes.map( c => 
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
     ) .subscribe(data => {
        this.polygelSales = data;
      });
  }
  
  retrieveRubberbaseSales(): void {
    this.salonServ.getRubberbaseSales().snapshotChanges().pipe(
      map(changes =>  
        changes.map( c => 
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
     ) .subscribe(data => {
        this.rubberbaseSales = data;
      });
  }


  setSelectedService( salonService : Salon, index: number){
    this.currentSalon = salonService;
    this.currentIndex = index;
  }

}
