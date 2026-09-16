import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SkillGroup, SkillsContent } from './skills';

describe('SkillsContent', () => {
  let service: SkillsContent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SkillsContent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and unwrap the skill groups from the JSON resource', () => {
    let emitted: SkillGroup[] | undefined;
    service.getSkills().subscribe((groups) => {
      emitted = groups;
    });

    const req = httpMock.expectOne('assets/data/skills.json');
    expect(req.request.method).toBe('GET');
    req.flush({
      version: 1,
      items: [
        {
          id: 'development',
          name: { 'pt-BR': 'Desenvolvimento', en: 'Development' },
          items: ['.NET', 'C#'],
        },
      ],
    });

    expect(emitted?.length).toBe(1);
    expect(emitted?.[0].id).toBe('development');
    expect(emitted?.[0].items).toEqual(['.NET', 'C#']);
  });
});
