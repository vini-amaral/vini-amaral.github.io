import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface ExperienceRole {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  roles: ExperienceRole[];
}

interface ExperienceResource {
  version: number;
  items: ExperienceEntry[];
}

@Injectable({
  providedIn: 'root',
})
export class ExperienceContent {
  private readonly http = inject(HttpClient);

  getExperience(): Observable<ExperienceEntry[]> {
    return this.http
      .get<ExperienceResource>('assets/data/experience.json')
      .pipe(map((resource) => resource.items));
  }
}
