import { Component } from '@angular/core';
import { Sale } from '../model/sale';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaleService } from '../services/sale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent {

  sales!: Observable<Array<Sale>>;
  errorMessage!: string;
  searchFormGroup! : FormGroup;

  constructor(private saleService : SaleService, private formBuilder : FormBuilder, private router : Router) {}


  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword : this.formBuilder.control("")
    });

    this.handleSearch();
}

handleSearch() {
  let kw = this.searchFormGroup?.value.keyword;
  this.sales = this.saleService.searchSales(kw).pipe(
    catchError(err => {
      this.errorMessage = err.message;
      return throwError(() =>err);
    })
  );
}

handleUpdate(c: Sale) {
  if (c && c.id) {
    this.router.navigateByUrl(`/edit-sale/${c.id}`);
  }
}

handleDelete(c : Sale) {
  let conf = confirm("Êtes-vous sûr(e) de vouloir supprimer?")
  if(!conf) return;
  this.saleService.deleteSale(c.id).subscribe({
    next : data => {
      this.sales = this.sales.pipe(
        map((data) => {
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

formatAmount(amount: number): string {
  return amount.toFixed(2).replace(',', ''); // Format to two decimal places and remove comma
}

}