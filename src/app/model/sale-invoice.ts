import { Customer } from "./customer.model";
import { Purchase } from "./purchase";

export interface SaleInvoice {
    id: number,
    reference: number,
    customer: Customer | undefined,
    purchases: Array<Purchase>
    totalAmount: number,
    status: string
}