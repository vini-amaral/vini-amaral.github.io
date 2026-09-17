import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRepository, JsonAboutRepository } from '../../core/repositories/about-repository';
import { About } from './about';

function flushAbout(httpMock: HttpTestingController, caseStudyEnabled = true): void {
  httpMock.expectOne('assets/data/about.json').flush({
    version: 1,
    data: {
      intro: { 'pt-BR': 'Oi! Eu sou o Vinicius!' },
      sections: [
        {
          id: 'origin',
          title: { 'pt-BR': 'De onde vem meu interesse por tecnologia' },
          body: [{ 'pt-BR': 'Parágrafo de origem.' }],
        },
        {
          id: 'capabilities',
          title: { 'pt-BR': 'Minha forma de trabalhar' },
          capabilities: ['project-management', 'unknown-id'],
        },
        {
          id: 'behavioral',
          title: { 'pt-BR': 'Competências comportamentais' },
          competencies: ['communication'],
        },
      ],
      caseStudy: {
        enabled: caseStudyEnabled,
        title: { 'pt-BR': 'Uma competência em ação' },
        situation: { 'pt-BR': 'Situação de teste.' },
        challenge: { 'pt-BR': 'Desafio de teste.' },
        action: { 'pt-BR': 'Ação de teste.' },
        result: { 'pt-BR': 'Resultado de teste.' },
        learning: { 'pt-BR': 'Aprendizado de teste.' },
      },
      source: 'portfolio',
      reviewStatus: 'draft',
    },
  });
}

describe('About', () => {
  let fixture: ComponentFixture<About>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AboutRepository, useClass: JsonAboutRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(About);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should render the page heading and intro', () => {
    fixture.detectChanges();
    flushAbout(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Sobre');
    expect(compiled.textContent).toContain('Oi! Eu sou o Vinicius!');
  });

  it('should render each section title and narrative paragraphs', () => {
    fixture.detectChanges();
    flushAbout(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('De onde vem meu interesse por tecnologia');
    expect(compiled.textContent).toContain('Parágrafo de origem.');
  });

  it('should translate known capability/competency ids and fall back to the raw id otherwise', () => {
    fixture.detectChanges();
    flushAbout(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Gestão de projetos');
    expect(compiled.textContent).toContain('unknown-id');
    expect(compiled.textContent).toContain('Comunicação');
  });

  it('should render the case study with the situation/challenge/action/result/learning fields when enabled', () => {
    fixture.detectChanges();
    flushAbout(httpMock, true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Uma competência em ação');
    expect(compiled.textContent).toContain('Situação de teste.');
    expect(compiled.textContent).toContain('Desafio de teste.');
    expect(compiled.textContent).toContain('Ação de teste.');
    expect(compiled.textContent).toContain('Resultado de teste.');
    expect(compiled.textContent).toContain('Aprendizado de teste.');
  });

  it('should not render the case study when disabled', () => {
    fixture.detectChanges();
    flushAbout(httpMock, false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Uma competência em ação');
  });
});
