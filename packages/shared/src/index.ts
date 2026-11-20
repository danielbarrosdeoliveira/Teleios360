export type { WorkspaceConfig as WorkspaceConfigType } from './workspaces';
export {
  WORKSPACE_ORDER,
  WORKSPACES,
  type WorkspaceConfig,
  type WorkspaceId,
  type WorkspaceModule,
} from './workspaces';

export const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatCurrency(value: number): string {
  return CURRENCY_FORMATTER.format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function percentValue(value: number, total: number): number {
  if (total === 0) {
    return 0;
  }
  return Math.round((value / total) * 100 * 100) / 100;
}

export function formatDateBr(date: Date | string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export const WORKSPACE_COLORS: Record<string, string> = {
  PF: 'primary',
  PJ: 'secondary',
  IGREJA: 'accent',
};
