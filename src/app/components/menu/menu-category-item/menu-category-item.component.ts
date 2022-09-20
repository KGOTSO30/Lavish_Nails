import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { Product, ProductCategory, UpdateOrderAction } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-category-item',
  templateUrl: './menu-category-item.component.html',
  styleUrls: ['./menu-category-item.component.css']
})
export class MenuCategoryItemComponent implements OnInit {

  @Input()
  product?: Product = undefined;

  @Output()
  click = new EventEmitter<UpdateOrderAction>();

  amount: number = 0;
  orderId!:string;

  constructor() { }

  ngOnInit(): void {
  }

  handleClick() {
  
    if (this.amount < 1) { 
      this.amount = 1;
      this.emitAction("add");
    }
  }

  increaseAmount() {
  
    this.amount = this.amount + 1;
    this.emitAction("add");
  }

  decreaseAmount() {
    
    this.amount = Math.max(this.amount - 1, 0);
    this.emitAction("remove");
  }

  private emitAction(action: "add" | "remove") {
    this.click.emit({
      action,
      name: this.product?.name,
      price: this.product?.price || 0
    });
  }

}
