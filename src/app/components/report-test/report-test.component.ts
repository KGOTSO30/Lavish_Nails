import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserProfile } from 'src/app/shared/user-profile';
import { Client} from 'src/app/shared/client';
import {
  Observable
} from 'rxjs';

import { UsersService } from 'src/app/services/user.service';

import {
  HighchartsService,
  chartModal,
  AcrylicModal,
  salesRendered,
} from "../reportTest/highcharts.service";
import * as Highcharts from "highcharts";

import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/compat/firestore";
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

export interface ClientItem extends Client {
  DisplayName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
 }

@Component({
  selector: 'app-report-test',
  templateUrl: './report-test.component.html',
  styleUrls: ['./report-test.component.css']
})
export class ReportTestComponent implements OnInit {
  dataSequenceSource!: MatTableDataSource<any>;
 // dataSequenceSource = new  ClientDataSource(this.client);

  displayedSequenceColumns : string[] = [
    
    'Name',
    'Surname',
    'Email',
    'PhoneNumber'
    ]

   private customerCollection!: AngularFirestoreCollection<ClientItem>;
   customers!: Observable<ClientItem[]>;

   

    applyFilterZone() {
   // return this.firestoreservice.collection('users').valueChanges();
    this.customerCollection = this.firestoreservice.collection('users');
    this.customers = this.customerCollection.valueChanges();
    }
    

 title = "Firestore-Angular-Highcharts";
  items$!: chartModal[];
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
  count!:number;

  saleItems$!: salesRendered[];
  saleData: any[] = [];
  saleOptions: any;

  // variables for client side display

  cancelled!: number;
  completed!: number;
  clients!: number;
  cancelledRate!: number;
  
  constructor(
    private highchartservice: HighchartsService,
    private readonly firestoreservice: AngularFirestore, 
    private userService: UsersService,
    private client: UsersService,
    
    ) {}
  ngOnInit() {
   
    this.count = this.highchartservice.totalVisitCount;


   
   this.applyFilterZone();
   
    this.customers.subscribe(
      (data) => (this.dataSequenceSource = new MatTableDataSource(data))
    );
    
    
  }








  

  getSalesChart() {
    this.chartOptions = {
      xAxis: {
        categories: []
      

        },

      series: [{
        data: this.chardata,
      }, ],
      chart: {
        type: "column",
      },
      title: {
        text: "Sales",
      },
    };
    
  }
 


  // A count of the example chart
  getCount(){
    const visitArray = this.firestoreservice.collection("users").snapshotChanges();
    visitArray.subscribe(payload => {
      this.count = payload.length;
  });
  }

  getCancelled(){
    const visitArray = this.firestoreservice.collection("cancelledAppointments/cancelledAppointmentsDoc/cancelled").snapshotChanges();
    visitArray.subscribe(payload => {
      this.cancelled = payload.length;
  });
  }

  getCompleted(){
    const visitArray = this.firestoreservice.collection("cancelledAppointments/completedAppointmentsDoc/completed").snapshotChanges();
    visitArray.subscribe(payload => {
      this.completed = payload.length;
  });
  }
  getClients(){
    const visitArray = this.firestoreservice.collection("cancelledAppointments/clientsDoc/clients").snapshotChanges();
    visitArray.subscribe(payload => {
      this.clients = payload.length;
  });
  }

  getAllTotals(){
    this.getCancelled();
    this.getClients();
    this.getCompleted();
    
  }
 
  getRate(){
    this.getAllTotals();
    this.cancelledRate = (this.cancelled / this.clients);
  }
  
}

/*

export class ClientDataSource extends DataSource<any> {
  constructor(private client: UsersService){
    super();
  }

  connect(){
   return this.client.applyFilterZone();
     }

  disconnect() {
    
  }   
}

 this.highchartservice.sales$.subscribe((assets) => {
      this.saleItems$ = assets;
      if (this.saleItems$) {
        this.saleItems$.forEach((element) => {
          this.saleData.push(element.serviceName);
          this.saleData.push(element.serviceType);
          this.saleData.push(element.price);
        });
        this.getSalesChart();
      }
    });



getChart() {
    this.chartOptions = {
      xAxis: {
        categories: ['Acrylic', 'Polygel', 'Rubberbase', 'Nail Art']
      

        },
        yAxis: {
          title: {
              useHTML: true,
              text: 'Million tonnes CO<sub>2</sub>-equivalents'
          }
      },

      series: [{
        data: this.chardata,
      }, ],
      chart: {
        type: "column",
      },
      title: {
        text: "Sales by Service Type",
      },
    };
    
  }


*/