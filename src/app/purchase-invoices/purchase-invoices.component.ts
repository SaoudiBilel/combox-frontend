import { Component } from '@angular/core';
import { PurchaseInvoice } from '../model/purchase-invoice';
import { PurchaseInvoiceService } from '../services/purchase-invoice.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-invoices',
  templateUrl: './purchase-invoices.component.html',
  styleUrl: './purchase-invoices.component.css'
})
export class PurchaseInvoicesComponent {

  invoices!: Observable<Array<PurchaseInvoice>>;
  errorMessage!: string;
  searchFormGroup! : FormGroup;

  constructor(private purchaseInvoiceService : PurchaseInvoiceService, private formBuilder : FormBuilder, private router : Router) {}


  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword : this.formBuilder.control("")
    });

    this.handleSearch();
}

handleSearch() {
  let kw = this.searchFormGroup?.value.keyword;
  this.invoices = this.purchaseInvoiceService.searchPurchaseInvoices(kw).pipe(
    catchError(err => {
      this.errorMessage = err.message;
      return throwError(() =>err);
    })
  );
}

handleUpdate(c: PurchaseInvoice) {
  if (c && c.id) {
    //this.router.navigateByUrl(`/edit-purchaseInvoice/${c.id}`);
  }
}

handleDelete(c : PurchaseInvoice) {
  let conf = confirm("Êtes-vous sûr(e) de vouloir supprimer?")
  if(!conf) return;
  this.purchaseInvoiceService.deletePurchaseInvoice(c.id).subscribe({
    next : data => {
      this.invoices = this.invoices.pipe(
        map(data => {
          let index = data.indexOf(c);
          data.slice(index,1);
          return data;
        })
      )
    },
    error : err => {
      console.log(err);
    }
  });
}

}
