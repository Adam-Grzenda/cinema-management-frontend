import { TestBed } from '@angular/core/testing';

import { FilmShowService } from './film-show.service';

describe('FilmShowService', () => {
  let service: FilmShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
