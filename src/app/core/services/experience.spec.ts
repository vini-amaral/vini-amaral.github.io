import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExperienceContent, ExperienceEntry } from './experience';

describe('ExperienceContent', () => {
  let service: ExperienceContent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ExperienceContent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and unwrap the experience entries from the JSON resource', () => {
    let emitted: ExperienceEntry[] | undefined;
    service.getExperience().subscribe((entries) => {
      emitted = entries;
    });

    const req = httpMock.expectOne('assets/data/experience.json');
    expect(req.request.method).toBe('GET');
    req.flush({
      version: 1,
      items: [
        {
          id: 'avanade',
          company: 'Avanade',
          roles: [{ id: 'r1', title: 'Analyst', startDate: '2012-12-01', endDate: null }],
        },
      ],
    });

    expect(emitted?.length).toBe(1);
    expect(emitted?.[0].company).toBe('Avanade');
    expect(emitted?.[0].roles[0].title).toBe('Analyst');
  });
});
