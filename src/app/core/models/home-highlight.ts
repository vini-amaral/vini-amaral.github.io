import { LocalizedText } from './localized-text';

export interface HomeHighlightItem {
  id: string;
  type: string;
  label: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  source: string;
  reviewStatus: string;
}
