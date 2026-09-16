import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  getSocialLinks(): Observable<SocialLink[]> {
    return this.http
      .get<SocialLinksResource>('assets/data/social-links.json')
      .pipe(map((resource) => resource.items.filter((link) => link.public && link.url)));
  }
}
