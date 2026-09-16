import { LocalizedText } from './localized-text';

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: LocalizedText;
  source: string;
  reviewStatus: string;
}
