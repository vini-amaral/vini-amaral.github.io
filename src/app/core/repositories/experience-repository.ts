import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { ExperienceEntry } from '../models/experience-entry';

export abstract class ExperienceRepository {
  abstract getExperience(): Observable<ExperienceEntry[]>;
}

interface ExperienceResource {
  version: number;
  items: ExperienceEntry[];
}

@Injectable()
export class JsonExperienceRepository extends ExperienceRepository {
  private readonly http = inject(HttpClient);

  // Cached for the lifetime of this singleton repository: the JSON content
  // does not change during a session, so revisiting a route should not
  // re-fetch it.
  private readonly experience$ = this.http
    .get<ExperienceResource>('assets/data/experience.json')
    .pipe(
      map((resource) => resource.items),
      shareReplay(1),
    );

  getExperience(): Observable<ExperienceEntry[]> {
    return this.experience$;
  }
}
