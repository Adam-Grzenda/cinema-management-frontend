import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCourtTableComponent } from './food-court-table.component';

describe('FoodCourtTableComponent', () => {
  let component: FoodCourtTableComponent;
  let fixture: ComponentFixture<FoodCourtTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCourtTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCourtTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
