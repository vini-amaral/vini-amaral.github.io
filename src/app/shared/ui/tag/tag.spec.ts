import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tag } from './tag';

@Component({
  imports: [Tag],
  template: '<app-tag [variant]="variant">Angular</app-tag>',
})
class HostComponent {
  variant: 'neutral' | 'accent' = 'neutral';
}

describe('Tag', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should render its content with the neutral style by default', () => {
    fixture.detectChanges();
    const tag = (fixture.nativeElement as HTMLElement).querySelector('.tag');

    expect(tag?.textContent).toContain('Angular');
    expect(tag?.classList).not.toContain('tag--accent');
  });

  it('should apply the accent variant', () => {
    fixture.componentInstance.variant = 'accent';
    fixture.detectChanges();

    const tag = (fixture.nativeElement as HTMLElement).querySelector('.tag');
    expect(tag?.classList).toContain('tag--accent');
  });
});
