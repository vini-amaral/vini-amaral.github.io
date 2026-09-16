import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExperienceEntry } from '../models/experience-entry';
import { ExperienceRepository, JsonExperienceRepository } from './experience-repository';

describe('JsonExperienceRepository', () => {
  let repository: ExperienceRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ExperienceRepository, useClass: JsonExperienceRepository },
      ],
    });
    repository = TestBed.inject(ExperienceRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should fetch and unwrap the experience entries from the JSON resource', () => {
    let emitted: ExperienceEntry[] | undefined;
    repository.getExperience().subscribe((entries) => {
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
          employmentType: 'full-time',
          roles: [
            {
              id: 'r1',
              title: 'Analyst',
              specialty: 'Developer',
              startDate: '2012-12-01',
              endDate: null,
              dateLabel: 'Dec 2012 – Present',
              description: { en: 'Description.' },
              technologies: ['.NET'],
              source: 'linkedin',
              reviewStatus: 'approved',
            },
          ],
          source: 'linkedin',
          reviewStatus: 'approved',
        },
      ],
    });

    expect(emitted?.length).toBe(1);
    expect(emitted?.[0].company).toBe('Avanade');
    expect(emitted?.[0].roles[0].title).toBe('Analyst');
  });
});
