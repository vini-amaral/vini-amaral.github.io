import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  CertificationRepository,
  JsonCertificationRepository,
} from '../../core/repositories/certification-repository';
import {
  EducationRepository,
  JsonEducationRepository,
} from '../../core/repositories/education-repository';
import { Education } from './education';

function flushEducation(httpMock: HttpTestingController): void {
  httpMock.expectOne('assets/data/education.json').flush({
    version: 1,
    items: [
      {
        id: 'fgv-mba-project-management',
        institution: 'Fundação Getulio Vargas',
        degree: 'MBA em Gestão: Gerenciamento de Projetos',
        startDate: '2026-06-01',
        endDate: '2027-08-31',
        description: { 'pt-BR': 'Descrição do MBA.' },
        source: 'linkedin',
        reviewStatus: 'approved',
      },
      {
        id: 'umc-information-systems',
        institution: 'Universidade de Mogi das Cruzes',
        degree: 'Bacharelado, Sistemas de Informação',
        startDate: '2006-07-01',
        endDate: '2010-06-30',
        description: { en: 'Graduated with a focus on system design.' },
        source: 'linkedin',
        reviewStatus: 'approved',
      },
    ],
  });
}

function flushCertifications(httpMock: HttpTestingController): void {
  httpMock.expectOne('assets/data/certifications.json').flush({
    version: 1,
    items: [
      {
        id: 'azure-developer-associate',
        name: 'Microsoft Certified: Azure Developer Associate',
        issuer: 'Microsoft',
        issueDate: '2021-08-01',
        expirationDate: '2027-08-31',
        credentialId: '2C8849CAD0B7C1B1',
        status: 'active',
        source: 'linkedin',
        reviewStatus: 'approved',
      },
      {
        id: 'mta-javascript',
        name: 'MTA: Introduction to Programming Using JavaScript',
        issuer: 'Microsoft',
        issueDate: '2021-10-01',
        expirationDate: '2022-06-30',
        credentialId: null,
        status: 'expired',
        source: 'linkedin',
        reviewStatus: 'approved',
      },
      {
        id: 'azure-fundamentals',
        name: 'Microsoft Certified: Azure Fundamentals',
        issuer: 'Microsoft',
        issueDate: '2020-02-01',
        expirationDate: null,
        credentialId: '5B15FE1CEED42799',
        status: 'validity-not-specified',
        source: 'linkedin',
        reviewStatus: 'approved',
      },
    ],
  });
}

describe('Education', () => {
  let fixture: ComponentFixture<Education>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Education],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: EducationRepository, useClass: JsonEducationRepository },
        { provide: CertificationRepository, useClass: JsonCertificationRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Education);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should render education entries most recent first, with formatted date ranges', () => {
    fixture.detectChanges();
    flushEducation(httpMock);
    flushCertifications(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const institutions = Array.from(compiled.querySelectorAll('.education-entry h3')).map((h) =>
      h.textContent?.trim(),
    );
    expect(institutions).toEqual(['Fundação Getulio Vargas', 'Universidade de Mogi das Cruzes']);
    expect(compiled.textContent).toContain('Jun 2026 – Ago 2027');
    expect(compiled.textContent).toContain('Jul 2006 – Jun 2010');
  });

  it('should show every certification, including expired ones, most recent first', () => {
    fixture.detectChanges();
    flushEducation(httpMock);
    flushCertifications(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const names = Array.from(compiled.querySelectorAll('.certification-item h3')).map((h) =>
      h.textContent?.trim(),
    );
    expect(names).toEqual([
      'MTA: Introduction to Programming Using JavaScript',
      'Microsoft Certified: Azure Developer Associate',
      'Microsoft Certified: Azure Fundamentals',
    ]);
  });

  it('should mark active and expired certifications distinctly and add no badge when validity is unspecified', () => {
    fixture.detectChanges();
    flushEducation(httpMock);
    flushCertifications(httpMock);
    fixture.detectChanges();

    const items = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.certification-item'),
    );
    const active = items.find((li) => li.textContent?.includes('Azure Developer Associate'));
    const expired = items.find((li) => li.textContent?.includes('JavaScript'));
    const unspecified = items.find((li) => li.textContent?.includes('Azure Fundamentals'));

    expect(active?.textContent).toContain('Ativa');
    expect(expired?.textContent).toContain('Expirada');
    expect(expired?.classList).toContain('certification-item--expired');
    expect(unspecified?.textContent).not.toContain('Ativa');
    expect(unspecified?.textContent).not.toContain('Expirada');
  });

  it('should only render the credential id when it is present in the data', () => {
    fixture.detectChanges();
    flushEducation(httpMock);
    flushCertifications(httpMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('2C8849CAD0B7C1B1');
    const items = Array.from(compiled.querySelectorAll('.certification-item'));
    const noCredential = items.find((li) => li.textContent?.includes('JavaScript'));
    expect(noCredential?.textContent).not.toContain('ID da credencial');
  });
});
