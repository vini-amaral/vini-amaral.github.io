import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTeaser } from './about-teaser';

describe('AboutTeaser', () => {
  let component: AboutTeaser;
  let fixture: ComponentFixture<AboutTeaser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTeaser],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutTeaser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
