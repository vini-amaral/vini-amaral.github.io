import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import {
  JsonProjectRepository,
  ProjectRepository,
} from '../../../core/repositories/project-repository';
import { ProjectDetail } from './project-detail';

function flushProjects(httpMock: HttpTestingController): void {
  httpMock.expectOne('assets/data/projects.json').flush({
    version: 1,
    items: [
      {
        id: 'example-1',
        slug: 'example-1',
        title: { 'pt-BR': 'Exemplo 1', en: 'Example 1' },
        summary: { 'pt-BR': 'Placeholder para projeto real.', en: 'Placeholder.' },
        problem: { 'pt-BR': 'Problema de teste.', en: 'Test problem.' },
        solution: { 'pt-BR': 'Solução de teste.', en: 'Test solution.' },
        role: { 'pt-BR': 'Papel de teste.', en: 'Test role.' },
        technologies: ['Angular'],
        links: { live: 'https://example.com', repository: 'https://github.com/example/repo' },
        image: null,
        featured: true,
        status: 'placeholder',
        source: 'user',
        reviewStatus: 'draft',
      },
    ],
  });
}

@Component({
  imports: [ProjectDetail],
  template: '<app-project-detail [slug]="slug" />',
})
class HostComponent {
  slug?: string;
}

describe('ProjectDetail', () => {
  let fixture: ComponentFixture<HostComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProjectRepository, useClass: JsonProjectRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(HostComponent);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should render the full detail for a known slug', () => {
    fixture.componentInstance.slug = 'example-1';
    fixture.detectChanges();
    flushProjects(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Exemplo 1');
    expect(compiled.textContent).toContain('Problema de teste.');
    expect(compiled.textContent).toContain('Solução de teste.');
    expect(compiled.textContent).toContain('Papel de teste.');
    expect(compiled.textContent).toContain('Angular');
  });

  it('should render live and repository links when supplied', () => {
    fixture.componentInstance.slug = 'example-1';
    fixture.detectChanges();
    flushProjects(httpMock);
    fixture.detectChanges();

    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('a.button'),
    ).map((a) => a.getAttribute('href'));
    expect(links).toContain('https://example.com');
    expect(links).toContain('https://github.com/example/repo');
    expect(links).toContain('/projects');
  });

  it('should show a not-found message for an unknown slug instead of crashing', () => {
    fixture.componentInstance.slug = 'does-not-exist';
    fixture.detectChanges();
    flushProjects(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('não encontrado');
    const backLink = compiled.querySelector('a.button');
    expect(backLink?.getAttribute('href')).toBe('/projects');
  });
});
