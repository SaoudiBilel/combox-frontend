import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../../model/purchase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '../../services/purchase.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css'], // Changed 'styleUrl' to 'styleUrls'
})
export class NewPurchaseComponent implements OnInit {
  purchases!: Observable<Array<Purchase>>;
  products!: Array<Product>;
  errorMessage!: string;
  addFormGroup!: FormGroup;
  calculatedAmount!: number;
  productId!: number;

  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.productService.getProductsByType(false).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.addFormGroup = this.formBuilder.group({
      productPurchase: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
    this.subscribeToQuantityChanges();
    this.subscribeToProductChanges();
  }

  subscribeToQuantityChanges(): void {
    const quantityControl = this.addFormGroup.get('quantity');
    if (quantityControl) {
      quantityControl.valueChanges.subscribe((value: number) => {
        this.updateCalculatedAmount(value);
      });
    }
  }

  subscribeToProductChanges(): void {
    const productControl = this.addFormGroup.get('productPurchase');
    const quantityControl = this.addFormGroup.get('quantity');
    
    if (productControl && quantityControl) {
      productControl.valueChanges.subscribe((value: number) => {
        this.updateCalculatedAmount(quantityControl.value);
      });
    }
  }
  
  updateCalculatedAmount(quantity: number): void {
    const productControl = this.addFormGroup.get('productPurchase');
    if (productControl) {
      this.productId = +productControl.value;
      const product = this.products.find((p) => p.id === this.productId);
      if (product) {
        this.calculatedAmount = quantity * product.unitPrice;
      }
    }
  }

  handleSave() {
    let purchase: Purchase = this.addFormGroup.value;
    purchase.productPurchase = this.products.find((p) => p.id === this.productId);
    purchase.amount = this.calculatedAmount;
    this.purchaseService.savePurchase(purchase).subscribe({
      next: (data) => {
        alert('Nouveau Bon de commande ajouté avec succès!');
        this.router.navigateByUrl('/purchases');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  formatAmount(amount: number): string {
    if(!amount) amount =0;
    return amount?.toFixed(2).replace(',', ''); // Format to two decimal places and remove comma
  }
}
