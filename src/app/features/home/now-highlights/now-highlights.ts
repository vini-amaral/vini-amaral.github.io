import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { HomeHighlightItem } from '../../../core/models/home-highlight';
import { HomeHighlightsRepository } from '../../../core/repositories/home-highlights-repository';
import { Card } from '../../../shared/ui/card/card';
import { Container } from '../../../shared/ui/container/container';
import { Heading } from '../../../shared/ui/heading/heading';
import { Section } from '../../../shared/ui/section/section';
import { Tag } from '../../../shared/ui/tag/tag';

@Component({
  selector: 'app-now-highlights',
  imports: [Section, Container, Heading, Card, Tag],
  templateUrl: './now-highlights.html',
  styleUrl: './now-highlights.css',
})
export class NowHighlights {
  private readonly homeHighlightsRepository = inject(HomeHighlightsRepository);

  protected readonly items = toSignal(this.homeHighlightsRepository.getHomeHighlights(), {
    initialValue: [] as HomeHighlightItem[],
  });
}
