import { Component, input } from '@angular/core';

import { Project } from '../../../core/models/project';
import { Button } from '../../ui/button/button';
import { Card } from '../../ui/card/card';
import { Heading } from '../../ui/heading/heading';
import { Tag } from '../../ui/tag/tag';

@Component({
  selector: 'app-project-summary',
  imports: [Card, Tag, Heading, Button],
  templateUrl: './project-summary.html',
  styleUrl: './project-summary.css',
})
export class ProjectSummary {
  readonly project = input.required<Project>();
}
