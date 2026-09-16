import { TestBed } from '@angular/core/testing';

import { Theme } from './theme';

describe('Theme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
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
});
