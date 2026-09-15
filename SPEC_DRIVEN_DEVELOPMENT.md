# Spec-Driven Development (versão simples)

A ideia é básica: **antes de construir algo não trivial, escreva um resumo
curto do quê e por quê** em `specs/`. Isso evita retrabalho e deixa
registrado o motivo de cada funcionalidade — sem processo burocrático.

## Como funciona

1. Copie [`specs/TEMPLATE.md`](specs/TEMPLATE.md) para
   `specs/NNN-nome-curto.md` (numeração sequencial).
2. Preencha 4 seções curtas: **Objetivo**, **Requisitos**, **Critérios de
   pronto**, **Fora de escopo** (opcional). Leva minutos, não horas.
3. Peça a implementação a partir da spec: *"implemente a spec
   002-galeria-projetos"*.

Veja [`specs/001-exemplo.md`](specs/001-exemplo.md) para um exemplo real do
nível de detalhe esperado.

## Quando vale a pena escrever uma spec

- ✅ Uma seção/página nova, algo com várias partes móveis, algo que você
  quer poder relembrar depois "por que fiz assim"
- ❌ Ajuste de cor, texto, typo, pequenas correções — peça direto, sem spec

## Por que isso e não algo mais robusto

Frameworks como o [GitHub Spec Kit](https://github.com/github/spec-kit)
adicionam constituição do projeto, fase de clarificação, plano técnico
separado, lista de tarefas e análise de consistência — ótimo para times e
projetos grandes, mas é processo demais para um portfólio pessoal. Esta
versão fica com o essencial (spec antes de código) e descarta o resto. Se o
projeto crescer e isso passar a fazer falta, dá para adotar aos poucos.
