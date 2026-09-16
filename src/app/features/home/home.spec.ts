import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpMock.expectOne('assets/data/home-highlights.json').flush({
      version: 1,
      data: { updatedAt: '2026-01-01', items: [] },
    });
    httpMock.expectOne('assets/data/projects.json').flush({ version: 1, items: [] });
    httpMock.expectOne('assets/data/skills.json').flush({ version: 1, items: [] });
    httpMock.expectOne('assets/data/experience.json').flush({ version: 1, items: [] });
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the home sections in the order defined by the product specification', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headings = Array.from(compiled.querySelectorAll('h1, h2')).map((el) =>
      el.textContent?.trim(),
    );

    expect(headings).toEqual([
      'Vinicius Alves do Amaral',
      'Agora',
      'Projetos selecionados',
      'Capacidades técnicas',
      'Trajetória de carreira',
      'Sobre',
      'Contato',
    ]);
  });
});
