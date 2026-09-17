import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';

const SITE_NAME = 'Vinicius Alves do Amaral';
const SITE_URL = 'https://vini-amaral.github.io';
const DEFAULT_DESCRIPTION = 'Portfólio de Vinicius Alves do Amaral, Software Engineer & Tech Lead.';

// specs/05-requirements.md NFR-005: every route needs an appropriate title,
// description and canonical metadata. This strategy reads Route.title (built
// in) and Route.data.description (project convention) on every navigation and
// keeps the meta description, canonical link and share tags in sync with it.
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    const fullTitle = pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
    this.title.setTitle(fullTitle);

    const description = this.findDescription(snapshot.root) ?? DEFAULT_DESCRIPTION;
    const canonicalUrl = `${SITE_URL}${snapshot.url}`;

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.updateCanonicalLink(canonicalUrl);
  }

  private findDescription(snapshot: ActivatedRouteSnapshot): string | undefined {
    let current: ActivatedRouteSnapshot | null = snapshot;
    let description: string | undefined;
    while (current) {
      description = (current.data['description'] as string | undefined) ?? description;
      current = current.firstChild;
    }
    return description;
  }

  private updateCanonicalLink(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
