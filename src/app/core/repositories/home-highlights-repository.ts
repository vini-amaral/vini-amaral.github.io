import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  getHomeHighlights(): Observable<HomeHighlightItem[]> {
    return this.http
      .get<HomeHighlightsResource>('assets/data/home-highlights.json')
      .pipe(map((resource) => resource.data.items));
  }
}
