import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Project } from '../../core/models/project';
import { ProjectRepository } from '../../core/repositories/project-repository';
import { ProjectSummary } from '../../shared/components/project-summary/project-summary';
import { Container } from '../../shared/ui/container/container';
import { Heading } from '../../shared/ui/heading/heading';
import { Section } from '../../shared/ui/section/section';

@Component({
  selector: 'app-projects',
  imports: [Section, Container, Heading, ProjectSummary],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private readonly projectRepository = inject(ProjectRepository);

  protected readonly projects = toSignal(this.projectRepository.getProjects(), {
    initialValue: [] as Project[],
  });
}
