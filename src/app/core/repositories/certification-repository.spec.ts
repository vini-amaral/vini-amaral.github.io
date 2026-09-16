import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Certification } from '../models/certification';
import { CertificationRepository, JsonCertificationRepository } from './certification-repository';

describe('JsonCertificationRepository', () => {
  let repository: CertificationRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CertificationRepository, useClass: JsonCertificationRepository },
      ],
    });
    repository = TestBed.inject(CertificationRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should fetch and unwrap the certifications from the JSON resource', () => {
    let emitted: Certification[] | undefined;
    repository.getCertifications().subscribe((certifications) => {
      emitted = certifications;
    });

    const req = httpMock.expectOne('assets/data/certifications.json');
    expect(req.request.method).toBe('GET');
    req.flush({
      version: 1,
      items: [
        {
          id: 'psm-i',
          name: 'Professional Scrum Master™ I (PSM I)',
          issuer: 'Scrum.org',
          issueDate: '2024-05-01',
          expirationDate: null,
          credentialId: null,
          status: 'validity-not-specified',
          source: 'linkedin',
          reviewStatus: 'approved',
        },
      ],
    });

    expect(emitted?.length).toBe(1);
    expect(emitted?.[0].issuer).toBe('Scrum.org');
  });
});
