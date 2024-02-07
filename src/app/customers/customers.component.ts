import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{

  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup! : FormGroup;

  constructor(private customerService : CustomerService, private formBuilder : FormBuilder, private router : Router) {}


  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword : this.formBuilder.control("")
    });

    this.handleSearch();
}

handleSearch() {
  let kw = this.searchFormGroup?.value.keyword;
  this.customers = this.customerService.searchCustomers(kw).pipe(
    catchError(err => {
      this.errorMessage = err.message;
      return throwError(() =>err);
    })
  );
}

handleUpdate(c: Customer) {
  if (c && c.id) {
    this.router.navigateByUrl(`/edit-customer/${c.id}`);
  }
}

handleDelete(c : Customer) {
  let conf = confirm("Êtes-vous sûr(e) de vouloir supprimer?")
  if(!conf) return;
  this.customerService.deleteCustomer(c.id).subscribe({
    next : data => {
      this.customers = this.customers.pipe(
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
