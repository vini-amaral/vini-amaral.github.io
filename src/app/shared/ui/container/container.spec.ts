import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Container } from './container';

@Component({
  imports: [Container],
  template: '<app-container><p>conteúdo</p></app-container>',
})
class HostComponent {}

describe('Container', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should project content inside the page container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const wrapper = compiled.querySelector('.page-container');

    expect(wrapper).toBeTruthy();
    expect(wrapper?.textContent).toContain('conteúdo');
  });
});
