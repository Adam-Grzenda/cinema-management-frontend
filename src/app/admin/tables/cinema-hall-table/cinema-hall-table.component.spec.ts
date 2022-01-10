import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaHallTableComponent } from './cinema-hall-table.component';

describe('CinemaHallTableComponent', () => {
  let component: CinemaHallTableComponent;
  let fixture: ComponentFixture<CinemaHallTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaHallTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaHallTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
