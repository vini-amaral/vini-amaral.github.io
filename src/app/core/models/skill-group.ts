import { LocalizedText } from './localized-text';

export interface SkillGroup {
  id: string;
  name: LocalizedText;
  items: string[];
}
