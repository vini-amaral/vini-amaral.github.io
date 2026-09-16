import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SocialLink } from '../../../core/models/social-link';
import { SocialLinkRepository } from '../../../core/repositories/social-link-repository';
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
  private readonly socialLinkRepository = inject(SocialLinkRepository);

  protected readonly links = toSignal(this.socialLinkRepository.getSocialLinks(), {
    initialValue: [] as SocialLink[],
  });
}
