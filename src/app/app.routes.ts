import { Routes } from '@angular/router';

import { HERO_TITLE } from './features/home/hero/hero';

export const routes: Routes = [
  {
    path: '',
    title: HERO_TITLE,
    data: {
      description:
        'Portfólio de Vinicius Alves do Amaral, Software Engineer & Tech Lead. Conheça projetos selecionados, capacidades técnicas e trajetória de carreira.',
    },
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'projects',
    title: 'Projetos',
    data: {
      description: `Projetos de software desenvolvidos por Vinicius Alves do Amaral, ${HERO_TITLE}.`,
    },
    loadComponent: () => import('./features/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'projects/:slug',
    title: 'Projeto',
    data: {
      description: `Detalhes de um projeto de Vinicius Alves do Amaral, ${HERO_TITLE}.`,
    },
    loadComponent: () =>
      import('./features/projects/project-detail/project-detail').then((m) => m.ProjectDetail),
  },
  {
    path: 'experience',
    title: 'Experiência',
    data: {
      description:
        'Trajetória profissional de Vinicius Alves do Amaral, incluindo empresas, cargos e períodos de atuação.',
    },
    loadComponent: () => import('./features/experience/experience').then((m) => m.Experience),
  },
  {
    path: 'skills',
    title: 'Habilidades',
    data: {
      description:
        'Habilidades técnicas e de liderança de Vinicius Alves do Amaral, organizadas por área de atuação.',
    },
    loadComponent: () => import('./features/skills/skills').then((m) => m.Skills),
  },
  {
    path: 'education',
    title: 'Educação e certificações',
    data: {
      description: 'Formação acadêmica e certificações profissionais de Vinicius Alves do Amaral.',
    },
    loadComponent: () => import('./features/education/education').then((m) => m.Education),
  },
  {
    path: 'about',
    title: 'Sobre',
    data: {
      description:
        'Trajetória pessoal e profissional de Vinicius Alves do Amaral: como ele conecta tecnologia, negócio e liderança.',
    },
    loadComponent: () => import('./features/about/about').then((m) => m.About),
  },
  {
    path: 'contact',
    title: 'Contato',
    data: {
      description: 'Entre em contato com Vinicius Alves do Amaral pelo LinkedIn ou e-mail.',
    },
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
  },
  {
    path: '**',
    title: 'Página não encontrada',
    data: {
      description: 'Página não encontrada no portfólio de Vinicius Alves do Amaral.',
    },
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
