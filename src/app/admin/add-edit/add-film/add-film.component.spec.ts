import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilmAddComponent} from './film-add.component';

describe('MovieAddComponent', () => {
  let component: FilmAddComponent;
  let fixture: ComponentFixture<FilmAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
