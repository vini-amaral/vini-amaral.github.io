import { Component } from '@angular/core';

import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

@Component({
  selector: 'app-selected-projects',
  imports: [Section, Container, Heading],
  templateUrl: './selected-projects.html',
  styleUrl: './selected-projects.css',
})
export class SelectedProjects {}
