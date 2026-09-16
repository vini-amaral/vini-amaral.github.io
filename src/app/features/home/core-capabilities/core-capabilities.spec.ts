import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreCapabilities } from './core-capabilities';

describe('CoreCapabilities', () => {
  let component: CoreCapabilities;
  let fixture: ComponentFixture<CoreCapabilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreCapabilities],
    }).compileComponents();

    fixture = TestBed.createComponent(CoreCapabilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
