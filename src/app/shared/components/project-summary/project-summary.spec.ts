import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Project } from '../../../core/models/project';
import { ProjectSummary } from './project-summary';

const PLACEHOLDER_PROJECT: Project = {
  id: 'example-1',
  slug: 'example-1',
  title: { 'pt-BR': 'Exemplo 1', en: 'Example 1' },
  summary: { 'pt-BR': 'Placeholder para projeto real.', en: 'Placeholder for a real project.' },
  problem: { 'pt-BR': 'A preencher.', en: 'To be filled.' },
  solution: { 'pt-BR': 'A preencher.', en: 'To be filled.' },
  role: { 'pt-BR': 'A preencher.', en: 'To be filled.' },
  technologies: [],
  links: { live: null, repository: null },
  image: null,
  featured: true,
  status: 'placeholder',
  source: 'user',
  reviewStatus: 'draft',
};

@Component({
  imports: [ProjectSummary],
  template: '<app-project-summary [project]="project" [titleLevel]="2" />',
})
class HostComponent {
  project: Project = PLACEHOLDER_PROJECT;
}

describe('ProjectSummary', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should render the project title and summary from the data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Exemplo 1');
    expect(compiled.textContent).toContain('Placeholder para projeto real.');
  });

  it('should render the title at the heading level the caller supplies, to keep the document outline sequential', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Exemplo 1');
    expect(compiled.querySelector('h3')).toBeFalsy();
  });

  it('should flag placeholder projects explicitly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Placeholder');
  });

  it('should not render technology tags when none are supplied', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.project-tech')).toBeFalsy();
  });

  it('should not render external links when none are supplied', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.project-link').length).toBe(0);
  });

  it('should link to the project detail route using the slug', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const detailLink = compiled.querySelector('a.button');
    expect(detailLink?.getAttribute('href')).toBe('/projects/example-1');
  });

  it('should render external links when supplied', () => {
    fixture.componentInstance.project = {
      ...PLACEHOLDER_PROJECT,
      technologies: ['Angular', 'TypeScript'],
      links: { live: 'https://example.com', repository: 'https://github.com/example/repo' },
    };
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll('.project-link'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      'https://example.com',
      'https://github.com/example/repo',
    ]);
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('TypeScript');
  });
});
