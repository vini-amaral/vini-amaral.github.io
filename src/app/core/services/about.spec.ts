import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AboutContent, AboutData } from './about';

describe('AboutContent', () => {
  let service: AboutContent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AboutContent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and unwrap the about data from the JSON resource', () => {
    let emitted: AboutData | undefined;
    service.getAbout().subscribe((about) => {
      emitted = about;
    });

    const req = httpMock.expectOne('assets/data/about.json');
    expect(req.request.method).toBe('GET');
    req.flush({
      version: 1,
      data: {
        intro: { 'pt-BR': 'Oi! Eu sou o Vinicius!' },
        sections: [{ id: 'origin', title: { 'pt-BR': 'Origem' }, body: [{ 'pt-BR': 'Texto.' }] }],
      },
    });

    expect(emitted?.intro['pt-BR']).toBe('Oi! Eu sou o Vinicius!');
    expect(emitted?.sections[0].id).toBe('origin');
  });
});
