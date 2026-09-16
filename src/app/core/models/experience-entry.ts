import { LocalizedText } from './localized-text';

export interface Role {
  id: string;
  title: string;
  specialty: string;
  startDate: string;
  endDate: string | null;
  dateLabel: string;
  description: LocalizedText;
  technologies: string[];
  source: string;
  reviewStatus: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  employmentType: string;
  roles: Role[];
  source: string;
  reviewStatus: string;
  sourceNote?: string;
}
