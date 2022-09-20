import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  
  
} from "@angular/fire/compat/firestore";

import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Sales } from './sales';
import { SalesService } from './sales.service';

import {
  HighchartsService,
  chartModal,
  AcrylicModal,
  salesRendered,
} from "../reportTest/highcharts.service";
import * as Highcharts from "highcharts";




export interface Transactions extends Sales {
  price: number;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {


  //
  serviceTypes: any;
  filteredServiceTypes: any;

// filter-able properties
  serviceType!: string;
  serviceName!: string;
  extras!: string;

// active filter rules
filters = {};

// Highcharts data for service rendered
  Highcharts: typeof Highcharts = Highcharts;
  saleItems$!: salesRendered[];
  saleData: any[] = [];
  saleOptions: any;


  // service rendered table

  dataSequenceSource!: MatTableDataSource<any>;
  transactions?: Transactions[];
 // transactions!: MatTableDataSource<any>;
  displayedSequenceColumns : string[] = [
    
    'ServiceName',
    'ServiceType',
    'Extras',
    'Price'
    ]
  private renderedCollection!: AngularFirestoreCollection<Sales>;
  rendered!: Observable<Sales[]>;

  // service rendered table
 
    
 
     
  constructor(
    private highchartservice: HighchartsService,
    private saleService: SalesService, 
    private afs: AngularFirestore
    ) { }

    
  ngOnInit(): void {


this.afs.collection('/servicesRendered')
    .valueChanges()
    .subscribe(serviceTypes => {
      this.serviceTypes = serviceTypes;
      this.applyFilters();
    })

    //////////////////////////////////////////////////////////
    this.getRendered();
    this.rendered.subscribe(
      (data) => (this.dataSequenceSource = new MatTableDataSource(data))
    );


    //initialize chart on page

    this.highchartservice.sales$.subscribe((assets) => {
      this.saleItems$ = assets;
      if (this.saleItems$) {
        this.saleItems$.forEach((element) => {
          this.saleData.push(element.serviceType);
          this.saleData.push(element.price);
        });
        this.getSalesChart();
      }
    });
   this.applyFilterZone();

  }


  getSalesChart() {
    this.saleOptions = {
      xAxis: {
        type:'category',
      //  categories: ['Acrylic', 'Polygel', 'Rubberbase', 'Nail Art']
      

        },
        yAxis: {
          title: {
              useHTML: true,
              text: 'Number of services rendered'
          }
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.serviceType}</b>: {point.percentage:.1f} %'
            }
        }
    },

      series: [{
        name: 'Prices',
        data: this.saleData,
      }, ],
      chart: {
        type: "pie",
        
      },
      title: {
        text: "Sales per Services",
      },
    };
    
  }

  applyFilterZone() {
    // return this.firestoreservice.collection('users').valueChanges();
     this.renderedCollection = this.afs.collection('chartData' );
     this.rendered = this.renderedCollection.valueChanges();
     }



     ///fILTERS
     private applyFilters(){
      this.filteredServiceTypes = _.filter(this.serviceTypes, _.conforms(this.filters))
     }
     
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSequenceSource.filter = filterValue.trim().toLowerCase();
  }

     /*
     filterExact(property: string, rule: any){
      this.filters[property] = val => val == rule;
      this.applyFilters();
     }

     filterGreaterThan(property: string, rule: number){
      this.filters[property] = val => val > rule;
      this.applyFilters();
     }

     filterBoolean(property: string, rule: boolean){
      if(!rule) this.removeFilter(property)
      else{

        this.filters[property] = val => val == rule;
        this.applyFilters();
      }
     
     }

     removeFilter(property: string){
      delete this.filters[property]
      this[property] = null
     }
     */

  // GETTERS

  getRendered() {
    this.renderedCollection = this.afs.collection('servicesRendered');
    this.rendered = this.renderedCollection.valueChanges();
    
    }

  getTotalCost() {
     return this.transactions?.map(t => t.price).reduce((acc, value) => acc + value, 0);
   }

   // GETTERS
}
