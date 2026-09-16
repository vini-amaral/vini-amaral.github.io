import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SkillGroup } from '../models/skill-group';
import { JsonSkillRepository, SkillRepository } from './skill-repository';

describe('JsonSkillRepository', () => {
  let repository: SkillRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SkillRepository, useClass: JsonSkillRepository },
      ],
    });
    repository = TestBed.inject(SkillRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should fetch and unwrap the skill groups from the JSON resource', () => {
    let emitted: SkillGroup[] | undefined;
    repository.getSkills().subscribe((groups) => {
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
  });
});
