import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodCourtComponent } from './add-food-court.component';

describe('AddFoodCourtComponent', () => {
  let component: AddFoodCourtComponent;
  let fixture: ComponentFixture<AddFoodCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFoodCourtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
