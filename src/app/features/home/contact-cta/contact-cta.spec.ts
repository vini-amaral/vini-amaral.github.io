import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContactCta } from './contact-cta';

describe('ContactCta', () => {
  let fixture: ComponentFixture<ContactCta>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCta],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ContactCta);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/social-links.json').flush({ version: 1, items: [] });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render one button per public social link with the correct href and label', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/social-links.json').flush({
      version: 1,
      items: [
        {
          id: 'linkedin',
          type: 'linkedin',
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/vinicius-alves-do-amaral',
          public: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'E-mail',
          url: 'mailto:vialama@gmail.com',
          public: true,
        },
        { id: 'github', type: 'github', label: 'GitHub', url: null, public: false },
      ],
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll('a.button'));
    expect(links.length).toBe(2);
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      'https://www.linkedin.com/in/vinicius-alves-do-amaral',
      'mailto:vialama@gmail.com',
    ]);
    expect(compiled.textContent).toContain('LinkedIn');
    expect(compiled.textContent).toContain('E-mail');
    expect(compiled.textContent).not.toContain('GitHub');
  });

  it('should open external links in a new tab but keep email in the same tab', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/data/social-links.json').flush({
      version: 1,
      items: [
        { id: 'linkedin', type: 'linkedin', label: 'LinkedIn', url: 'https://x.com', public: true },
        { id: 'email', type: 'email', label: 'E-mail', url: 'mailto:x@x.com', public: true },
      ],
    });
    fixture.detectChanges();

    const links = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('a.button'));
    expect(links[0].getAttribute('target')).toBe('_blank');
    expect(links[0].getAttribute('rel')).toBe('noopener noreferrer');
    expect(links[1].getAttribute('target')).toBe('_self');
  });
});
