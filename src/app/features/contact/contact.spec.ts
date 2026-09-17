import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import {
  JsonSocialLinkRepository,
  SocialLinkRepository,
} from '../../core/repositories/social-link-repository';
import { Contact } from './contact';

function flushSocialLinks(httpMock: HttpTestingController): void {
  httpMock.expectOne('assets/data/social-links.json').flush({
    version: 1,
    items: [
      {
        id: 'linkedin',
        type: 'linkedin',
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/vinicius-alves-do-amaral',
        public: true,
        source: 'linkedin',
        reviewStatus: 'approved',
      },
      {
        id: 'email',
        type: 'email',
        label: 'E-mail',
        url: 'mailto:vialama@gmail.com',
        public: true,
        source: 'linkedin',
        reviewStatus: 'approved',
      },
      {
        id: 'github',
        type: 'github',
        label: 'GitHub',
        url: null,
        public: false,
        source: 'user',
        reviewStatus: 'draft',
      },
    ],
  });
}

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SocialLinkRepository, useClass: JsonSocialLinkRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Contact);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should render only the public links that have a URL, never inventing GitHub', () => {
    fixture.detectChanges();
    flushSocialLinks(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.contact-item');
    expect(items.length).toBe(2);
    expect(compiled.textContent).toContain('LinkedIn');
    expect(compiled.textContent).toContain('E-mail');
    expect(compiled.textContent).not.toContain('GitHub');
  });

  it('should show the readable value (without mailto:/https://) as the visible link text', () => {
    fixture.detectChanges();
    flushSocialLinks(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('vialama@gmail.com');
    expect(compiled.textContent).toContain('linkedin.com/in/vinicius-alves-do-amaral');
    expect(compiled.textContent).not.toContain('mailto:');
    expect(compiled.textContent).not.toContain('https://');
  });

  it('should link to the real underlying URL regardless of the display text', () => {
    fixture.detectChanges();
    flushSocialLinks(httpMock);
    fixture.detectChanges();

    const links = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('a.button'));
    const hrefs = links.map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('mailto:vialama@gmail.com');
    expect(hrefs).toContain('https://www.linkedin.com/in/vinicius-alves-do-amaral');
  });

  it('should open the external LinkedIn link in a new tab safely, but keep email in the same tab', () => {
    fixture.detectChanges();
    flushSocialLinks(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const linkedinAnchor = Array.from(compiled.querySelectorAll('a.button')).find((a) =>
      a.getAttribute('href')?.includes('linkedin'),
    );
    const emailAnchor = Array.from(compiled.querySelectorAll('a.button')).find((a) =>
      a.getAttribute('href')?.startsWith('mailto:'),
    );

    expect(linkedinAnchor?.getAttribute('target')).toBe('_blank');
    expect(linkedinAnchor?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(emailAnchor?.getAttribute('target')).toBe('_self');
  });
});
