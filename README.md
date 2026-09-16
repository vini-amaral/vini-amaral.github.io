# vini-amaral.github.io

My developer portfolio and personal website, built with Angular and hosted on GitHub Pages.

## Desenvolvimento

Este projeto usa Spec-Driven Development. Veja
[SPEC_DRIVEN_DEVELOPMENT.md](SPEC_DRIVEN_DEVELOPMENT.md) para o fluxo de
trabalho e os comandos disponíveis (`/constitution`, `/specify`, `/clarify`,
`/plan`, `/tasks`, `/analyze`, `/implement`).

## Deploy

O deploy é automático: todo push na branch `main` dispara o workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que builda o
projeto (`npm test` + `npm run build`) e publica `dist/portfolio/browser` no
GitHub Pages via `actions/deploy-pages`. Também é possível disparar o deploy
manualmente pela aba **Actions** (`workflow_dispatch`).

Pontos relevantes da estratégia:

- Como o repositório é `vini-amaral.github.io`, o site é publicado na raiz
  (`https://vini-amaral.github.io/`), então o `base-href` padrão do Angular
  (`/`) já é o correto — não é um _project site_ com subcaminho.
- `public/.nojekyll` desabilita o processamento Jekyll do GitHub Pages sobre
  o build do Angular.
- Como o Angular Router faz roteamento client-side, o GitHub Pages não sabe
  resolver acesso direto/refresh em rotas aninhadas (ex.: `/projects`). O
  workflow copia `index.html` para `404.html` no output — assim, qualquer
  rota desconhecida cai no app Angular, que resolve a rota no cliente.
- No repositório GitHub, em **Settings → Pages → Build and deployment →
  Source**, é preciso selecionar **GitHub Actions** (é um passo manual único,
  fora do controle deste repositório).
