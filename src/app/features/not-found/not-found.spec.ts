import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NotFound } from './not-found';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a professional not-found message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Página não encontrada');
    expect(compiled.textContent).toContain('O endereço acessado não existe ou foi movido.');
  });

  it('should hide the decorative 404 numeral from assistive technology', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const code = compiled.querySelector('.not-found-code');
    expect(code?.textContent?.trim()).toBe('404');
    expect(code?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should always provide a way back to the home page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a.button');
    expect(link?.getAttribute('href')).toBe('/');
    expect(link?.textContent).toContain('Voltar para o início');
  });
});
