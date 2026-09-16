import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AboutRepository, JsonAboutRepository } from '../../../core/repositories/about-repository';
import { AboutTeaser } from './about-teaser';

describe('AboutTeaser', () => {
  let fixture: ComponentFixture<AboutTeaser>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTeaser],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AboutRepository, useClass: JsonAboutRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AboutTeaser);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should render the intro and the first available narrative paragraph from the data', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/about.json').flush({
      version: 1,
      data: {
        intro: { 'pt-BR': 'Oi! Eu sou o Vinicius!' },
        sections: [
          {
            id: 'capabilities',
            title: { 'pt-BR': 'Minha forma de trabalhar' },
            capabilities: ['project-management'],
          },
          {
            id: 'origin',
            title: { 'pt-BR': 'Origem' },
            body: [{ 'pt-BR': 'Parágrafo de origem.' }],
          },
        ],
      },
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Oi! Eu sou o Vinicius!');
    expect(compiled.textContent).toContain('Parágrafo de origem.');
  });

  it('should always link to the full About page', () => {
    fixture.detectChanges();
    httpMock
      .expectOne('assets/data/about.json')
      .flush({ version: 1, data: { intro: { 'pt-BR': '' }, sections: [] } });
    fixture.detectChanges();

    const link = (fixture.nativeElement as HTMLElement).querySelector('a.button');
    expect(link?.getAttribute('href')).toBe('/about');
    expect(link?.textContent).toContain('Saiba mais sobre mim');
  });
});
