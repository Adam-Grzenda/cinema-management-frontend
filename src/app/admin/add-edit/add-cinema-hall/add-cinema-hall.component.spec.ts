import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCinemaHallComponent } from './add-cinema-hall.component';

describe('AddCinemaHallComponent', () => {
  let component: AddCinemaHallComponent;
  let fixture: ComponentFixture<AddCinemaHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCinemaHallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCinemaHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
