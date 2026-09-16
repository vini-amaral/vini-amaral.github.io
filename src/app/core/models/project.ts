import { LocalizedText } from './localized-text';

export interface ProjectLinks {
  live: string | null;
  repository: string | null;
}

export interface Project {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  role: LocalizedText;
  technologies: string[];
  links: ProjectLinks;
  image: string | null;
  featured: boolean;
  status: string;
  source: string;
  reviewStatus: string;
}
