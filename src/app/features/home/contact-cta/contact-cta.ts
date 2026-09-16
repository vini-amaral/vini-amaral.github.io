import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SocialLink, SocialLinksContent } from '../../../core/services/social-links';
import { Button } from '../../../shared/ui/button/button';
import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

@Component({
  selector: 'app-contact-cta',
  imports: [Section, Container, Heading, Button],
  templateUrl: './contact-cta.html',
  styleUrl: './contact-cta.css',
})
export class ContactCta {
  private readonly socialLinksContent = inject(SocialLinksContent);

  protected readonly links = toSignal(this.socialLinksContent.getSocialLinks(), {
    initialValue: [] as SocialLink[],
  });
}
