import { Product } from "./product.model";

export interface Purchase {
    id: number,
    productPurchase: Product | undefined,
    quantity: number,
    amount: number
}