import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Project } from '../../../core/models/project';
import { ProjectRepository } from '../../../core/repositories/project-repository';
import { Button } from '../../../shared/ui/button/button';
import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';
import { Tag } from '../../../shared/ui/tag/tag';

@Component({
  selector: 'app-project-detail',
  imports: [Section, Container, Heading, Tag, Button],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  readonly slug = input<string>();

  private readonly projectRepository = inject(ProjectRepository);

  private readonly projects = toSignal(this.projectRepository.getProjects(), {
    initialValue: [] as Project[],
  });

  protected readonly project = computed(
    () => this.projects().find((project) => project.slug === this.slug()) ?? null,
  );
}
