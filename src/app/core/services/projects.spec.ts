import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Project, ProjectsContent } from './projects';

describe('ProjectsContent', () => {
  let service: ProjectsContent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProjectsContent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and unwrap the project items from the JSON resource', () => {
    let emitted: Project[] | undefined;
    service.getProjects().subscribe((projects) => {
      emitted = projects;
    });

    const req = httpMock.expectOne('assets/data/projects.json');
    expect(req.request.method).toBe('GET');
    req.flush({
      version: 1,
      items: [
        {
          id: 'example-1',
          slug: 'example-1',
          title: { 'pt-BR': 'Exemplo 1', en: 'Example 1' },
          summary: { 'pt-BR': 'Placeholder para projeto real.', en: 'Placeholder.' },
          problem: { 'pt-BR': 'A preencher.', en: 'To be filled.' },
          solution: { 'pt-BR': 'A preencher.', en: 'To be filled.' },
          role: { 'pt-BR': 'A preencher.', en: 'To be filled.' },
          technologies: [],
          links: { live: null, repository: null },
          image: null,
          featured: true,
          status: 'placeholder',
        },
      ],
    });

    expect(emitted?.length).toBe(1);
    expect(emitted?.[0].slug).toBe('example-1');
  });
});
