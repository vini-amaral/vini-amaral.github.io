import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { Router, TitleStrategy, provideRouter } from '@angular/router';

import { SeoTitleStrategy } from './seo-title-strategy';

@Component({ template: '' })
class BlankComponent {}

describe('SeoTitleStrategy', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: '',
            component: BlankComponent,
            title: 'Início',
            data: { description: 'Descrição da home.' },
          },
          {
            path: 'sobre',
            component: BlankComponent,
            title: 'Sobre',
            data: { description: 'Descrição da página sobre.' },
          },
          {
            path: 'sem-descricao',
            component: BlankComponent,
            title: 'Sem descrição',
          },
        ]),
        { provide: TitleStrategy, useClass: SeoTitleStrategy },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should set the document title with the site name suffix', async () => {
    await router.navigateByUrl('/');
    expect(TestBed.inject(Title).getTitle()).toBe('Início | Vinicius Alves do Amaral');
  });

  it('should set the meta description from the route data', async () => {
    await router.navigateByUrl('/sobre');
    const description = TestBed.inject(Meta).getTag('name="description"');
    expect(description?.content).toBe('Descrição da página sobre.');
  });

  it('should fall back to a default description when the route declares none', async () => {
    await router.navigateByUrl('/sem-descricao');
    const description = TestBed.inject(Meta).getTag('name="description"');
    expect(description?.content).toContain('Vinicius Alves do Amaral');
  });

  it('should set a canonical link pointing at the site origin plus the current path', async () => {
    await router.navigateByUrl('/sobre');
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://vini-amaral.github.io/sobre');
  });

  it('should mirror the title and description in Open Graph and Twitter tags', async () => {
    await router.navigateByUrl('/sobre');
    const meta = TestBed.inject(Meta);
    expect(meta.getTag('property="og:title"')?.content).toBe('Sobre | Vinicius Alves do Amaral');
    expect(meta.getTag('property="og:description"')?.content).toBe('Descrição da página sobre.');
    expect(meta.getTag('name="twitter:title"')?.content).toBe('Sobre | Vinicius Alves do Amaral');
    expect(meta.getTag('name="twitter:description"')?.content).toBe('Descrição da página sobre.');
  });
});
