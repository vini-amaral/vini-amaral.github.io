import { LocalizedText } from './localized-text';

export interface Profile {
  id: string;
  name: string;
  headline: string;
  location: string;
  summary: LocalizedText;
  source: string;
  reviewStatus: string;
}
