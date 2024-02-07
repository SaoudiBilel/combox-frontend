import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Purchase } from '../model/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http:HttpClient) { }

  public getPurchase(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${environment.backendHost}/purchases/${id}`);
  }

  public getPurchases() : Observable <Array<Purchase>> {
    return this.http.get <Array<Purchase>> (`${environment.backendHost}/purchases`)
  }

  public searchPurchases(keyword : string) : Observable <Array<Purchase>> {
    return this.http.get <Array<Purchase>> (`${environment.backendHost}/purchases/search?keyword=${keyword}`)
  }

  public savePurchase(purchase : Purchase) : Observable <Purchase> {
    return this.http.post <Purchase> (`${environment.backendHost}/purchases`, purchase)
  }

  public updatePurchase(purchase: Purchase): Observable<boolean> {
    return this.http.put<void>(`${environment.backendHost}/purchases/${purchase.id}`, purchase)
      .pipe(
        map(() => true), // If the update was successful, return true
        catchError(() => of(false)) // If there was an error, return false
      );
  }

  public deletePurchase(id: number): Observable<void> {
    return this.http.delete <void>(`${environment.backendHost}/purchases/${id}`);
  }
}
