import { Component } from '@angular/core';

import { AboutTeaser } from './about-teaser/about-teaser';
import { CareerSnapshot } from './career-snapshot/career-snapshot';
import { ContactCta } from './contact-cta/contact-cta';
import { CoreCapabilities } from './core-capabilities/core-capabilities';
import { Hero } from './hero/hero';
import { NowHighlights } from './now-highlights/now-highlights';
import { SelectedProjects } from './selected-projects/selected-projects';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    NowHighlights,
    SelectedProjects,
    CoreCapabilities,
    CareerSnapshot,
    AboutTeaser,
    ContactCta,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
