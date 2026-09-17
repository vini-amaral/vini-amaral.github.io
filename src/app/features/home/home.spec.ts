import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AboutRepository, JsonAboutRepository } from '../../core/repositories/about-repository';
import {
  ExperienceRepository,
  JsonExperienceRepository,
} from '../../core/repositories/experience-repository';
import {
  HomeHighlightsRepository,
  JsonHomeHighlightsRepository,
} from '../../core/repositories/home-highlights-repository';
import {
  JsonProjectRepository,
  ProjectRepository,
} from '../../core/repositories/project-repository';
import {
  JsonProfileRepository,
  ProfileRepository,
} from '../../core/repositories/profile-repository';
import { JsonSkillRepository, SkillRepository } from '../../core/repositories/skill-repository';
import {
  JsonSocialLinkRepository,
  SocialLinkRepository,
} from '../../core/repositories/social-link-repository';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProfileRepository, useClass: JsonProfileRepository },
        { provide: HomeHighlightsRepository, useClass: JsonHomeHighlightsRepository },
        { provide: ProjectRepository, useClass: JsonProjectRepository },
        { provide: SkillRepository, useClass: JsonSkillRepository },
        { provide: ExperienceRepository, useClass: JsonExperienceRepository },
        { provide: AboutRepository, useClass: JsonAboutRepository },
        { provide: SocialLinkRepository, useClass: JsonSocialLinkRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpMock.expectOne('assets/data/profile.json').flush({
      version: 1,
      data: {
        id: 'vinicius-alves-do-amaral',
        name: 'Vinicius Alves do Amaral',
        headline: 'Team Lead | Scrum Master | Tech Lead',
        location: 'São Paulo, São Paulo, Brasil',
        summary: { en: 'Summary.' },
        source: 'linkedin',
        reviewStatus: 'approved',
      },
    });
    httpMock.expectOne('assets/data/home-highlights.json').flush({
      version: 1,
      data: { updatedAt: '2026-01-01', items: [] },
    });
    httpMock.expectOne('assets/data/projects.json').flush({ version: 1, items: [] });
    httpMock.expectOne('assets/data/skills.json').flush({ version: 1, items: [] });
    httpMock.expectOne('assets/data/experience.json').flush({ version: 1, items: [] });
    httpMock
      .expectOne('assets/data/about.json')
      .flush({ version: 1, data: { intro: { 'pt-BR': '' }, sections: [] } });
    httpMock.expectOne('assets/data/social-links.json').flush({ version: 1, items: [] });
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the home sections in the order defined by the product specification', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headings = Array.from(compiled.querySelectorAll('h1, h2')).map((el) =>
      el.textContent?.trim(),
    );

    expect(headings).toEqual([
      'Vinicius Alves do Amaral',
      'Agora',
      'Projetos selecionados',
      'Capacidades técnicas',
      'Trajetória de carreira',
      'Sobre',
      'Contato',
    ]);
  });
});
