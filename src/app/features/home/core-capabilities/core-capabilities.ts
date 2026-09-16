import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SkillGroup, SkillsContent } from '../../../core/services/skills';
import { Card } from '../../../shared/ui/card/card';
import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';
import { Tag } from '../../../shared/ui/tag/tag';

@Component({
  selector: 'app-core-capabilities',
  imports: [Section, Container, Heading, Card, Tag],
  templateUrl: './core-capabilities.html',
  styleUrl: './core-capabilities.css',
})
export class CoreCapabilities {
  private readonly skillsContent = inject(SkillsContent);

  protected readonly groups = toSignal(this.skillsContent.getSkills(), {
    initialValue: [] as SkillGroup[],
  });
}
