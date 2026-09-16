import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Hero } from './hero';

@Component({
  imports: [Hero],
  template: `
    <app-hero
      name="Vinicius Alves do Amaral"
      title="Software Engineer & Tech Lead"
      summary="Resumo profissional de exemplo."
    />
  `,
})
class HostComponent {}

describe('Hero', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should render the name as the main heading', () => {
    const heading = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(heading?.textContent).toContain('Vinicius Alves do Amaral');
  });

  it('should render the professional title and summary', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Software Engineer & Tech Lead');
    expect(compiled.textContent).toContain('Resumo profissional de exemplo.');
  });

  it('should render a primary CTA linking to the projects route', () => {
    const link = (fixture.nativeElement as HTMLElement).querySelector('a.button');
    expect(link?.getAttribute('href')).toBe('/projects');
  });

  it('should mark the decorative portrait placeholder as hidden from assistive technology', () => {
    const placeholder = (fixture.nativeElement as HTMLElement).querySelector('.hero-portrait');
    expect(placeholder?.getAttribute('aria-hidden')).toBe('true');
  });
});
