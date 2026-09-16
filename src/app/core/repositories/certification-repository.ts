import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  getCertifications(): Observable<Certification[]> {
    return this.http
      .get<CertificationsResource>('assets/data/certifications.json')
      .pipe(map((resource) => resource.items));
  }
}
