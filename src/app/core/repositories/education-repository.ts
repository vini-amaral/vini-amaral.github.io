import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { EducationEntry } from '../models/education-entry';

export abstract class EducationRepository {
  abstract getEducation(): Observable<EducationEntry[]>;
}

interface EducationResource {
  version: number;
  items: EducationEntry[];
}

@Injectable()
export class JsonEducationRepository extends EducationRepository {
  private readonly http = inject(HttpClient);

  // Cached for the lifetime of this singleton repository: the JSON content
  // does not change during a session, so revisiting a route should not
  // re-fetch it.
  private readonly education$ = this.http.get<EducationResource>('assets/data/education.json').pipe(
    map((resource) => resource.items),
    shareReplay(1),
  );

  getEducation(): Observable<EducationEntry[]> {
    return this.education$;
  }
}
