import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Provider } from '../model/provider.model';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.css'
})
export class ProvidersComponent implements OnInit{

  providers!: Observable<Array<Provider>>;
  errorMessage!: string;

  constructor(private providerService : ProviderService) {}


  ngOnInit(): void {
    this.providers = this.providerService.getProviders().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() =>err);
      })
    );
}

}