import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ExperienceEntry } from '../../../core/models/experience-entry';
import { ExperienceRepository } from '../../../core/repositories/experience-repository';
import { Button } from '../../../shared/ui/button/button';
import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';
import { Tag } from '../../../shared/ui/tag/tag';

@Component({
  selector: 'app-career-snapshot',
  imports: [Section, Container, Heading, Tag, Button],
  templateUrl: './career-snapshot.html',
  styleUrl: './career-snapshot.css',
})
export class CareerSnapshot {
  private readonly experienceRepository = inject(ExperienceRepository);

  private readonly entries = toSignal(this.experienceRepository.getExperience(), {
    initialValue: [] as ExperienceEntry[],
  });

  protected readonly stages = computed(() => {
    const roles = this.entries()
      .flatMap((entry) => entry.roles)
      .slice()
      .sort((a, b) => a.startDate.localeCompare(b.startDate));

    const titles: string[] = [];
    for (const role of roles) {
      if (titles[titles.length - 1] !== role.title) {
        titles.push(role.title);
      }
    }
    return titles;
  });
}
