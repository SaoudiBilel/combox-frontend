import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/customer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{

  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  addFormGroup! : FormGroup;

  constructor(private customerService : CustomerService, private formBuilder : FormBuilder, private router : Router) {}


  ngOnInit(): void {
    this.addFormGroup = this.formBuilder.group({
      name : this.formBuilder.control(null, [Validators.required]),
      phoneNumber : this.formBuilder.control(null, [Validators.minLength(10), Validators.maxLength(13)]),
      email : this.formBuilder.control(null, [Validators.email]),
    });
}

handleSave() {
  let customer = this.addFormGroup?.value;
  this.customerService.saveCustomer(customer).subscribe({
    next : data => {
      alert("Nouveau Client ajouté avec succès!");
      //this.addFormGroup.reset();
      this.router.navigateByUrl("/customers");
    },
    error : err => {
      console.log(err);
    }
  });
}

}
