export interface Product {
    name?: string;
    time?: number | string;
    price?: number;
    size?: string;
}

export interface ProductCategory {
    name?: string;
    categories?: Product[]
}

export interface Services {
    name?: string;
  //  categories: ProductCategory []
}
export interface UpdateOrderAction {
    action?: "add" | "remove"
    name?: string;
    category?: string;
    price?: number;
 }
 import { Hero } from 'src/app/components/menu/hero';

export const HEROES: Hero[] = [
  { id: 260, name: 'Overlay' },
  { id: 300, name: 'Overlay with gel polish' },
  { id: 350, name: 'Ombre French' },
  { id: 320, name: 'FullSet' },
  { id: 370, name: 'FullSet Ombre French' },
  { id: 360, name: 'FullSet Acrylic' },
 
];