import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

function readStoredTheme(): ThemeMode | null {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === 'light' || value === 'dark' ? value : null;
}

function readSystemTheme(): ThemeMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly stored = signal<ThemeMode | null>(readStoredTheme());
  readonly mode = signal<ThemeMode>(this.stored() ?? readSystemTheme());
  readonly isExplicit = signal<boolean>(this.stored() !== null);

  constructor() {
    if (this.stored()) {
      this.applyToDocument(this.mode());
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (!this.isExplicit()) {
        this.mode.set(event.matches ? 'dark' : 'light');
      }
    });
  }

  toggle(): void {
    this.set(this.mode() === 'dark' ? 'light' : 'dark');
  }

  set(mode: ThemeMode): void {
    this.mode.set(mode);
    this.isExplicit.set(true);
    localStorage.setItem(STORAGE_KEY, mode);
    this.applyToDocument(mode);
  }

  private applyToDocument(mode: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', mode);
  }
}
