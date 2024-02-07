import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { SaleInvoice } from '../model/sale-invoice';


@Injectable({
  providedIn: 'root'
})
export class SaleInvoiceService {

  constructor(private http:HttpClient) { }

  public getSaleInvoice(id: number): Observable<SaleInvoice> {
    return this.http.get<SaleInvoice>(`${environment.backendHost}/salesInvoices/${id}`);
  }

  public getSaleInvoices() : Observable <Array<SaleInvoice>> {
    return this.http.get <Array<SaleInvoice>> (`${environment.backendHost}/salesInvoices`)
  }

  public searchSaleInvoices(keyword : string) : Observable <Array<SaleInvoice>> {
    return this.http.get <Array<SaleInvoice>> (`${environment.backendHost}/salesInvoices/search?keyword=${keyword}`)
  }

  public saveSaleInvoice(sale : SaleInvoice) : Observable <SaleInvoice> {
    return this.http.post <SaleInvoice> (`${environment.backendHost}/salesInvoices`, sale)
  }

  public updateSaleInvoice(sale: SaleInvoice): Observable<boolean> {
    return this.http.put<void>(`${environment.backendHost}/salesInvoices/${sale.id}`, sale)
      .pipe(
        map(() => true), // If the update was successful, return true
        catchError(() => of(false)) // If there was an error, return false
      );
  }

  public deleteSaleInvoice(id: number): Observable<void> {
    return this.http.delete <void>(`${environment.backendHost}/salesInvoices/${id}`);
  }
}
