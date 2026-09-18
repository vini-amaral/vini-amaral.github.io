import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterOutlet } from '@angular/router';

import { appConfig } from './app.config';

@Component({
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
class RootHost {}

// specs/02-architecture.md §8: the required route table. This exercises the
// real `routes` config (via the real `appConfig`, with only the HTTP backend
// swapped for a testing double) end to end, rather than a hand-built stand-in
// route list, so a route/component wiring mistake actually fails a test.
const ROUTE_CASES: Array<[path: string, selector: string]> = [
  ['/', 'app-home'],
  ['/projects', 'app-projects'],
  ['/projects/example-1', 'app-project-detail'],
  ['/experience', 'app-experience'],
  ['/skills', 'app-skills'],
  ['/education', 'app-education'],
  ['/about', 'app-about'],
  ['/contact', 'app-contact'],
  ['/this-route-does-not-exist', 'app-not-found'],
];

describe('routes', () => {
  let router: Router;
  let fixture: ComponentFixture<RootHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootHost],
      providers: [...appConfig.providers, provideHttpClientTesting()],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(RootHost);
    fixture.detectChanges();
  });

  for (const [path, selector] of ROUTE_CASES) {
    it(`should render <${selector}> for ${path}`, async () => {
      await router.navigateByUrl(path);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector(selector)).toBeTruthy();
    });
  }

  it('should not match the wildcard route for a known path', async () => {
    await router.navigateByUrl('/about');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-not-found')).toBeFalsy();
  });
});
