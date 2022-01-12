import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSegmentTableComponent } from './client-segment-table.component';

describe('ClientSegmentTableComponent', () => {
  let component: ClientSegmentTableComponent;
  let fixture: ComponentFixture<ClientSegmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSegmentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSegmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
