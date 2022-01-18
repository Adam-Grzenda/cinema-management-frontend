import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChairsComponent } from './add-chairs.component';

describe('AddChairsComponent', () => {
  let component: AddChairsComponent;
  let fixture: ComponentFixture<AddChairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChairsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
