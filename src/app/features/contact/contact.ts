import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SocialLink } from '../../core/models/social-link';
import { SocialLinkRepository } from '../../core/repositories/social-link-repository';
import { Button } from '../../shared/ui/button/button';
import { Container } from '../../shared/ui/container/container';
import { Heading } from '../../shared/ui/heading/heading';
import { Section } from '../../shared/ui/section/section';

@Component({
  selector: 'app-contact',
  imports: [Section, Container, Heading, Button],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly socialLinkRepository = inject(SocialLinkRepository);

  protected readonly links = toSignal(this.socialLinkRepository.getSocialLinks(), {
    initialValue: [] as SocialLink[],
  });

  protected displayValue(link: SocialLink): string {
    if (!link.url) {
      return '';
    }
    if (link.type === 'email') {
      return link.url.replace(/^mailto:/, '');
    }
    return link.url.replace(/^https?:\/\/(www\.)?/, '');
  }
}
