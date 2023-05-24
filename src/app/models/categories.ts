import {Product} from './product'
export interface Category{
    categoryId:string;
    description:string;
    name:string;
    products:Array<Product>
}