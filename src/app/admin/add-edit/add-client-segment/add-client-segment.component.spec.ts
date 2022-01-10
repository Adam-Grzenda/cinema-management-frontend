import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientSegmentComponent } from './add-client-segment.component';

describe('AddClientSegmentComponent', () => {
  let component: AddClientSegmentComponent;
  let fixture: ComponentFixture<AddClientSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
