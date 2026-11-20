# TELEIOS360 — Visão Geral do Produto

## 1. Propósito

O **Teleios360** é um sistema centralizador de visão 360° para a vida pessoal, profissional/fiscal e ministerial, substituindo planilhas fragmentadas, múltiplos aplicativos, anotações soltas e lançamentos manuais demorados no dia a dia.

## 2. Arquitetura Conceitual e Modularidade

- **Core Central:** Autenticação, Seletor de Contexto (Workspaces), Controle de Módulos (Feature Flags para ativar/desativar módulos conforme a necessidade), Agenda Unificada e Motor de Notificações.
- **Workspaces:**
  1. **Pessoal (PF):** Finanças Pessoais, Estudos/Biblioteca, Família/Filho e Casa/Carro.
  2. **Profissional & Fiscal (PJ / IRPF):** Contas da PJ, Ponte de repasse PJ → PF (Pró-labore vs. Distribuição de Lucros) e Dossiê Anual de IRPF.
  3. **Eclesiástico (Congregação):** Pessoas/Cargos/Departamentos, Escalas e Frequência nos 3 cultos semanais, Tesouraria/Caixa Local com notas, Agenda/Visitas, Púlpito/Sermões e Avisos.

## 3. Premissas de Operação

- **Ambiente:** Inicialmente local para uso próprio no desktop, com arquitetura modular preparada para evolução e deploy em nuvem.
- **Notificações & Integrações:** Integração com **Google Calendar** para notificações nativas antecipadas (ex: 7 dias, 1 dia e 1 hora antes) e evolução posterior para **WhatsApp** (lançamento rápido de despesas pelo celular e disparos de avisos da congregação).
- **Estratégia de Execução:** Construção em ondas incrementais, começando pela **Onda 1 (Core + Seletor de Workspaces + Controle Financeiro Pessoal)**.
