import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
      'Hero',
      'Agora',
      'Projetos selecionados',
      'Capacidades técnicas',
      'Trajetória de carreira',
      'Sobre',
      'Contato',
    ]);
  });
});
