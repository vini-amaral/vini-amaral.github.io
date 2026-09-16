import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  getLanguages(): Observable<Language[]> {
    return this.http
      .get<LanguagesResource>('assets/data/languages.json')
      .pipe(map((resource) => resource.items));
  }
}
