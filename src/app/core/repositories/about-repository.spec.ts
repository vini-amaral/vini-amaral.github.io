import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AboutContent } from '../models/about-content';
import { AboutRepository, JsonAboutRepository } from './about-repository';

describe('JsonAboutRepository', () => {
  let repository: AboutRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AboutRepository, useClass: JsonAboutRepository },
      ],
    });
    repository = TestBed.inject(AboutRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should fetch and unwrap the about data from the JSON resource', () => {
    let emitted: AboutContent | undefined;
    repository.getAbout().subscribe((about) => {
      emitted = about;
    });

    const req = httpMock.expectOne('assets/data/about.json');
    expect(req.request.method).toBe('GET');
    req.flush({
      version: 1,
      data: {
        intro: { 'pt-BR': 'Oi! Eu sou o Vinicius!' },
        sections: [{ id: 'origin', title: { 'pt-BR': 'Origem' }, body: [{ 'pt-BR': 'Texto.' }] }],
        source: 'portfolio',
        reviewStatus: 'draft',
      },
    });

    expect(emitted?.intro['pt-BR']).toBe('Oi! Eu sou o Vinicius!');
    expect(emitted?.sections[0].id).toBe('origin');
  });
});
