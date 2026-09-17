import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ProfileRepository } from '../../../core/repositories/profile-repository';
import { Button } from '../../../shared/ui/button/button';
import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

// specs/09-decision-log.md ADR-007: the Hero shows an editorial positioning
// instead of the raw LinkedIn headline, which emphasizes leadership roles.
const HERO_TITLE = 'Software Engineer & Tech Lead';

@Component({
  selector: 'app-hero',
  imports: [Section, Container, Heading, Button],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  private readonly profileRepository = inject(ProfileRepository);

  private readonly profile = toSignal(this.profileRepository.getProfile(), { initialValue: null });

  protected readonly title = HERO_TITLE;
  protected readonly name = computed(() => this.profile()?.name ?? '');
  protected readonly summary = computed(() => {
    const summary = this.profile()?.summary;
    return summary?.['pt-BR'] ?? summary?.en ?? '';
  });
}
