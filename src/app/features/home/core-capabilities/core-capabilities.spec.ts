import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonSkillRepository, SkillRepository } from '../../../core/repositories/skill-repository';
import { CoreCapabilities } from './core-capabilities';

describe('CoreCapabilities', () => {
  let fixture: ComponentFixture<CoreCapabilities>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreCapabilities],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SkillRepository, useClass: JsonSkillRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CoreCapabilities);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/skills.json').flush({ version: 1, items: [] });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render every skill group with its items', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/skills.json').flush({
      version: 1,
      items: [
        {
          id: 'development',
          name: { 'pt-BR': 'Desenvolvimento', en: 'Development' },
          items: ['.NET', 'C#'],
        },
        {
          id: 'cloud-devops',
          name: { 'pt-BR': 'Cloud e DevOps', en: 'Cloud and DevOps' },
          items: ['Azure'],
        },
      ],
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const groupCards = compiled.querySelectorAll('.capabilities-list > li');
    expect(groupCards.length).toBe(2);
    expect(compiled.textContent).toContain('Desenvolvimento');
    expect(compiled.textContent).toContain('.NET');
    expect(compiled.textContent).toContain('Cloud e DevOps');
    expect(compiled.textContent).toContain('Azure');
  });
});
