import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../model/customer.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit{

  customerId! : number;
  customer! : Customer;
  editFormGroup! : FormGroup;

  constructor(private route : ActivatedRoute, private customerService : CustomerService, private formBuilder : FormBuilder,
    private router : Router) {
    this.customerId = this.route.snapshot.params['id'];
    this.editFormGroup = new FormGroup({
      name: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
  });
  }


  ngOnInit(): void {
    this.customerService.getCustomer(this.customerId).subscribe({
      next : (customer) => {
        this.customer = customer;
        this.editFormGroup = this.formBuilder.group({
          name : this.formBuilder.control(this.customer.name, [Validators.required]),
          phoneNumber : this.formBuilder.control(this.customer.phoneNumber, [Validators.minLength(10), Validators.maxLength(13)]),
          email : this.formBuilder.control(this.customer.email, [Validators.email])
        });
      }, error : (err) => {
        console.log(err);
      }
    })
  }

  handleUpdate() {
    let c = this.editFormGroup.value;
    c.id = this.customer.id;
    this.customerService.updateCustomer(c).subscribe({
      next : ()=>{
        alert("Client modifié avec succès")
        this.router.navigateByUrl("/customers");
      }, error : err => {
        console.log(err);
      }
    })
  }

}
