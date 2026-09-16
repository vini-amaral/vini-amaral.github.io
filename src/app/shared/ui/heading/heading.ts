import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingVisual = 'display' | 'h1' | 'h2' | 'h3' | 'h4';

const VISUAL_CLASSES: Record<HeadingVisual, string> = {
  display: 'text-4xl md:text-6xl',
  h1: 'text-3xl md:text-5xl',
  h2: 'text-2xl md:text-4xl',
  h3: 'text-xl md:text-2xl',
  h4: 'text-lg md:text-xl',
};

@Component({
  selector: 'app-heading',
  imports: [NgTemplateOutlet],
  templateUrl: './heading.html',
  styleUrl: './heading.css',
})
export class Heading {
  readonly level = input<HeadingLevel>(2);
  readonly visual = input<HeadingVisual>('h2');

  protected readonly visualClass = computed(() => VISUAL_CLASSES[this.visual()]);
}
