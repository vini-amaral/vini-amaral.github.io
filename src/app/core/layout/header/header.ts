import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  path: string;
  label: string;
  exact: boolean;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly navLinks: NavLink[] = [
    { path: '/', label: 'Início', exact: true },
    { path: '/projects', label: 'Projetos', exact: false },
    { path: '/experience', label: 'Experiência', exact: false },
    { path: '/skills', label: 'Habilidades', exact: false },
    { path: '/about', label: 'Sobre', exact: false },
    { path: '/contact', label: 'Contato', exact: false },
  ];
}
