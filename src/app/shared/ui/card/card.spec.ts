import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';

@Component({
  imports: [Card],
  template: '<app-card [accented]="accented"><p>conteúdo</p></app-card>',
})
class HostComponent {
  accented = false;
}

describe('Card', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should render its content as an article', () => {
    fixture.detectChanges();
    const article = (fixture.nativeElement as HTMLElement).querySelector('article.card');

    expect(article).toBeTruthy();
    expect(article?.textContent).toContain('conteúdo');
    expect(article?.classList).not.toContain('card--accented');
  });

  it('should apply the accented modifier when requested', () => {
    fixture.componentInstance.accented = true;
    fixture.detectChanges();

    const article = (fixture.nativeElement as HTMLElement).querySelector('article.card');
    expect(article?.classList).toContain('card--accented');
  });
});
