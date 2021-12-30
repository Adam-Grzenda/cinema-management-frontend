import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilmCard} from './film-card.component';

describe('MovieCardComponent', () => {
  let component: FilmCard;
  let fixture: ComponentFixture<FilmCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmCard ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
