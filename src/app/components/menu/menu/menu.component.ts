import { Component, OnInit, Input } from '@angular/core';
import { ProductCategory } from '../models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input()
    menu: ProductCategory[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
