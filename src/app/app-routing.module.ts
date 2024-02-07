import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { ProvidersComponent } from './providers/providers.component';
import { PurchaseInvoicesComponent } from './purchase-invoices/purchase-invoices.component';
import { SalesInvoicesComponent } from './sales-invoices/sales-invoices.component';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SaleComponent } from './sale/sale.component';
import { NewPurchaseComponent } from './purchase/new-purchase/new-purchase.component';
import { EditPurchaseComponent } from './purchase/edit-purchase/edit-purchase.component';
import { NewSaleComponent } from './sale/new-sale/new-sale.component';
import { EditSaleComponent } from './sale/edit-sale/edit-sale.component';
import { NewPurchaseInvoiceComponent } from './purchase-invoices/new-purchase-invoice/new-purchase-invoice.component';
import { EditPurchaseInvoiceComponent } from './purchase-invoices/edit-purchase-invoice/edit-purchase-invoice.component';
import { NewSaleInvoiceComponent } from './sales-invoices/new-sale-invoice/new-sale-invoice.component';
import { EditSaleInvoiceComponent } from './sales-invoices/edit-sale-invoice/edit-sale-invoice.component';

const routes: Routes = [
  {path: "customers", component: CustomersComponent},
  {path: "new-customer", component: NewCustomerComponent},
  {path: "edit-customer/:id", component: EditCustomerComponent},
  {path: "products", component: ProductsComponent},
  {path: "providers", component: ProvidersComponent},
  {path: "purchases", component: PurchaseComponent},
  {path: "new-purchase", component: NewPurchaseComponent},
  {path: "edit-purchase/:id", component: EditPurchaseComponent},
  {path: "sales", component: SaleComponent},
  {path: "new-sale", component: NewSaleComponent},
  {path: "edit-sale/:id", component: EditSaleComponent},
  {path: "purchase-invoices", component: PurchaseInvoicesComponent},
  {path: "new-purchase-invoice", component: NewPurchaseInvoiceComponent},
  {path: "edit-purchase-invoice/:id", component: EditPurchaseInvoiceComponent},
  {path: "sales-invoices", component: SalesInvoicesComponent},
  {path: "new-sale-invoice", component: NewSaleInvoiceComponent},
  {path: "edit-sale-invoice/:id", component: EditSaleInvoiceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
