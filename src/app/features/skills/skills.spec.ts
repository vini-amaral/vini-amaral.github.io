import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonSkillRepository, SkillRepository } from '../../core/repositories/skill-repository';
import { Skills } from './skills';

function flushSkills(httpMock: HttpTestingController): void {
  httpMock.expectOne('assets/data/skills.json').flush({
    version: 1,
    items: [
      {
        id: 'development',
        name: { 'pt-BR': 'Desenvolvimento', en: 'Development' },
        items: ['.NET', 'C#'],
      },
      {
        id: 'agile-leadership',
        name: { 'pt-BR': 'Agilidade e liderança', en: 'Agile and leadership' },
        items: ['Scrum Master', 'Tech Lead'],
      },
      {
        id: 'cloud-devops',
        name: { 'pt-BR': 'Cloud e DevOps', en: 'Cloud and DevOps' },
        items: ['Azure', 'Azure DevOps', 'Copilot'],
      },
      {
        id: 'business-analysis',
        name: { 'pt-BR': 'Negócio e análise', en: 'Business and analysis' },
        items: ['Storytelling'],
      },
    ],
  });
}

describe('Skills', () => {
  let fixture: ComponentFixture<Skills>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skills],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SkillRepository, useClass: JsonSkillRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Skills);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should render the four expected category headings in order', () => {
    fixture.detectChanges();
    flushSkills(httpMock);
    fixture.detectChanges();

    const headings = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('h2')).map(
      (h) => h.textContent?.trim(),
    );
    expect(headings).toEqual([
      'Engenharia',
      'Liderança',
      'Entrega',
      'IA aplicada ao desenvolvimento',
    ]);
  });

  it('should split "Cloud e DevOps" so Copilot lands under AI and the rest under Delivery', () => {
    fixture.detectChanges();
    flushSkills(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const sections = Array.from(compiled.querySelectorAll('app-section'));

    const deliverySection = sections.find((s) => s.textContent?.includes('Entrega'));
    const aiSection = sections.find((s) => s.textContent?.includes('IA aplicada'));

    expect(deliverySection?.textContent).toContain('Azure');
    expect(deliverySection?.textContent).toContain('Azure DevOps');
    expect(deliverySection?.textContent).not.toContain('Copilot');

    expect(aiSection?.textContent).toContain('Copilot');
    expect(aiSection?.textContent).not.toContain('Azure DevOps');
  });

  it('should not invent or drop any technology from the source data', () => {
    fixture.detectChanges();
    flushSkills(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tags = Array.from(compiled.querySelectorAll('.tag')).map((t) => t.textContent?.trim());
    expect(tags.sort()).toEqual(
      [
        '.NET',
        'C#',
        'Scrum Master',
        'Tech Lead',
        'Azure',
        'Azure DevOps',
        'Copilot',
        'Storytelling',
      ].sort(),
    );
  });

  it('should not render a category heading when no group maps to it', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/skills.json').flush({
      version: 1,
      items: [
        {
          id: 'development',
          name: { 'pt-BR': 'Desenvolvimento', en: 'Development' },
          items: ['.NET'],
        },
      ],
    });
    fixture.detectChanges();

    const headings = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('h2')).map(
      (h) => h.textContent?.trim(),
    );
    expect(headings).toEqual(['Engenharia']);
  });
});
