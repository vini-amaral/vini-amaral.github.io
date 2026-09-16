import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Project, ProjectsContent } from '../../../core/services/projects';
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
  private readonly projectsContent = inject(ProjectsContent);

  private readonly projects = toSignal(this.projectsContent.getProjects(), {
    initialValue: [] as Project[],
  });

  protected readonly selectedProjects = computed(() =>
    this.projects()
      .filter((project) => project.featured)
      .slice(0, MAX_SELECTED_PROJECTS),
  );
}
