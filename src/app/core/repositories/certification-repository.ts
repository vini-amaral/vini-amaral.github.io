import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { Certification } from '../models/certification';

export abstract class CertificationRepository {
  abstract getCertifications(): Observable<Certification[]>;
}

interface CertificationsResource {
  version: number;
  items: Certification[];
}

@Injectable()
export class JsonCertificationRepository extends CertificationRepository {
  private readonly http = inject(HttpClient);

  // Cached for the lifetime of this singleton repository: the JSON content
  // does not change during a session, so revisiting a route should not
  // re-fetch it.
  private readonly certifications$ = this.http
    .get<CertificationsResource>('assets/data/certifications.json')
    .pipe(
      map((resource) => resource.items),
      shareReplay(1),
    );

  getCertifications(): Observable<Certification[]> {
    return this.certifications$;
  }
}
