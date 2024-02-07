import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Sale } from '../model/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http:HttpClient) { }

  public getSale(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${environment.backendHost}/sales/${id}`);
  }

  public getSales() : Observable <Array<Sale>> {
    return this.http.get <Array<Sale>> (`${environment.backendHost}/sales`)
  }

  public searchSales(keyword : string) : Observable <Array<Sale>> {
    return this.http.get <Array<Sale>> (`${environment.backendHost}/sales/search?keyword=${keyword}`)
  }

  public saveSale(sale : Sale) : Observable <Sale> {
    return this.http.post <Sale> (`${environment.backendHost}/sales`, sale)
  }

  public updateSale(sale: Sale): Observable<boolean> {
    return this.http.put<void>(`${environment.backendHost}/sales/${sale.id}`, sale)
      .pipe(
        map(() => true), // If the update was successful, return true
        catchError(() => of(false)) // If there was an error, return false
      );
  }

  public deleteSale(id: number): Observable<void> {
    return this.http.delete <void>(`${environment.backendHost}/sales/${id}`);
  }
}
