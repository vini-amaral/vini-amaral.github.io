import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SocialLink } from '../models/social-link';
import { JsonSocialLinkRepository, SocialLinkRepository } from './social-link-repository';

describe('JsonSocialLinkRepository', () => {
  let repository: SocialLinkRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SocialLinkRepository, useClass: JsonSocialLinkRepository },
      ],
    });
    repository = TestBed.inject(SocialLinkRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should only return links that are public and have a URL', () => {
    let emitted: SocialLink[] | undefined;
    repository.getSocialLinks().subscribe((links) => {
      emitted = links;
    });

    const req = httpMock.expectOne('assets/data/social-links.json');
    expect(req.request.method).toBe('GET');
    req.flush({
      version: 1,
      items: [
        {
          id: 'linkedin',
          type: 'linkedin',
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/example',
          public: true,
          source: 'linkedin',
          reviewStatus: 'approved',
        },
        {
          id: 'email',
          type: 'email',
          label: 'E-mail',
          url: 'mailto:test@example.com',
          public: true,
          source: 'linkedin',
          reviewStatus: 'approved',
        },
        {
          id: 'github',
          type: 'github',
          label: 'GitHub',
          url: null,
          public: false,
          source: 'user',
          reviewStatus: 'draft',
        },
      ],
    });

    expect(emitted?.length).toBe(2);
    expect(emitted?.map((link) => link.id)).toEqual(['linkedin', 'email']);
  });
});
