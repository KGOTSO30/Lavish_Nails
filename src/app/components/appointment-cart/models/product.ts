export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;

    constructor(id: number , name: string , description = '', price = 0, imageUrl ='https://i.pinimg.com/236x/85/52/87/85528704ea334f524c481b909b9da665.jpg'){
        this.id = id
        this.name = name
        this.description = description
        this.price = price
        this.imageUrl = imageUrl

    }
}
export class Mt {
    id!: number;
    productId!: number; 
    productName!: string;
    qty!: number;
    price!: number;
  }
