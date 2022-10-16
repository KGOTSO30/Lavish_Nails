import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartItem } from './../appointment-cart/models/cart-item';
import { Product, Mt } from './../appointment-cart/models/product';
import { CartService } from './../appointment-cart/services/cart.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  savedChanges: boolean = false;
  dataLoading: boolean = false;
  error: boolean = false;
  errorMessage!: String;
  currentDate: any;

  public cartItemss! : Mt[];
  constructor(
    private auth: AuthService,
    private cartService: CartService,
    ) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
    this.cartItemss = items;
   
  })
  }

  setData(formData: any) {
    // formData.tags = formData.tags.split(',');
    
   
         
      this.auth.setNewDoc('Store/Lavish/user-carts', formData + this.cartItemss).then((res: any) => {
          this.savedChanges = true;
          this.dataLoading = false;
      }).catch((error: { message: String; }) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
      });
  }
  
}
