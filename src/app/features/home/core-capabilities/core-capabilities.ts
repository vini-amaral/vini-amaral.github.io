import { Component } from '@angular/core';

import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

@Component({
  selector: 'app-core-capabilities',
  imports: [Section, Container, Heading],
  templateUrl: './core-capabilities.html',
  styleUrl: './core-capabilities.css',
})
export class CoreCapabilities {}
