import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public getProducts() : Observable<Array<Product>> {
    return this.http.get <Array<Product>> (`${environment.backendHost}/products`)
  }

  public getProductsByType(forSale : boolean) : Observable<Array<Product>> {
    return this.http.get <Array<Product>> (`${environment.backendHost}/products/type?forSale=${forSale}`)
  }
}