import { ProductEntity } from "src/products/entity/product.entity";

export interface OrderInterface{
    product:ProductEntity,
    product_quantities: string,

}