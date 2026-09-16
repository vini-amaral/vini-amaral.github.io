import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HomeHighlightItem, HomeHighlights } from './home-highlights';

describe('HomeHighlights', () => {
  let service: HomeHighlights;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(HomeHighlights);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and unwrap the highlight items from the JSON resource', () => {
    let emitted: HomeHighlightItem[] | undefined;
    service.getHomeHighlights().subscribe((items) => {
      emitted = items;
    });

    const req = httpMock.expectOne('assets/data/home-highlights.json');
    expect(req.request.method).toBe('GET');
    req.flush({
      version: 1,
      data: {
        updatedAt: '2026-01-01',
        items: [
          {
            id: 'current-role',
            type: 'professional',
            label: { 'pt-BR': 'Atualmente', en: 'Currently' },
            title: { 'pt-BR': 'Título de teste', en: 'Test title' },
            description: { 'pt-BR': 'Descrição de teste.', en: 'Test description.' },
          },
        ],
      },
    });

    expect(emitted?.length).toBe(1);
    expect(emitted?.[0].id).toBe('current-role');
    expect(emitted?.[0].title['pt-BR']).toBe('Título de teste');
  });
});
