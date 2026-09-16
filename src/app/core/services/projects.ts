import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface LocalizedText {
  'pt-BR': string;
  en: string;
}

export interface ProjectLinks {
  live: string | null;
  repository: string | null;
}

export interface Project {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  role: LocalizedText;
  technologies: string[];
  links: ProjectLinks;
  image: string | null;
  featured: boolean;
  status: string;
}

interface ProjectsResource {
  version: number;
  items: Project[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsContent {
  private readonly http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http
      .get<ProjectsResource>('assets/data/projects.json')
      .pipe(map((resource) => resource.items));
  }
}
