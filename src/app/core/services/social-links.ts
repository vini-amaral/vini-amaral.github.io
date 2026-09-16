import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface SocialLink {
  id: string;
  type: string;
  label: string;
  url: string | null;
  public: boolean;
}

interface SocialLinksResource {
  version: number;
  items: SocialLink[];
}

@Injectable({
  providedIn: 'root',
})
export class SocialLinksContent {
  private readonly http = inject(HttpClient);

  getSocialLinks(): Observable<SocialLink[]> {
    return this.http
      .get<SocialLinksResource>('assets/data/social-links.json')
      .pipe(map((resource) => resource.items.filter((link) => link.public && link.url)));
  }
}
