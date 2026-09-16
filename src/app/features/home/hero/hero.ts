import { Component, input } from '@angular/core';

import { Button } from '../../../shared/ui/button/button';
import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

@Component({
  selector: 'app-hero',
  imports: [Section, Container, Heading, Button],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  readonly name = input.required<string>();
  readonly title = input.required<string>();
  readonly summary = input.required<string>();
}
