import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCourtProductTypeComponent } from './food-court-product-type.component';

describe('FoodCourtProductTypeComponent', () => {
  let component: FoodCourtProductTypeComponent;
  let fixture: ComponentFixture<FoodCourtProductTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCourtProductTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCourtProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
