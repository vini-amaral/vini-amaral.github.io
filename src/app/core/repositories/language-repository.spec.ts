import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Language } from '../models/language';
import { JsonLanguageRepository, LanguageRepository } from './language-repository';

describe('JsonLanguageRepository', () => {
  let repository: LanguageRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LanguageRepository, useClass: JsonLanguageRepository },
      ],
    });
    repository = TestBed.inject(LanguageRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should fetch and unwrap the languages from the JSON resource', () => {
    let emitted: Language[] | undefined;
    repository.getLanguages().subscribe((languages) => {
      emitted = languages;
    });

    const req = httpMock.expectOne('assets/data/languages.json');
    expect(req.request.method).toBe('GET');
    req.flush({
      version: 1,
      items: [
        {
          id: 'portuguese',
          name: 'Português',
          level: 'Fluente ou nativo',
          source: 'linkedin',
          reviewStatus: 'approved',
        },
      ],
    });

    expect(emitted?.length).toBe(1);
    expect(emitted?.[0].name).toBe('Português');
  });
});
