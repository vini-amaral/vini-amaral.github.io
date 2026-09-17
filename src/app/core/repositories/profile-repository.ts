import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { Profile } from '../models/profile';

export abstract class ProfileRepository {
  abstract getProfile(): Observable<Profile>;
}

interface ProfileResource {
  version: number;
  data: Profile;
}

@Injectable()
export class JsonProfileRepository extends ProfileRepository {
  private readonly http = inject(HttpClient);

  // Cached for the lifetime of this singleton repository: the JSON content
  // does not change during a session, so revisiting a route should not
  // re-fetch it.
  private readonly profile$ = this.http.get<ProfileResource>('assets/data/profile.json').pipe(
    map((resource) => resource.data),
    shareReplay(1),
  );

  getProfile(): Observable<Profile> {
    return this.profile$;
  }
}
