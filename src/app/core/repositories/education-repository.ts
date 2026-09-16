import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  getEducation(): Observable<EducationEntry[]> {
    return this.http
      .get<EducationResource>('assets/data/education.json')
      .pipe(map((resource) => resource.items));
  }
}
