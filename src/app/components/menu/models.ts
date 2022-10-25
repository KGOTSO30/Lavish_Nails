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
 import { Hero, Nail } from 'src/app/components/menu/hero';

export const HEROES: Hero[] = [
  { id: 260, name: 'Overlay' },
  { id: 300, name: 'Overlay with gel polish' },
  { id: 350, name: 'Ombre French' },
  { id: 320, name: 'FullSet' },
  { id: 370, name: 'FullSet Ombre French' },
  { id: 360, name: 'FullSet Acrylic' },
 
];

export const PolyGel: Nail[] = [
  { price: 260, name: 'Overlay',time: '1hr'  },
  { price: 300, name: 'Overlay with gel polish', time: '1hr 15min'  },
  { price: 350, name: 'Ombre French',time: '1hr 15min'  },
  { price: 320, name: 'FullSet', time: '1hr 30min'  },
  { price: 370, name: 'FullSet Ombre French', time: '1hr 30min'  },
  
];

export const Rubberbase: Nail[] = [
  { price: 260, name: 'Overlay',time: '1hr'  },
  { price: 300, name: 'Overlay with gel polish', time: '1hr 15min'  },
  { price: 350, name: 'Ombre French',time: '1hr 15min'  },
  { price: 320, name: 'FullSet', time: '1hr 30min'  },
  { price: 370, name: 'FullSet Ombre French', time: '1hr 30min'  },
  
];