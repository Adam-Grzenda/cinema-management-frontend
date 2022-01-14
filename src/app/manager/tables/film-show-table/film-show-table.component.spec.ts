import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmShowTableComponent } from './film-show-table.component';

describe('FilmShowTableComponent', () => {
  let component: FilmShowTableComponent;
  let fixture: ComponentFixture<FilmShowTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmShowTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmShowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
