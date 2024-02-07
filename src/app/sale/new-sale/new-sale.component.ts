import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../../model/sale';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from '../../services/sale.service';
import { Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrl: './new-sale.component.css'
})
export class NewSaleComponent {
  sales!: Observable<Array<Sale>>;
  products!: Array<Product>;
  errorMessage!: string;
  addFormGroup!: FormGroup;
  calculatedAmount!: number;
  productId!: number;

  constructor(
    private saleService: SaleService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.productService.getProductsByType(true).subscribe({
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
      productSale: ['', Validators.required],
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
    const productControl = this.addFormGroup.get('productSale');
    const quantityControl = this.addFormGroup.get('quantity');
    
    if (productControl && quantityControl) {
      productControl.valueChanges.subscribe((value: number) => {
        this.updateCalculatedAmount(quantityControl.value);
      });
    }
  }
  
  updateCalculatedAmount(quantity: number): void {
    const productControl = this.addFormGroup.get('productSale');
    if (productControl) {
      this.productId = +productControl.value;
      const product = this.products.find((p) => p.id === this.productId);
      if (product) {
        this.calculatedAmount = quantity * product.unitPrice;
      }
    }
  }

  handleSave() {
    let sale: Sale = this.addFormGroup.value;
    sale.productSale = this.products.find((p) => p.id === this.productId);
    sale.amount = this.calculatedAmount;
    this.saleService.saveSale(sale).subscribe({
      next: (data) => {
        alert('Nouveau Bon de commande ajouté avec succès!');
        this.router.navigateByUrl('/sales');
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
