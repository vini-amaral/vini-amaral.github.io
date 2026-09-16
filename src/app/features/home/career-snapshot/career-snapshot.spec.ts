import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerSnapshot } from './career-snapshot';

describe('CareerSnapshot', () => {
  let component: CareerSnapshot;
  let fixture: ComponentFixture<CareerSnapshot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerSnapshot],
    }).compileComponents();

    fixture = TestBed.createComponent(CareerSnapshot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
