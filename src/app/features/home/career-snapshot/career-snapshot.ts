import { Component } from '@angular/core';

import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

@Component({
  selector: 'app-career-snapshot',
  imports: [Section, Container, Heading],
  templateUrl: './career-snapshot.html',
  styleUrl: './career-snapshot.css',
})
export class CareerSnapshot {}
