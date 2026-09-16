import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Button } from './button';

@Component({
  imports: [Button],
  template: `
    <app-button [variant]="variant" [routerLink]="routerLink" [href]="href" [target]="target"
      >Ação</app-button
    >
  `,
})
class HostComponent {
  variant: 'primary' | 'secondary' = 'primary';
  routerLink?: string;
  href?: string;
  target: '_self' | '_blank' = '_self';
}

describe('Button', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should render a native button by default with its projected content', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button.button');
    expect(button).toBeTruthy();
    expect(button?.textContent?.trim()).toBe('Ação');
    expect(compiled.querySelector('a')).toBeFalsy();
  });

  it('should render an internal link with its projected content when routerLink is set', () => {
    fixture.componentInstance.routerLink = '/contact';
    fixture.detectChanges();

    const anchor = (fixture.nativeElement as HTMLElement).querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor?.getAttribute('href')).toBe('/contact');
    expect(anchor?.textContent?.trim()).toBe('Ação');
  });

  it('should render a safe external link when href and target=_blank are set', () => {
    fixture.componentInstance.href = 'https://github.com/vini-amaral';
    fixture.componentInstance.target = '_blank';
    fixture.detectChanges();

    const anchor = (fixture.nativeElement as HTMLElement).querySelector('a');
    expect(anchor?.getAttribute('href')).toBe('https://github.com/vini-amaral');
    expect(anchor?.getAttribute('target')).toBe('_blank');
    expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should apply the secondary variant class', () => {
    fixture.componentInstance.variant = 'secondary';
    fixture.detectChanges();

    const button = (fixture.nativeElement as HTMLElement).querySelector('button');
    expect(button?.classList).toContain('button--secondary');
  });
});
