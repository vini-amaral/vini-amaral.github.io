import { Component } from '@angular/core';

import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

@Component({
  selector: 'app-about-teaser',
  imports: [Section, Container, Heading],
  templateUrl: './about-teaser.html',
  styleUrl: './about-teaser.css',
})
export class AboutTeaser {}
