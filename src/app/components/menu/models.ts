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