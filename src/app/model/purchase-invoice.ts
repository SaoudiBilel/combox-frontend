import { Provider } from "./provider.model";
import { Purchase } from "./purchase";

export interface PurchaseInvoice {
    id: number,
    reference: number,
    provider: Provider | undefined,
    purchases: Array<Purchase>
    totalAmount: number,
    status: string
}