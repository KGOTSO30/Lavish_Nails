import { Component, OnInit, Input } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

 @Input() productItem!: Product;

  constructor(product: ProductService, private msg : MessengerService) {
   // this.productItem = product
   }

  ngOnInit(){
    
  }

  handleAddToCart() {
    this.msg.sendMsg(this.productItem)
  }

}
