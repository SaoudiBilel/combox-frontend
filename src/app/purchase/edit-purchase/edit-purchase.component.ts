import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Product } from '../../model/product.model';
import { Purchase } from '../../model/purchase';
import { ProductService } from '../../services/product.service';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.component.html',
  styleUrls: ['./edit-purchase.component.css'],
})
export class EditPurchaseComponent implements OnInit, OnDestroy {
  purchaseId!: number;
  purchase!: Purchase;
  products!: Product[];
  errorMessage!: string;
  editFormGroup!: FormGroup;
  calculatedAmount!: number;
  productId: number | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.purchaseId = +this.route.snapshot.paramMap.get('id')!;
    this.initPurchase();
    this.initProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initPurchase(): void {
    this.purchaseService
      .getPurchase(this.purchaseId)
      .pipe(
        tap((data) => {
          this.purchase = data;
          this.initForm();
        }),
        catchError((err) => this.handleError('Error fetching purchase:', err)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  initProducts(): void {
    this.productService
      .getProductsByType(false)
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
      productPurchase: [this.purchase.productPurchase?.id, Validators.required],
      quantity: [this.purchase.quantity, [Validators.required, Validators.min(1)]],
    });
    this.calculatedAmount = this.purchase.amount;
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
    const productControl = this.editFormGroup.get('productPurchase');
    const quantityControl = this.editFormGroup.get('quantity');
    
    if (productControl && quantityControl) {
      productControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value: number) => {
        this.updateCalculatedAmount(quantityControl.value);
      });
    }
  }
  
  updateCalculatedAmount(quantity: number): void {
    const productControl = this.editFormGroup.get('productPurchase');
    if (productControl) {
      this.productId = +productControl.value;
      const product = this.products.find((p) => p.id === this.productId);
      if (product) {
        this.calculatedAmount = quantity * product.unitPrice;
      }
    }
  }

  handleSave(): void {
    const editedPurchase: Purchase = { ...this.editFormGroup.value, id: this.purchaseId };
    editedPurchase.productPurchase = this.products.find((p) => p.id === parseInt(this.editFormGroup.value.productPurchase));
    editedPurchase.amount = this.calculatedAmount;
    this.purchaseService
      .updatePurchase(editedPurchase)
      .pipe(
        tap(() => {
          alert('Bon de commande modifié avec succès!');
          this.router.navigateByUrl('/purchases');
        }),
        catchError((err) => this.handleError('Error updating purchase:', err)),
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
