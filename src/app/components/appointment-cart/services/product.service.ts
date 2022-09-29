import { Injectable } from '@angular/core';


import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    new Product(1, 'Overlay','about an Hour fifteen',260),
    new Product(2, 'Overlay w gel polish','S',300),
    new Product(3, 'French/Ombre','about an Hour fifteen',350),
    new Product(4, 'Fullset','S',320),
    new Product(5, 'Fullset French/Ombre','S',370),
    new Product(6, 'Overlay','M',280),
    new Product(7, 'Overlay','L',300),
  ]



  constructor() { }

  getProducts(): Product[] {
    //TODO: Populate products from an API and return an Observable
    return this.products
  }
}
