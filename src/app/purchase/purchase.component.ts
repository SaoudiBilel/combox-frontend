import { Component } from '@angular/core';
import { Purchase } from '../model/purchase';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PurchaseService } from '../services/purchase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {

  purchases!: Observable<Array<Purchase>>;
  errorMessage!: string;
  searchFormGroup! : FormGroup;

  constructor(private purchaseService : PurchaseService, private formBuilder : FormBuilder, private router : Router) {}


  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword : this.formBuilder.control("")
    });

    this.handleSearch();
}

handleSearch() {
  let kw = this.searchFormGroup?.value.keyword;
  this.purchases = this.purchaseService.searchPurchases(kw).pipe(
    catchError(err => {
      this.errorMessage = err.message;
      return throwError(() =>err);
    })
  );
}

handleUpdate(c: Purchase) {
  if (c && c.id) {
    this.router.navigateByUrl(`/edit-purchase/${c.id}`);
  }
}

handleDelete(c : Purchase) {
  let conf = confirm("Êtes-vous sûr(e) de vouloir supprimer?")
  if(!conf) return;
  this.purchaseService.deletePurchase(c.id).subscribe({
    next : data => {
      this.purchases = this.purchases.pipe(
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