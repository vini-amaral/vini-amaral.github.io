import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { SkillGroup } from '../models/skill-group';

export abstract class SkillRepository {
  abstract getSkills(): Observable<SkillGroup[]>;
}

interface SkillsResource {
  version: number;
  items: SkillGroup[];
}

@Injectable()
export class JsonSkillRepository extends SkillRepository {
  private readonly http = inject(HttpClient);

  getSkills(): Observable<SkillGroup[]> {
    return this.http
      .get<SkillsResource>('assets/data/skills.json')
      .pipe(map((resource) => resource.items));
  }
}
