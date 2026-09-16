import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  getExperience(): Observable<ExperienceEntry[]> {
    return this.http
      .get<ExperienceResource>('assets/data/experience.json')
      .pipe(map((resource) => resource.items));
  }
}
