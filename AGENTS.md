# TELEIOS360 — Regras de Arquitetura e Contexto do Repositório

Este repositório é o monorepo modular do **Teleios360** (Life & Ministry ERP).
Antes de criar arquivos, instalar pacotes ou alterar a estrutura do projeto, siga rigorosamente estas regras.

## 1. Estrutura Oficial do Projeto

- `apps/api`: Backend único em NestJS + Drizzle ORM + PostgreSQL + Redis/BullMQ.
- `apps/web`: Frontend Web em **Vite + Vue.js + Vuetify**.
- `.opencode/docs/`: Fonte única da verdade para regras de negócio, PRDs e roadmap do produto.

## 2. Regras Estruturais Rígidas (Proibições)

1. **NUNCA** crie outras pastas de aplicação dentro de `apps/` (não criar `apps/frontend`, `apps/backend`, etc.). O frontend web oficial é exclusivamente `apps/web`.
2. **NUNCA** instale ou configure Turborepo, Nx ou ferramentas complexas de pipeline sem solicitação explícita. Utilize apenas workspaces do `pnpm` e scripts diretos no `package.json` da raiz para iniciar `api` e `web`.
3. **NUNCA** crie ou mantenha pastas `docs/` fora de `.opencode/docs/`. Toda documentação do projeto fica centralizada em `.opencode/docs/`.
4. **NUNCA** implemente funcionalidades de ondas futuras (PJ/IRPF, Eclesiástico, Estudos, Família, Casa/Carro, WhatsApp) sem pedido expresso.

## 3. Índice de Documentação (`.opencode/docs/`)

Consulte os arquivos abaixo antes de iniciar qualquer tarefa:

- `.opencode/docs/00-visao-geral.md`: Visão macro do Teleios360, arquitetura de Workspaces (PF, PJ/IRPF, Eclesiástico) e Core.
- `.opencode/docs/01-onda1-financeiro.md`: Especificação detalhada do **foco atual** (Controle Financeiro Pessoal, cartões, limite real, projeção de parcelas, orçamento estratégico, simulações, patrimônio 31/12 e alertas Google Calendar).
- `.opencode/docs/02-backlog-futuro.md`: Escopo das fases futuras (Onda 2, Onda 3 e Onda 4) apenas para referência arquitetural.

## 4. Diretrizes de Desenvolvimento

- **Foco Atual:** Onda 1 (Core + Seletor de Workspaces + Módulo Financeiro Pessoal).
- **Arquitetura Modular:** Mantenha os domínios bem isolados dentro de `apps/api` e `apps/web`, preparados para ativação via Feature Flags.
- **Execução pela Raiz:** Sempre garanta que os scripts do `package.json` na raiz funcionem para subir `api` e `web` sem precisar navegar manualmente entre subpastas.

## 5. Tecnologia Frontend

- **Vite + Vue.js 3 + Vuetify 3** — O frontend `apps/web` é gerenciado pelo Vite e usa Vue 3 com Vuetify 3 para componentes de interface.
- O sistema já funciona com o setup inicial de Vite + Vue no `apps/web`.
- O Vuetify é configurado via `vite.config.ts` e `src/plugins/vuetify.ts`.

### Estado, Dados e Organização de UI

- **Pinia (`src/stores/`):** Gerencia estado global de UI, sessão e contexto do cliente (como o workspace ativo, filtros ativos e preferências de tela).
- **TanStack Query (`@tanstack/vue-query`):** Gerencia dados remotos da API, cache, `staleTime` e invalidação após mutações, evitando buscas desnecessárias ao navegar entre telas.
- **Views (`src/views/`), Composables (`src/composables/`) e Componentes (`src/components/`):**
  - Views orquestram a tela e tratam estados de carregamento (`skeleton`), vazio e erro.
  - Composables coordenam a busca/mutação de dados e a integração entre TanStack Query e Pinia.
  - Componentes recebem dados via `props` e notificam ações via `emits`, respeitando a verbosidade natural de SFCs com Vuetify sem limite artificial de linhas.
