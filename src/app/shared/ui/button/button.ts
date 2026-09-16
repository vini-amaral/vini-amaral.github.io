import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonTarget = '_self' | '_blank';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly type = input<'button' | 'submit'>('button');
  readonly routerLink = input<string | string[]>();
  readonly href = input<string>();
  readonly target = input<ButtonTarget>('_self');

  protected readonly rel = computed(() =>
    this.target() === '_blank' ? 'noopener noreferrer' : null,
  );
}
