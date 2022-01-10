import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaTableComponent } from './cinema-table.component';

describe('CinemaTableComponent', () => {
  let component: CinemaTableComponent;
  let fixture: ComponentFixture<CinemaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
