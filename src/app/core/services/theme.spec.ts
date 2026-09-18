import { TestBed } from '@angular/core/testing';

import { Theme } from './theme';

type Listener = (event: MediaQueryListEvent) => void;

describe('Theme', () => {
  let originalMatchMedia: typeof window.matchMedia;

  // jsdom's matchMedia stub (src/test-setup.ts) always reports `matches:
  // false` and never invokes registered listeners. Tests that need to
  // control the reported OS preference or trigger a live change install
  // their own stub via this helper; `afterEach` below always restores it.
  function stubMatchMedia(initialMatches: boolean): { fire: (matches: boolean) => void } {
    let listener: Listener | null = null;

    window.matchMedia = ((query: string) =>
      ({
        matches: initialMatches,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: (_type: string, cb: Listener) => {
          listener = cb;
        },
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList) as typeof window.matchMedia;

    return {
      fire: (matches: boolean) => listener?.({ matches } as MediaQueryListEvent),
    };
  }

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    originalMatchMedia = window.matchMedia;
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('should be created', () => {
    const service = TestBed.inject(Theme);
    expect(service).toBeTruthy();
  });

  it('should default to the system preference when nothing is stored', () => {
    const service = TestBed.inject(Theme);
    expect(service.mode()).toBe('light');
    expect(service.isExplicit()).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });

  it('should apply and persist an explicit choice', () => {
    const service = TestBed.inject(Theme);
    service.set('dark');

    expect(service.mode()).toBe('dark');
    expect(service.isExplicit()).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
  });

  it('should toggle between light and dark', () => {
    const service = TestBed.inject(Theme);
    service.set('light');

    service.toggle();
    expect(service.mode()).toBe('dark');

    service.toggle();
    expect(service.mode()).toBe('light');
  });

  it('should restore a previously stored preference on initialization', () => {
    localStorage.setItem('portfolio-theme', 'dark');

    const service = TestBed.inject(Theme);

    expect(service.mode()).toBe('dark');
    expect(service.isExplicit()).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should default to dark when the OS prefers dark and nothing is stored', () => {
    stubMatchMedia(true);

    const service = TestBed.inject(Theme);

    expect(service.mode()).toBe('dark');
    expect(service.isExplicit()).toBe(false);
  });

  it('should follow a live OS preference change while no explicit choice was made', () => {
    const mediaQuery = stubMatchMedia(false);

    const service = TestBed.inject(Theme);
    expect(service.mode()).toBe('light');

    mediaQuery.fire(true);

    expect(service.mode()).toBe('dark');
    expect(service.isExplicit()).toBe(false);
  });

  it('should ignore OS preference changes once the user made an explicit choice', () => {
    const mediaQuery = stubMatchMedia(false);

    const service = TestBed.inject(Theme);
    service.set('light');

    mediaQuery.fire(true);

    expect(service.mode()).toBe('light');
  });
});
