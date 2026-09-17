import { Component, computed, effect, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';

import { Project } from '../../../core/models/project';
import { ProjectRepository } from '../../../core/repositories/project-repository';
import { Button } from '../../../shared/ui/button/button';
import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';
import { Tag } from '../../../shared/ui/tag/tag';

const SITE_NAME = 'Vinicius Alves do Amaral';

@Component({
  selector: 'app-project-detail',
  imports: [Section, Container, Heading, Tag, Button],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  readonly slug = input<string>();

  private readonly projectRepository = inject(ProjectRepository);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly projects = toSignal(this.projectRepository.getProjects(), {
    initialValue: [] as Project[],
  });

  protected readonly project = computed(
    () => this.projects().find((project) => project.slug === this.slug()) ?? null,
  );

  // specs/05-requirements.md NFR-005: once the real project resolves, refine
  // the generic route-level title/description (see app.routes.ts) with its
  // actual title and summary instead of leaving the placeholder metadata.
  private readonly updateSeoOnProjectLoad = effect(() => {
    const project = this.project();
    if (!project) {
      return;
    }

    const projectTitle = project.title['pt-BR'] ?? project.title.en ?? '';
    const projectSummary = project.summary['pt-BR'] ?? project.summary.en ?? '';
    const fullTitle = `${projectTitle} | ${SITE_NAME}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: projectSummary });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: projectSummary });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: projectSummary });
  });
}
