import { Component } from '@angular/core';
import { SaleInvoiceService } from '../services/sale-invoice.service';
import { SaleInvoice } from '../model/sale-invoice';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-invoices',
  templateUrl: './sales-invoices.component.html',
  styleUrl: './sales-invoices.component.css'
})
export class SalesInvoicesComponent {

  invoices!: Observable<Array<SaleInvoice>>;
  errorMessage!: string;
  searchFormGroup! : FormGroup;

  constructor(private saleInvoiceService : SaleInvoiceService, private formBuilder : FormBuilder, private router : Router) {}


  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword : this.formBuilder.control("")
    });

    this.handleSearch();
}

handleSearch() {
  let kw = this.searchFormGroup?.value.keyword;
  this.invoices = this.saleInvoiceService.searchSaleInvoices(kw).pipe(
    catchError(err => {
      this.errorMessage = err.message;
      return throwError(() =>err);
    })
  );
}

handleUpdate(c: SaleInvoice) {
  if (c && c.id) {
    //this.router.navigateByUrl(`/edit-saleInvoice/${c.id}`);
  }
}

handleDelete(c : SaleInvoice) {
  let conf = confirm("Êtes-vous sûr(e) de vouloir supprimer?")
  if(!conf) return;
  this.saleInvoiceService.deleteSaleInvoice(c.id).subscribe({
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
