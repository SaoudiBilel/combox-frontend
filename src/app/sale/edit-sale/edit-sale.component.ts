import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Product } from '../../model/product.model';
import { Sale } from '../../model/sale';
import { ProductService } from '../../services/product.service';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.css'],
})
export class EditSaleComponent implements OnInit, OnDestroy {
  saleId!: number;
  sale!: Sale;
  products!: Product[];
  errorMessage!: string;
  editFormGroup!: FormGroup;
  calculatedAmount!: number;
  productId: number | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private saleService: SaleService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.saleId = +this.route.snapshot.paramMap.get('id')!;
    this.initSale();
    this.initProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initSale(): void {
    this.saleService
      .getSale(this.saleId)
      .pipe(
        tap((data) => {
          this.sale = data;
          this.initForm();
        }),
        catchError((err) => this.handleError('Error fetching sale:', err)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  initProducts(): void {
    this.productService
      .getProductsByType(true)
      .pipe(
        tap((data) => {
          this.products = data;
        }),
        catchError((err) => this.handleError('Error fetching products:', err)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  initForm(): void {
    this.editFormGroup = this.formBuilder.group({
      productSale: [this.sale.productSale?.id, Validators.required],
      quantity: [this.sale.quantity, [Validators.required, Validators.min(1)]],
    });
    this.calculatedAmount = this.sale.amount;
    this.subscribeToQuantityChanges();
    this.subscribeToProductChanges();
  }

  subscribeToQuantityChanges(): void {
    const quantityControl = this.editFormGroup.get('quantity');
    if (quantityControl) {
      quantityControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value: number) => {
        this.updateCalculatedAmount(value);
      });
    }
  }

  subscribeToProductChanges(): void {
    const productControl = this.editFormGroup.get('productSale');
    const quantityControl = this.editFormGroup.get('quantity');
    
    if (productControl && quantityControl) {
      productControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value: number) => {
        this.updateCalculatedAmount(quantityControl.value);
      });
    }
  }
  
  updateCalculatedAmount(quantity: number): void {
    const productControl = this.editFormGroup.get('productSale');
    if (productControl) {
      this.productId = +productControl.value;
      const product = this.products.find((p) => p.id === this.productId);
      if (product) {
        this.calculatedAmount = quantity * product.unitPrice;
      }
    }
  }

  handleSave(): void {
    const editedSale: Sale = { ...this.editFormGroup.value, id: this.saleId };
    editedSale.productSale = this.products.find((p) => p.id === parseInt(this.editFormGroup.value.productSale));
    editedSale.amount = this.calculatedAmount;
    this.saleService
      .updateSale(editedSale)
      .pipe(
        tap(() => {
          alert('Bon de commande modifié avec succès!');
          this.router.navigateByUrl('/sales');
        }),
        catchError((err) => this.handleError('Error updating sale:', err)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  formatAmount(amount: number): string {
    return amount.toFixed(2).replace(',', ''); // Format to two decimal places and remove comma
  }

  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    // Handle error
    return throwError(() => error);
  }
}
