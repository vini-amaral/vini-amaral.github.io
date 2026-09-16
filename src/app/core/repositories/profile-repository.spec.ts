import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Profile } from '../models/profile';
import { JsonProfileRepository, ProfileRepository } from './profile-repository';

describe('JsonProfileRepository', () => {
  let repository: ProfileRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProfileRepository, useClass: JsonProfileRepository },
      ],
    });
    repository = TestBed.inject(ProfileRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should fetch and unwrap the profile from the JSON resource', () => {
    let emitted: Profile | undefined;
    repository.getProfile().subscribe((profile) => {
      emitted = profile;
    });

    const req = httpMock.expectOne('assets/data/profile.json');
    expect(req.request.method).toBe('GET');
    req.flush({
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

    expect(emitted?.id).toBe('vinicius-alves-do-amaral');
    expect(emitted?.name).toBe('Vinicius Alves do Amaral');
  });
});
