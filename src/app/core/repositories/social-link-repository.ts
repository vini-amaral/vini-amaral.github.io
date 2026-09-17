import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { SocialLink } from '../models/social-link';

export abstract class SocialLinkRepository {
  abstract getSocialLinks(): Observable<SocialLink[]>;
}

interface SocialLinksResource {
  version: number;
  items: SocialLink[];
}

@Injectable()
export class JsonSocialLinkRepository extends SocialLinkRepository {
  private readonly http = inject(HttpClient);

  // Cached for the lifetime of this singleton repository: the JSON content
  // does not change during a session, so revisiting a route should not
  // re-fetch it.
  private readonly socialLinks$ = this.http
    .get<SocialLinksResource>('assets/data/social-links.json')
    .pipe(
      map((resource) => resource.items.filter((link) => link.public && link.url)),
      shareReplay(1),
    );

  getSocialLinks(): Observable<SocialLink[]> {
    return this.socialLinks$;
  }
}
