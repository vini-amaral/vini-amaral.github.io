import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface LocalizedText {
  'pt-BR': string;
  en: string;
}

export interface SkillGroup {
  id: string;
  name: LocalizedText;
  items: string[];
}

interface SkillsResource {
  version: number;
  items: SkillGroup[];
}

@Injectable({
  providedIn: 'root',
})
export class SkillsContent {
  private readonly http = inject(HttpClient);

  getSkills(): Observable<SkillGroup[]> {
    return this.http
      .get<SkillsResource>('assets/data/skills.json')
      .pipe(map((resource) => resource.items));
  }
}
