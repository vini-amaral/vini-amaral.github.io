import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Project } from '../../../core/models/project';
import { ProjectRepository } from '../../../core/repositories/project-repository';
import { ProjectSummary } from '../../../shared/components/project-summary/project-summary';
import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

const MAX_SELECTED_PROJECTS = 4;

@Component({
  selector: 'app-selected-projects',
  imports: [Section, Container, Heading, ProjectSummary],
  templateUrl: './selected-projects.html',
  styleUrl: './selected-projects.css',
})
export class SelectedProjects {
  private readonly projectRepository = inject(ProjectRepository);

  private readonly projects = toSignal(this.projectRepository.getProjects(), {
    initialValue: [] as Project[],
  });

  protected readonly selectedProjects = computed(() =>
    this.projects()
      .filter((project) => project.featured)
      .slice(0, MAX_SELECTED_PROJECTS),
  );
}
