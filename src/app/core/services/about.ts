import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface LocalizedText {
  'pt-BR': string;
}

export interface AboutSection {
  id: string;
  title: LocalizedText;
  body?: LocalizedText[];
}

export interface AboutData {
  intro: LocalizedText;
  sections: AboutSection[];
}

interface AboutResource {
  version: number;
  data: AboutData;
}

@Injectable({
  providedIn: 'root',
})
export class AboutContent {
  private readonly http = inject(HttpClient);

  getAbout(): Observable<AboutData> {
    return this.http
      .get<AboutResource>('assets/data/about.json')
      .pipe(map((resource) => resource.data));
  }
}
