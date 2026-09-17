import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { Language } from '../models/language';

export abstract class LanguageRepository {
  abstract getLanguages(): Observable<Language[]>;
}

interface LanguagesResource {
  version: number;
  items: Language[];
}

@Injectable()
export class JsonLanguageRepository extends LanguageRepository {
  private readonly http = inject(HttpClient);

  // Cached for the lifetime of this singleton repository: the JSON content
  // does not change during a session, so revisiting a route should not
  // re-fetch it.
  private readonly languages$ = this.http.get<LanguagesResource>('assets/data/languages.json').pipe(
    map((resource) => resource.items),
    shareReplay(1),
  );

  getLanguages(): Observable<Language[]> {
    return this.languages$;
  }
}
