import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

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

  // Cached for the lifetime of this singleton repository: the JSON content
  // does not change during a session, so revisiting a route should not
  // re-fetch it.
  private readonly skills$ = this.http.get<SkillsResource>('assets/data/skills.json').pipe(
    map((resource) => resource.items),
    shareReplay(1),
  );

  getSkills(): Observable<SkillGroup[]> {
    return this.skills$;
  }
}
