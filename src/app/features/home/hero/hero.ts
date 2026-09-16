import { Component } from '@angular/core';

import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

@Component({
  selector: 'app-hero',
  imports: [Section, Container, Heading],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
