import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaleInvoiceComponent } from './edit-sale-invoice.component';

describe('EditSaleInvoiceComponent', () => {
  let component: EditSaleInvoiceComponent;
  let fixture: ComponentFixture<EditSaleInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSaleInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSaleInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
