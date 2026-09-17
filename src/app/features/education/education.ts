import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Certification } from '../../core/models/certification';
import { EducationEntry } from '../../core/models/education-entry';
import { CertificationRepository } from '../../core/repositories/certification-repository';
import { EducationRepository } from '../../core/repositories/education-repository';
import { Container } from '../../shared/ui/container/container';
import { Heading } from '../../shared/ui/heading/heading';
import { Section } from '../../shared/ui/section/section';
import { Tag } from '../../shared/ui/tag/tag';

const MONTHS_PT = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

function formatMonthYear(isoDate: string): string {
  const [year, month] = isoDate.split('-');
  return `${MONTHS_PT[Number(month) - 1]} ${year}`;
}

@Component({
  selector: 'app-education',
  imports: [Section, Container, Heading, Tag],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {
  private readonly educationRepository = inject(EducationRepository);
  private readonly certificationRepository = inject(CertificationRepository);

  private readonly educationEntries = toSignal(this.educationRepository.getEducation(), {
    initialValue: [] as EducationEntry[],
  });

  private readonly certificationEntries = toSignal(
    this.certificationRepository.getCertifications(),
    { initialValue: [] as Certification[] },
  );

  protected readonly education = computed(() =>
    [...this.educationEntries()].sort((a, b) => b.startDate.localeCompare(a.startDate)),
  );

  protected readonly certifications = computed(() =>
    [...this.certificationEntries()].sort((a, b) => b.issueDate.localeCompare(a.issueDate)),
  );

  protected dateRange(entry: EducationEntry): string {
    return `${formatMonthYear(entry.startDate)} – ${formatMonthYear(entry.endDate)}`;
  }

  protected description(entry: EducationEntry): string {
    return entry.description['pt-BR'] ?? entry.description.en ?? '';
  }

  protected certificationDate(cert: Certification): string {
    const issued = `Emitida em ${formatMonthYear(cert.issueDate)}`;
    if (!cert.expirationDate) {
      return issued;
    }
    return cert.status === 'expired'
      ? `${issued} · Expirou em ${formatMonthYear(cert.expirationDate)}`
      : `${issued} · Válida até ${formatMonthYear(cert.expirationDate)}`;
  }
}
