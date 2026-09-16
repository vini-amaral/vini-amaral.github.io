import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section } from './section';

@Component({
  imports: [Section],
  template: '<app-section [surface]="surface"><p>conteúdo</p></app-section>',
})
class HostComponent {
  surface: 'default' | 'raised' = 'default';
}

describe('Section', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should render a semantic section projecting its content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section.section');

    expect(section).toBeTruthy();
    expect(section?.textContent).toContain('conteúdo');
    expect(section?.classList).not.toContain('section--raised');
  });

  it('should apply the raised surface modifier', () => {
    fixture.componentInstance.surface = 'raised';
    fixture.detectChanges();

    const section = (fixture.nativeElement as HTMLElement).querySelector('section.section');
    expect(section?.classList).toContain('section--raised');
  });
});
