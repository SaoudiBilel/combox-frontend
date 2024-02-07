import { Product } from "./product.model";

export interface Sale {
    id: number,
    productSale: Product | undefined,
    quantity: number,
    amount: number
}