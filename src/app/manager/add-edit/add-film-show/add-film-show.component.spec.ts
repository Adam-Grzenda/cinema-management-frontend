import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilmShowComponent } from './add-film-show.component';

describe('AddFilmShowComponent', () => {
  let component: AddFilmShowComponent;
  let fixture: ComponentFixture<AddFilmShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFilmShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFilmShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
