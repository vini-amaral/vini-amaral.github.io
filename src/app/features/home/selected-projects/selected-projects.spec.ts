import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedProjects } from './selected-projects';

describe('SelectedProjects', () => {
  let component: SelectedProjects;
  let fixture: ComponentFixture<SelectedProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedProjects],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
