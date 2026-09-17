import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

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

  // Cached for the lifetime of this singleton repository: the JSON content
  // does not change during a session, so revisiting a route should not
  // re-fetch it.
  private readonly projects$ = this.http.get<ProjectsResource>('assets/data/projects.json').pipe(
    map((resource) => resource.items),
    shareReplay(1),
  );

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }
}
