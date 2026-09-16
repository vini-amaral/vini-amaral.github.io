import { Component } from '@angular/core';

import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';

@Component({
  selector: 'app-contact-cta',
  imports: [Section, Container, Heading],
  templateUrl: './contact-cta.html',
  styleUrl: './contact-cta.css',
})
export class ContactCta {}
