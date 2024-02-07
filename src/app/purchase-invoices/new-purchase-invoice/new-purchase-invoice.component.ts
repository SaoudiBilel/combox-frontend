import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provider } from '../../model/provider.model';
import { PurchaseInvoiceService } from '../../services/purchase-invoice.service';
import { ProviderService } from '../../services/provider.service';
import { PurchaseService } from '../../services/purchase.service';


interface Purchase {
  id: number;
  name: string;
}

@Component({
  selector: 'app-new-purchase-invoice',
  templateUrl: './new-purchase-invoice.component.html',
  styleUrl: './new-purchase-invoice.component.css'
})
export class NewPurchaseInvoiceComponent {

  purchaseInvoice = {
    reference: 0,
    purchases: [] as Purchase[],
    totalAmount: 0,
    provider: '',
    status: ''
  };

  purchases = [
    { id: 1, name: 'Purchase 1' },
    { id: 2, name: 'Purchase 2' },
    { id: 3, name: 'Purchase 3' }
  ];

  selectedPurchases: { [key: string]: boolean } = {};

  providers = ['Provider 1', 'Provider 2', 'Provider 3'];

  statuses = ['Status 1', 'Status 2', 'Status 3'];

  submitForm() {
    const selectedPurchaseIds = Object.keys(this.selectedPurchases)
      .filter(key => this.selectedPurchases[key])
      .map(key => parseInt(key, 10)); // Specify the radix/base as 10
    
    const selectedPurchases = this.purchases.filter(purchase => selectedPurchaseIds.includes(purchase.id));

    this.purchaseInvoice.purchases = selectedPurchases;
    
    // Here, you can handle submitting the purchase invoice data
    console.log('Submitted Purchase Invoice:', this.purchaseInvoice);
  }
}