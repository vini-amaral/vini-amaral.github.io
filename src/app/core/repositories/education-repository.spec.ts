import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EducationEntry } from '../models/education-entry';
import { EducationRepository, JsonEducationRepository } from './education-repository';

describe('JsonEducationRepository', () => {
  let repository: EducationRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: EducationRepository, useClass: JsonEducationRepository },
      ],
    });
    repository = TestBed.inject(EducationRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should fetch and unwrap the education entries from the JSON resource', () => {
    let emitted: EducationEntry[] | undefined;
    repository.getEducation().subscribe((entries) => {
      emitted = entries;
    });

    const req = httpMock.expectOne('assets/data/education.json');
    expect(req.request.method).toBe('GET');
    req.flush({
      version: 1,
      items: [
        {
          id: 'umc-information-systems',
          institution: 'Universidade de Mogi das Cruzes',
          degree: 'Bacharelado, Sistemas de Informação',
          startDate: '2006-07-01',
          endDate: '2010-06-30',
          description: { en: 'Description.' },
          source: 'linkedin',
          reviewStatus: 'approved',
        },
      ],
    });

    expect(emitted?.length).toBe(1);
    expect(emitted?.[0].institution).toBe('Universidade de Mogi das Cruzes');
  });
});
