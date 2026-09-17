import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { HomeHighlightItem } from '../models/home-highlight';

export abstract class HomeHighlightsRepository {
  abstract getHomeHighlights(): Observable<HomeHighlightItem[]>;
}

interface HomeHighlightsResource {
  version: number;
  data: {
    updatedAt: string;
    items: HomeHighlightItem[];
  };
}

@Injectable()
export class JsonHomeHighlightsRepository extends HomeHighlightsRepository {
  private readonly http = inject(HttpClient);

  // Cached for the lifetime of this singleton repository: the JSON content
  // does not change during a session, so revisiting a route should not
  // re-fetch it.
  private readonly homeHighlights$ = this.http
    .get<HomeHighlightsResource>('assets/data/home-highlights.json')
    .pipe(
      map((resource) => resource.data.items),
      shareReplay(1),
    );

  getHomeHighlights(): Observable<HomeHighlightItem[]> {
    return this.homeHighlights$;
  }
}
