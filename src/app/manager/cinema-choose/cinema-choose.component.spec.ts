import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaChooseComponent } from './cinema-choose.component';

describe('CinemaChooseComponent', () => {
  let component: CinemaChooseComponent;
  let fixture: ComponentFixture<CinemaChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaChooseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
