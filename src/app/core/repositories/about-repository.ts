import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  getAbout(): Observable<AboutContent> {
    return this.http
      .get<AboutResource>('assets/data/about.json')
      .pipe(map((resource) => resource.data));
  }
}
