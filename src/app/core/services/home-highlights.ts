import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface LocalizedText {
  'pt-BR': string;
  en: string;
}

export interface HomeHighlightItem {
  id: string;
  type: string;
  label: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
}

interface HomeHighlightsResource {
  version: number;
  data: {
    updatedAt: string;
    items: HomeHighlightItem[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class HomeHighlights {
  private readonly http = inject(HttpClient);

  getHomeHighlights(): Observable<HomeHighlightItem[]> {
    return this.http
      .get<HomeHighlightsResource>('assets/data/home-highlights.json')
      .pipe(map((resource) => resource.data.items));
  }
}
