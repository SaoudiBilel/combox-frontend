import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import { ProvidersComponent } from './providers/providers.component';
import { ProductsComponent } from './products/products.component';
import { SalesInvoicesComponent } from './sales-invoices/sales-invoices.component';
import { PurchaseInvoicesComponent } from './purchase-invoices/purchase-invoices.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { SaleComponent } from './sale/sale.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { NewPurchaseComponent } from './purchase/new-purchase/new-purchase.component';
import { EditPurchaseComponent } from './purchase/edit-purchase/edit-purchase.component';
import { EditSaleComponent } from './sale/edit-sale/edit-sale.component';
import { NewSaleComponent } from './sale/new-sale/new-sale.component';
import { NewPurchaseInvoiceComponent } from './purchase-invoices/new-purchase-invoice/new-purchase-invoice.component';
import { EditPurchaseInvoiceComponent } from './purchase-invoices/edit-purchase-invoice/edit-purchase-invoice.component';
import { EditSaleInvoiceComponent } from './sales-invoices/edit-sale-invoice/edit-sale-invoice.component';
import { NewSaleInvoiceComponent } from './sales-invoices/new-sale-invoice/new-sale-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    ProvidersComponent,
    ProductsComponent,
    SalesInvoicesComponent,
    PurchaseInvoicesComponent,
    NewCustomerComponent,
    EditCustomerComponent,
    SaleComponent,
    PurchaseComponent,
    NewPurchaseComponent,
    EditPurchaseComponent,
    EditSaleComponent,
    NewSaleComponent,
    NewPurchaseInvoiceComponent,
    EditPurchaseInvoiceComponent,
    EditSaleInvoiceComponent,
    NewSaleInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
