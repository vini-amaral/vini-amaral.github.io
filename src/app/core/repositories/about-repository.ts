import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { AboutContent } from '../models/about-content';

export abstract class AboutRepository {
  abstract getAbout(): Observable<AboutContent>;
}

interface AboutResource {
  version: number;
  data: AboutContent;
}

@Injectable()
export class JsonAboutRepository extends AboutRepository {
  private readonly http = inject(HttpClient);

  // Cached for the lifetime of this singleton repository: the JSON content
  // does not change during a session, so revisiting a route should not
  // re-fetch it.
  private readonly about$ = this.http.get<AboutResource>('assets/data/about.json').pipe(
    map((resource) => resource.data),
    shareReplay(1),
  );

  getAbout(): Observable<AboutContent> {
    return this.about$;
  }
}
