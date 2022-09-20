import { Injectable } from '@angular/core';
//import { Observable } from '@firebase/util';
import { offset } from 'highcharts';
import { Observable, of } from 'rxjs';
import { ProductCategory } from './models'

@Injectable({
  providedIn: 'root'
})
export class MenuService {


 // constructor() { }


  getMenu(): Observable<ProductCategory[]> {
    return of([
      {
        "name": "Polygel",
        "categories": [

            {
              "name": "Overlay",
              "time": "4500",
              "price": "280",
              "size": "S"
            }
        ]
      },
      {
        "name": "Acrylic",
        "categories": [

            {
              "name": "Overlay",
              "time": "4500",
              "price": "280",
              "size": "S"
            }
        ]
      },
      {
        "name": "Rubberbase",
        "categories": [

            {
              "name": "Overlay",
              "time": "4500",
              "price": "280",
              "size": "S"
            }
        ]
      }
    ])
  }
}
