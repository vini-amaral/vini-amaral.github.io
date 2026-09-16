import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HomeHighlightItem } from '../models/home-highlight';
import {
  HomeHighlightsRepository,
  JsonHomeHighlightsRepository,
} from './home-highlights-repository';

describe('JsonHomeHighlightsRepository', () => {
  let repository: HomeHighlightsRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: HomeHighlightsRepository, useClass: JsonHomeHighlightsRepository },
      ],
    });
    repository = TestBed.inject(HomeHighlightsRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should fetch and unwrap the highlight items from the JSON resource', () => {
    let emitted: HomeHighlightItem[] | undefined;
    repository.getHomeHighlights().subscribe((items) => {
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
            source: 'linkedin',
            reviewStatus: 'approved',
          },
        ],
      },
    });

    expect(emitted?.length).toBe(1);
    expect(emitted?.[0].id).toBe('current-role');
  });
});
