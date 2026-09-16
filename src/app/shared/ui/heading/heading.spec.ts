import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heading, HeadingLevel, HeadingVisual } from './heading';

@Component({
  imports: [Heading],
  template: '<app-heading [level]="level" [visual]="visual">Título de exemplo</app-heading>',
})
class HostComponent {
  level: HeadingLevel = 2;
  visual: HeadingVisual = 'h2';
}

describe('Heading', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should render the semantic level requested', () => {
    fixture.componentInstance.level = 1;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')).toBeTruthy();
    expect(compiled.querySelector('h1')?.textContent).toContain('Título de exemplo');
  });

  it('should apply the requested visual size independently of the level', () => {
    fixture.componentInstance.level = 2;
    fixture.componentInstance.visual = 'display';
    fixture.detectChanges();

    const heading = (fixture.nativeElement as HTMLElement).querySelector('h2');
    expect(heading?.className).toContain('text-4xl');
  });
});
