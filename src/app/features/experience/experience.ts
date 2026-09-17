import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ExperienceEntry, Role } from '../../core/models/experience-entry';
import { ExperienceRepository } from '../../core/repositories/experience-repository';
import { Container } from '../../shared/ui/container/container';
import { Heading } from '../../shared/ui/heading/heading';
import { Section } from '../../shared/ui/section/section';
import { Tag } from '../../shared/ui/tag/tag';

const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  'full-time': 'Tempo integral',
  'part-time': 'Meio período',
  contract: 'Contrato',
  freelance: 'Freelance',
};

interface RoleView extends Role {
  current: boolean;
}

interface CompanyView extends Omit<ExperienceEntry, 'roles'> {
  roles: RoleView[];
}

@Component({
  selector: 'app-experience',
  imports: [Section, Container, Heading, Tag],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  private readonly experienceRepository = inject(ExperienceRepository);

  private readonly entries = toSignal(this.experienceRepository.getExperience(), {
    initialValue: [] as ExperienceEntry[],
  });

  protected readonly companies = computed<CompanyView[]>(() =>
    this.entries().map((entry) => {
      const roles = [...entry.roles].sort((a, b) => b.startDate.localeCompare(a.startDate));
      return {
        ...entry,
        roles: roles.map((role, index) => ({
          ...role,
          current: index === 0 && role.endDate === null,
        })),
      };
    }),
  );

  protected employmentTypeLabel(type: string): string {
    return EMPLOYMENT_TYPE_LABELS[type] ?? type;
  }

  protected description(role: Role): string {
    return role.description['pt-BR'] ?? role.description.en ?? '';
  }
}
