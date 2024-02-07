import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products!: Observable<Array<Product>>;
  errorMessage!: string;

  constructor(private productService : ProductService) {}


  ngOnInit(): void {
    this.products = this.productService.getProducts().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() =>err);
      })
    );
}

}