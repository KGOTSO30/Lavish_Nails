import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(){
  //  this.productList = this.productService.getProducts()
    this.productService.getProducts().subscribe((products) =>{
    this.productList = products;
   })
    console.log(this.productList)
  } 
  
  
}
