/**
 * Configuração dos Workspaces do Teleios360
 * Define os 3 contextos principais do sistema
 */

export type WorkspaceId = 'PERSONAL' | 'BUSINESS_PJ' | 'ECCLESIASTICAL';

export interface WorkspaceModule {
  id: string;
  label: string;
  route: string;
  icon: string;
  active: boolean;
  comingSoon?: string; // Onda futura
}

export interface WorkspaceConfig {
  id: WorkspaceId;
  label: string;
  icon: string; // Material Design Icons
  color: string; // CSS color / Vuetify color
  baseRoute: string;
  modules: WorkspaceModule[];
  description: string;
}

export const WORKSPACES: Record<WorkspaceId, WorkspaceConfig> = {
  PERSONAL: {
    id: 'PERSONAL',
    label: 'Pessoal',
    icon: 'mdi-account-circle',
    color: 'primary',
    baseRoute: '/pessoal',
    description: 'Gestão da vida pessoal e familiar',
    modules: [
      {
        id: 'financeiro',
        label: 'Financeiro Pessoal',
        route: '/pessoal/financeiro',
        icon: 'mdi-cash-multiple',
        active: true,
      },
      {
        id: 'estudos',
        label: 'Estudos e Biblioteca',
        route: '/pessoal/estudos',
        icon: 'mdi-book-open-variant',
        active: false,
        comingSoon: 'Onda 4',
      },
      {
        id: 'familia',
        label: 'Família e Filhos',
        route: '/pessoal/familia',
        icon: 'mdi-account-group',
        active: false,
        comingSoon: 'Onda 4',
      },
      {
        id: 'casa-carro',
        label: 'Casa e Carro',
        route: '/pessoal/casa-carro',
        icon: 'mdi-home-variant',
        active: false,
        comingSoon: 'Onda 4',
      },
    ],
  },
  BUSINESS_PJ: {
    id: 'BUSINESS_PJ',
    label: 'Profissional PJ',
    icon: 'mdi-briefcase',
    color: 'secondary',
    baseRoute: '/pj',
    description: 'Gestão profissional e fiscal (PJ/IRPF)',
    modules: [
      {
        id: 'financeiro-pj',
        label: 'Financeiro PJ',
        route: '/pj/financeiro',
        icon: 'mdi-currency-brl',
        active: false,
        comingSoon: 'Onda 2',
      },
      {
        id: 'ponte-pj-pf',
        label: 'Ponte PJ → PF (Pró-labore / Distribuição)',
        route: '/pj/ponte',
        icon: 'mdi-swap-horizontal',
        active: false,
        comingSoon: 'Onda 2',
      },
      {
        id: 'irpf-dossie',
        label: 'Dossiê IRPF Anual',
        route: '/pj/irpf',
        icon: 'mdi-file-document',
        active: false,
        comingSoon: 'Onda 2',
      },
    ],
  },
  ECCLESIASTICAL: {
    id: 'ECCLESIASTICAL',
    label: 'Eclesiástico',
    icon: 'mdi-church',
    color: 'accent',
    baseRoute: '/eclesiastico',
    description: 'Gestão ministerial e congregacional',
    modules: [
      {
        id: 'pessoas',
        label: 'Pessoas / Cargos / Departamentos',
        route: '/eclesiastico/pessoas',
        icon: 'mdi-account-group',
        active: false,
        comingSoon: 'Onda 3',
      },
      {
        id: 'escalas',
        label: 'Escalas e Frequência (3 cultos/semana)',
        route: '/eclesiastico/escalas',
        icon: 'mdi-calendar-clock',
        active: false,
        comingSoon: 'Onda 3',
      },
      {
        id: 'tesouraria',
        label: 'Tesouraria / Caixa Local com Notas',
        route: '/eclesiastico/tesouraria',
        icon: 'mdi-safe',
        active: false,
        comingSoon: 'Onda 3',
      },
      {
        id: 'agenda-visitas',
        label: 'Agenda Ministerial / Visitas',
        route: '/eclesiastico/agenda',
        icon: 'mdi-map-marker-radius',
        active: false,
        comingSoon: 'Onda 3',
      },
      {
        id: 'pulpito',
        label: 'Púlpito / Sermões / Biblioteca PDF',
        route: '/eclesiastico/pulpito',
        icon: 'mdi-podium',
        active: false,
        comingSoon: 'Onda 3',
      },
      {
        id: 'avisos',
        label: 'Avisos e Comunicação',
        route: '/eclesiastico/avisos',
        icon: 'mdi-bullhorn',
        active: false,
        comingSoon: 'Onda 3',
      },
    ],
  },
};

export const WORKSPACE_ORDER: WorkspaceId[] = ['PERSONAL', 'BUSINESS_PJ', 'ECCLESIASTICAL'];

export function getWorkspace(id: WorkspaceId): WorkspaceConfig {
  return WORKSPACES[id];
}

export function getActiveModules(workspaceId: WorkspaceId): WorkspaceModule[] {
  return WORKSPACES[workspaceId].modules.filter((m) => m.active);
}

export function getAllModules(workspaceId: WorkspaceId): WorkspaceModule[] {
  return WORKSPACES[workspaceId].modules;
}
