import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeTableComponent } from './product-type-table.component';

describe('ProductTypeTableComponent', () => {
  let component: ProductTypeTableComponent;
  let fixture: ComponentFixture<ProductTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTypeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
