import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';

import { AboutRepository, JsonAboutRepository } from './core/repositories/about-repository';
import {
  CertificationRepository,
  JsonCertificationRepository,
} from './core/repositories/certification-repository';
import {
  EducationRepository,
  JsonEducationRepository,
} from './core/repositories/education-repository';
import {
  ExperienceRepository,
  JsonExperienceRepository,
} from './core/repositories/experience-repository';
import {
  HomeHighlightsRepository,
  JsonHomeHighlightsRepository,
} from './core/repositories/home-highlights-repository';
import {
  JsonLanguageRepository,
  LanguageRepository,
} from './core/repositories/language-repository';
import { JsonProfileRepository, ProfileRepository } from './core/repositories/profile-repository';
import { JsonProjectRepository, ProjectRepository } from './core/repositories/project-repository';
import { JsonSkillRepository, SkillRepository } from './core/repositories/skill-repository';
import {
  JsonSocialLinkRepository,
  SocialLinkRepository,
} from './core/repositories/social-link-repository';
import { SeoTitleStrategy } from './core/services/seo-title-strategy';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    { provide: TitleStrategy, useClass: SeoTitleStrategy },
    { provide: ProfileRepository, useClass: JsonProfileRepository },
    { provide: HomeHighlightsRepository, useClass: JsonHomeHighlightsRepository },
    { provide: AboutRepository, useClass: JsonAboutRepository },
    { provide: ExperienceRepository, useClass: JsonExperienceRepository },
    { provide: ProjectRepository, useClass: JsonProjectRepository },
    { provide: SkillRepository, useClass: JsonSkillRepository },
    { provide: EducationRepository, useClass: JsonEducationRepository },
    { provide: CertificationRepository, useClass: JsonCertificationRepository },
    { provide: LanguageRepository, useClass: JsonLanguageRepository },
    { provide: SocialLinkRepository, useClass: JsonSocialLinkRepository },
  ],
};
