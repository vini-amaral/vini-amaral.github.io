import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  getProfile(): Observable<Profile> {
    return this.http
      .get<ProfileResource>('assets/data/profile.json')
      .pipe(map((resource) => resource.data));
  }
}
