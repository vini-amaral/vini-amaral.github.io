import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CareerSnapshot } from './career-snapshot';

describe('CareerSnapshot', () => {
  let fixture: ComponentFixture<CareerSnapshot>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerSnapshot],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CareerSnapshot);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/experience.json').flush({ version: 1, items: [] });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should collapse the role history into a chronological, deduplicated sequence of stages', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/experience.json').flush({
      version: 1,
      items: [
        {
          id: 'avanade',
          company: 'Avanade',
          roles: [
            { id: 'r5', title: 'Associate Manager', startDate: '2026-06-01', endDate: null },
            { id: 'r4', title: 'Consultant', startDate: '2020-06-01', endDate: '2026-05-28' },
            { id: 'r3', title: 'Consultant', startDate: '2022-01-01', endDate: '2023-07-28' },
            { id: 'r2', title: 'Senior Analyst', startDate: '2015-04-01', endDate: '2020-05-28' },
            { id: 'r1', title: 'Analyst', startDate: '2012-12-01', endDate: '2015-03-28' },
          ],
        },
      ],
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const stageLabels = Array.from(compiled.querySelectorAll('.career-stages li')).map((el) =>
      el.textContent?.trim(),
    );

    expect(stageLabels).toEqual(['Analyst', 'Senior Analyst', 'Consultant', 'Associate Manager']);
  });

  it('should mark only the most recent stage as current', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/experience.json').flush({
      version: 1,
      items: [
        {
          id: 'avanade',
          company: 'Avanade',
          roles: [
            { id: 'r1', title: 'Analyst', startDate: '2012-12-01', endDate: '2015-03-28' },
            { id: 'r2', title: 'Associate Manager', startDate: '2026-06-01', endDate: null },
          ],
        },
      ],
    });
    fixture.detectChanges();

    const tags = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.career-stages app-tag .tag'),
    );
    expect(tags[0].classList).not.toContain('tag--accent');
    expect(tags[1].classList).toContain('tag--accent');
  });

  it('should always render a link to the full experience page', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/experience.json').flush({ version: 1, items: [] });
    fixture.detectChanges();

    const link = (fixture.nativeElement as HTMLElement).querySelector('a.button');
    expect(link?.getAttribute('href')).toBe('/experience');
    expect(link?.textContent).toContain('Ver experiência completa');
  });
});
