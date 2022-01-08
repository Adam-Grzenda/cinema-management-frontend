import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairsTableComponent } from './chairs-table.component';

describe('ChairsTableComponent', () => {
  let component: ChairsTableComponent;
  let fixture: ComponentFixture<ChairsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChairsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
