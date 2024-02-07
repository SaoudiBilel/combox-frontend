import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { PurchaseInvoice } from '../model/purchase-invoice';


@Injectable({
  providedIn: 'root'
})
export class PurchaseInvoiceService {

  constructor(private http:HttpClient) { }

  public getPurchaseInvoice(id: number): Observable<PurchaseInvoice> {
    return this.http.get<PurchaseInvoice>(`${environment.backendHost}/purchaseInvoices/${id}`);
  }

  public getPurchaseInvoices() : Observable <Array<PurchaseInvoice>> {
    return this.http.get <Array<PurchaseInvoice>> (`${environment.backendHost}/purchaseInvoices`)
  }

  public searchPurchaseInvoices(keyword : string) : Observable <Array<PurchaseInvoice>> {
    return this.http.get <Array<PurchaseInvoice>> (`${environment.backendHost}/purchaseInvoices/search?keyword=${keyword}`)
  }

  public savePurchaseInvoice(purchase : PurchaseInvoice) : Observable <PurchaseInvoice> {
    return this.http.post <PurchaseInvoice> (`${environment.backendHost}/purchaseInvoices`, purchase)
  }

  public updatePurchaseInvoice(purchase: PurchaseInvoice): Observable<boolean> {
    return this.http.put<void>(`${environment.backendHost}/purchaseInvoices/${purchase.id}`, purchase)
      .pipe(
        map(() => true), // If the update was successful, return true
        catchError(() => of(false)) // If there was an error, return false
      );
  }

  public deletePurchaseInvoice(id: number): Observable<void> {
    return this.http.delete <void>(`${environment.backendHost}/purchaseInvoices/${id}`);
  }
}
