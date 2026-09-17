import { Component, input } from '@angular/core';

import { Project } from '../../../core/models/project';
import { Button } from '../../ui/button/button';
import { Card } from '../../ui/card/card';
import { Heading, HeadingLevel } from '../../ui/heading/heading';
import { Tag } from '../../ui/tag/tag';

@Component({
  selector: 'app-project-summary',
  imports: [Card, Tag, Heading, Button],
  templateUrl: './project-summary.html',
  styleUrl: './project-summary.css',
})
export class ProjectSummary {
  readonly project = input.required<Project>();

  // Callers must supply the heading level that keeps the document outline
  // sequential in their context (e.g. h2 directly under a page h1 with no
  // intermediate section heading, or h3 nested under a page's own h2).
  readonly titleLevel = input.required<HeadingLevel>();
}
