import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from '../model/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http:HttpClient) { }

  public getProviders() : Observable<Array<Provider>> {
    return this.http.get <Array<Provider>> ("http://localhost:8089/providers")
  }
}
