import { Component } from '@angular/core';

import { Button } from '../../shared/ui/button/button';
import { Container } from '../../shared/ui/container/container';
import { Heading } from '../../shared/ui/heading/heading';
import { Section } from '../../shared/ui/section/section';

@Component({
  selector: 'app-not-found',
  imports: [Section, Container, Heading, Button],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
