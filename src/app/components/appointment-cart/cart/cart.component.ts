import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../services/messenger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems =  [
     {id:1, productId: 1, productName:'Overlay', qty:2, price:320},
    {id:1, productId: 1, productName:'French/Ombre', qty:1, price:300},
    {id:1, productId: 1, productName:'Nail Art', qty:1, price:100},
    {id:1, productId: 1, productName:'Nail Art', qty:4, price:90}, 
  ];

  cartTotal = 0
  constructor(private msg: MessengerService) { }

  ngOnInit() {
    this.msg.getMsg().subscribe(product => {
      console.log(product)
    })
    this.cartItems.forEach( item =>{
      this.cartTotal += (item.qty * item.price)
    })
  }

}
