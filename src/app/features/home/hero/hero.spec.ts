import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import {
  JsonProfileRepository,
  ProfileRepository,
} from '../../../core/repositories/profile-repository';
import { Hero } from './hero';

describe('Hero', () => {
  let fixture: ComponentFixture<Hero>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProfileRepository, useClass: JsonProfileRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Hero);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function flushProfile(): void {
    httpMock.expectOne('assets/data/profile.json').flush({
      version: 1,
      data: {
        id: 'vinicius-alves-do-amaral',
        name: 'Vinicius Alves do Amaral',
        headline: 'Team Lead | Scrum Master | Tech Lead',
        location: 'São Paulo, São Paulo, Brasil',
        summary: { en: 'Resumo profissional de exemplo.' },
        source: 'linkedin',
        reviewStatus: 'approved',
      },
    });
  }

  it('should render the name from the profile data as the main heading', () => {
    fixture.detectChanges();
    flushProfile();
    fixture.detectChanges();

    const heading = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(heading?.textContent).toContain('Vinicius Alves do Amaral');
  });

  it('should render the editorial title and the profile summary', () => {
    fixture.detectChanges();
    flushProfile();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Software Engineer & Tech Lead');
    expect(compiled.textContent).toContain('Resumo profissional de exemplo.');
  });

  it('should render a primary CTA linking to the projects route', () => {
    fixture.detectChanges();
    flushProfile();
    fixture.detectChanges();

    const link = (fixture.nativeElement as HTMLElement).querySelector('a.button');
    expect(link?.getAttribute('href')).toBe('/projects');
  });

  it('should mark the decorative portrait placeholder as hidden from assistive technology', () => {
    fixture.detectChanges();
    flushProfile();
    fixture.detectChanges();

    const placeholder = (fixture.nativeElement as HTMLElement).querySelector('.hero-portrait');
    expect(placeholder?.getAttribute('aria-hidden')).toBe('true');
  });
});
