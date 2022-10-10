import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product, Mt } from '../models/product';
import { CartService } from '../services/cart.service';
import { MessengerService } from '../services/messenger.service';

type Item = {
   id: number, proudctId: number, productName: string, qty: number, price: number,
}
let item: Item | null = null;



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 public cartItems: Mt[] = [];
  
  
  cartTotal = 0
  //product!: Product;
  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    ) { }

  ngOnInit() {

    this.handleSubscription();
    this.loadCartItems();

  }
 
 
  get cartItemsLength() { return (this.cartItems && this.cartItems.length) ?  this.cartItems.length : 0 }
  
  handleSubscription() {
    this.msg.getMsg().subscribe((product: any) => {
      this.loadCartItems();
    })
  }
  
  loadCartItems() {
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.calcCartTotal();
    })
  }

  calcCartTotal() {
    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }

 
}






/*

  addProductToCart(product: Product) {
    let cartContent = new Mt();

    let productExists = false

    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        this.cartItems[i].qty++
        productExists = true
        break;
      }
    }

    if (!productExists) {
      //this.cartItems
      cartContent.productId = product.id
      cartContent.productName = product.name
      cartContent.qty = 1
      cartContent.price = product.price

      this.cartItems.push(cartContent)
     
      console.log(cartContent)
    }
   

    this.cartTotal = 0
    this.cartItems.forEach((item: Mt) => {
      this.cartTotal += (item.qty * item.price)
    })
  }
*/
