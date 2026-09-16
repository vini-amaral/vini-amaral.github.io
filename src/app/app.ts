import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './core/layout/footer/footer';
import { Header } from './core/layout/header/header';
import { Container } from './shared/ui/container/container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Container],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
