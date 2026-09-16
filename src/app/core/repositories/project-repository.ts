import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Project } from '../models/project';

export abstract class ProjectRepository {
  abstract getProjects(): Observable<Project[]>;
}

interface ProjectsResource {
  version: number;
  items: Project[];
}

@Injectable()
export class JsonProjectRepository extends ProjectRepository {
  private readonly http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http
      .get<ProjectsResource>('assets/data/projects.json')
      .pipe(map((resource) => resource.items));
  }
}
