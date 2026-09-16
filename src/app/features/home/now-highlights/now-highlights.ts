import { Component } from '@angular/core';

import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

@Component({
  selector: 'app-now-highlights',
  imports: [Section, Container, Heading],
  templateUrl: './now-highlights.html',
  styleUrl: './now-highlights.css',
})
export class NowHighlights {}
