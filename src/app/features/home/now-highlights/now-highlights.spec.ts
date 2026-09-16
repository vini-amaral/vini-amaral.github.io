import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowHighlights } from './now-highlights';

function flushHighlights(httpMock: HttpTestingController, titlePtBr: string): void {
  httpMock.expectOne('assets/data/home-highlights.json').flush({
    version: 1,
    data: {
      updatedAt: '2026-01-01',
      items: [
        {
          id: 'current-role',
          type: 'professional',
          label: { 'pt-BR': 'Atualmente', en: 'Currently' },
          title: { 'pt-BR': titlePtBr, en: 'Test title' },
          description: { 'pt-BR': 'Descrição de teste.', en: 'Test description.' },
        },
      ],
    },
  });
}

describe('NowHighlights', () => {
  let fixture: ComponentFixture<NowHighlights>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NowHighlights],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(NowHighlights);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();
    flushHighlights(httpMock, 'Título de teste');

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render each highlight from the JSON resource', () => {
    fixture.detectChanges();
    flushHighlights(httpMock, 'Título de teste');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Atualmente');
    expect(compiled.textContent).toContain('Título de teste');
    expect(compiled.textContent).toContain('Descrição de teste.');
  });

  it('should reflect a changed JSON value without any component change', () => {
    fixture.detectChanges();
    flushHighlights(httpMock, 'Valor alterado no JSON');
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Valor alterado no JSON');
  });
});
