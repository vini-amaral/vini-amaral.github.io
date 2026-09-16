import { Component, input } from '@angular/core';

export type TagVariant = 'neutral' | 'accent';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.html',
  styleUrl: './tag.css',
})
export class Tag {
  readonly variant = input<TagVariant>('neutral');
}
