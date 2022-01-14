import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairTypeComponent } from './chair-type.component';

describe('ChairTypeComponent', () => {
  let component: ChairTypeComponent;
  let fixture: ComponentFixture<ChairTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChairTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
