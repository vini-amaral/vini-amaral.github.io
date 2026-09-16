import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the theme when the button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector<HTMLButtonElement>('.theme-toggle')!;
    const initialPressed = button.getAttribute('aria-pressed');

    button.click();
    fixture.detectChanges();

    const toggledMode = initialPressed === 'true' ? 'light' : 'dark';
    expect(button.getAttribute('aria-pressed')).toBe(String(toggledMode === 'dark'));
    expect(button.textContent).toContain(toggledMode === 'dark' ? 'Escuro' : 'Claro');
    expect(document.documentElement.getAttribute('data-theme')).toBe(toggledMode);
    expect(localStorage.getItem('portfolio-theme')).toBe(toggledMode);
  });
});
