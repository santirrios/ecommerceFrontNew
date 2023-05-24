import { Image } from "./image";

export interface Product {
    productId:string;
    categoryId:string;
    description:string;
    name:string;
    images:Image[];
    price:number;
}
export interface CreateProduct extends Omit<Product,'productId'>{
}