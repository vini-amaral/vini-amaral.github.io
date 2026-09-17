import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AboutRepository } from '../../core/repositories/about-repository';
import { Container } from '../../shared/ui/container/container';
import { Heading } from '../../shared/ui/heading/heading';
import { Section } from '../../shared/ui/section/section';
import { Tag } from '../../shared/ui/tag/tag';

// Human-readable labels for the capability/competency ids in about.json,
// derived from the approved theme wording in specs/04-content-spec.md §3.
const SKILL_LABELS: Record<string, string> = {
  'project-management': 'Gestão de projetos',
  'technology-development': 'Desenvolvimento de tecnologia',
  'process-management': 'Gestão de processos',
  'business-intelligence': 'Business Intelligence',
  'problem-solving': 'Resolução de problemas',
  'requirements-management': 'Gestão de requisitos',
  communication: 'Comunicação',
  'resilience-adaptability': 'Resiliência e adaptabilidade',
  'planning-organization': 'Planejamento e organização',
  storytelling: 'Storytelling',
};

@Component({
  selector: 'app-about',
  imports: [Section, Container, Heading, Tag],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private readonly aboutRepository = inject(AboutRepository);

  private readonly about = toSignal(this.aboutRepository.getAbout(), { initialValue: null });

  protected readonly intro = computed(() => this.about()?.intro['pt-BR'] ?? '');
  protected readonly sections = computed(() => this.about()?.sections ?? []);
  protected readonly caseStudy = computed(() => {
    const caseStudy = this.about()?.caseStudy;
    return caseStudy?.enabled ? caseStudy : null;
  });

  protected labelFor(id: string): string {
    return SKILL_LABELS[id] ?? id;
  }
}
