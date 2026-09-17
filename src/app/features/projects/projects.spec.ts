import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import {
  JsonProjectRepository,
  ProjectRepository,
} from '../../core/repositories/project-repository';
import { Projects } from './projects';

function projectFixture(overrides: Record<string, unknown>) {
  return {
    id: 'example-1',
    slug: 'example-1',
    title: { 'pt-BR': 'Exemplo 1', en: 'Example 1' },
    summary: { 'pt-BR': 'Placeholder para projeto real.', en: 'Placeholder.' },
    problem: { 'pt-BR': 'A preencher.', en: 'To be filled.' },
    solution: { 'pt-BR': 'A preencher.', en: 'To be filled.' },
    role: { 'pt-BR': 'A preencher.', en: 'To be filled.' },
    technologies: [],
    links: { live: null, repository: null },
    image: null,
    featured: false,
    status: 'placeholder',
    source: 'user',
    reviewStatus: 'draft',
    ...overrides,
  };
}

describe('Projects', () => {
  let fixture: ComponentFixture<Projects>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProjectRepository, useClass: JsonProjectRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Projects);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/projects.json').flush({ version: 1, items: [] });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should list every project, regardless of the featured flag', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/projects.json').flush({
      version: 1,
      items: [
        projectFixture({ id: 'a', slug: 'a', featured: true, title: { 'pt-BR': 'A', en: 'A' } }),
        projectFixture({ id: 'b', slug: 'b', featured: false, title: { 'pt-BR': 'B', en: 'B' } }),
        projectFixture({ id: 'c', slug: 'c', featured: false, title: { 'pt-BR': 'C', en: 'C' } }),
      ],
    });
    fixture.detectChanges();

    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('app-project-summary');
    expect(cards.length).toBe(3);
  });
});
