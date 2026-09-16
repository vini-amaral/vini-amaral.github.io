import { Component, input } from '@angular/core';

export type SectionSurface = 'default' | 'raised';

@Component({
  selector: 'app-section',
  imports: [],
  templateUrl: './section.html',
  styleUrl: './section.css',
})
export class Section {
  readonly surface = input<SectionSurface>('default');
}
