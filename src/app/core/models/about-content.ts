import { LocalizedText } from './localized-text';

export interface AboutSection {
  id: string;
  title: LocalizedText;
  body?: LocalizedText[];
  capabilities?: string[];
  competencies?: string[];
}

export interface AboutCaseStudy {
  enabled: boolean;
  title: LocalizedText;
  situation: LocalizedText;
  challenge: LocalizedText;
  action: LocalizedText;
  result: LocalizedText;
  learning: LocalizedText;
}

export interface AboutContent {
  intro: LocalizedText;
  sections: AboutSection[];
  caseStudy?: AboutCaseStudy;
  source: string;
  reviewStatus: string;
}
