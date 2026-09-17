import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ExperienceRepository,
  JsonExperienceRepository,
} from '../../core/repositories/experience-repository';
import { Experience } from './experience';

function flushExperience(httpMock: HttpTestingController): void {
  httpMock.expectOne('assets/data/experience.json').flush({
    version: 1,
    items: [
      {
        id: 'avanade',
        company: 'Avanade',
        employmentType: 'full-time',
        roles: [
          {
            id: 'r-old',
            title: 'Consultant',
            specialty: 'Technical Lead | Developer',
            startDate: '2020-06-01',
            endDate: '2022-01-28',
            dateLabel: 'Jun 2020 – Jan 2022',
            description: { en: 'Older role description.' },
            technologies: ['.NET'],
            source: 'linkedin',
            reviewStatus: 'approved',
          },
          {
            id: 'r-current',
            title: 'Associate Manager',
            specialty: 'Tech Lead | Scrum Master',
            startDate: '2026-06-01',
            endDate: null,
            dateLabel: 'Jun 2026 – Present',
            description: { en: 'Current role description.' },
            technologies: ['Angular', 'Azure DevOps'],
            source: 'linkedin',
            reviewStatus: 'approved',
          },
        ],
        source: 'linkedin',
        reviewStatus: 'approved',
        sourceNote: 'Internal note that must never be rendered publicly.',
      },
      {
        id: 'b2sys-consultoria-e-sistemas',
        company: 'B2sys Consultoria E Sistemas',
        employmentType: 'full-time',
        roles: [
          {
            id: 'r-b2sys',
            title: 'Developer',
            specialty: 'Developer',
            startDate: '2010-08-01',
            endDate: '2011-05-28',
            dateLabel: 'Aug 2010 – May 2011',
            description: { en: 'B2sys role description.' },
            technologies: ['ASP.NET'],
            source: 'linkedin',
            reviewStatus: 'approved',
          },
        ],
        source: 'linkedin',
        reviewStatus: 'approved',
      },
    ],
  });
}

describe('Experience', () => {
  let fixture: ComponentFixture<Experience>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Experience],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ExperienceRepository, useClass: JsonExperienceRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Experience);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should render companies in the order provided, most recent role first within each', () => {
    fixture.detectChanges();
    flushExperience(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const companyHeadings = Array.from(compiled.querySelectorAll('h2')).map((h) =>
      h.textContent?.trim(),
    );
    expect(companyHeadings).toEqual(['Avanade', 'B2sys Consultoria E Sistemas']);

    const roleTitles = Array.from(compiled.querySelectorAll('h3')).map((h) =>
      h.textContent?.trim(),
    );
    expect(roleTitles).toEqual(['Associate Manager', 'Consultant', 'Developer']);
  });

  it('should mark only the most recent open-ended role as current', () => {
    fixture.detectChanges();
    flushExperience(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const roleItems = Array.from(compiled.querySelectorAll('.role-item'));
    expect(roleItems[0].textContent).toContain('Atual');
    expect(roleItems[1].textContent).not.toContain('Atual');
  });

  it('should translate the employment type', () => {
    fixture.detectChanges();
    flushExperience(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Tempo integral');
  });

  it('should render technologies as tags', () => {
    fixture.detectChanges();
    flushExperience(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('Azure DevOps');
  });

  it('should never render internal metadata such as sourceNote or reviewStatus', () => {
    fixture.detectChanges();
    flushExperience(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Internal note');
    expect(compiled.textContent).not.toContain('approved');
  });
});
