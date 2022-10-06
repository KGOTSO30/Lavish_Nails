import { Component, OnInit, Input } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { CartService } from '../../services/cart.service';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

 @Input() productItem!: Product;

  constructor(
    product: ProductService, 
    private msg : MessengerService,
    private cartService: CartService
    
    ) {
   // this.productItem = product
   }

  ngOnInit(){
    
  }

  handleAddToCart() {
    this.cartService.addProductToCart(this.productItem).subscribe(() => {
      this.msg.sendMsg(this.productItem)
    })
  }

}
