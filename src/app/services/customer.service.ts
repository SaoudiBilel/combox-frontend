import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Customer } from '../model/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  public getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${environment.backendHost}/customers/${id}`);
  }

  public getCustomers() : Observable <Array<Customer>> {
    return this.http.get <Array<Customer>> (`${environment.backendHost}/customers`)
  }

  public searchCustomers(keyword : string) : Observable <Array<Customer>> {
    return this.http.get <Array<Customer>> (`${environment.backendHost}/customers/search?keyword=${keyword}`)
  }

  public saveCustomer(customer : Customer) : Observable <Customer> {
    return this.http.post <Customer> (`${environment.backendHost}/customers`, customer)
  }

  public updateCustomer(customer: Customer): Observable<boolean> {
    return this.http.put<void>(`${environment.backendHost}/customers/${customer.id}`, customer)
      .pipe(
        map(() => true), // If the update was successful, return true
        catchError(() => of(false)) // If there was an error, return false
      );
  }

  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete <void>(`${environment.backendHost}/customers/${id}`);
  }
}
