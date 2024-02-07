import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaleInvoiceComponent } from './new-sale-invoice.component';

describe('NewSaleInvoiceComponent', () => {
  let component: NewSaleInvoiceComponent;
  let fixture: ComponentFixture<NewSaleInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSaleInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSaleInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
