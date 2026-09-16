import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AboutRepository } from '../../../core/repositories/about-repository';
import { Button } from '../../../shared/ui/button/button';
import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

@Component({
  selector: 'app-about-teaser',
  imports: [Section, Container, Heading, Button],
  templateUrl: './about-teaser.html',
  styleUrl: './about-teaser.css',
})
export class AboutTeaser {
  private readonly aboutRepository = inject(AboutRepository);

  private readonly about = toSignal(this.aboutRepository.getAbout(), { initialValue: null });

  protected readonly intro = computed(() => this.about()?.intro['pt-BR'] ?? '');

  protected readonly teaserParagraph = computed(() => {
    const section = this.about()?.sections.find((s) => s.body && s.body.length > 0);
    return section?.body?.[0]['pt-BR'] ?? '';
  });
}
