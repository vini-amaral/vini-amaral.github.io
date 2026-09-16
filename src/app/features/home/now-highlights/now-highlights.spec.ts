import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowHighlights } from './now-highlights';

describe('NowHighlights', () => {
  let component: NowHighlights;
  let fixture: ComponentFixture<NowHighlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NowHighlights],
    }).compileComponents();

    fixture = TestBed.createComponent(NowHighlights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
