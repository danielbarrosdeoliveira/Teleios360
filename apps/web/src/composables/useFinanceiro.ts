import { useFinanceiroStore } from '@/stores/financeiro';

export function useFinanceiroComposable() {
  const store = useFinanceiroStore();

  return {
    // Tabs
    tabs: store.tabs,
    activeTab: store.activeTab,
    searchContas: store.searchContas,
    contasHeaders: store.contasHeaders,
    contasItems: store.contasItems,
    statusColor: store.statusColor,
    statusLabel: store.statusLabel,
    formatCurrency: store.formatCurrency,
    cartoes: store.cartoes,
    orcamentoCategorias: store.orcamentoCategorias,
    cenariosProjecao: store.cenariosProjecao,
    projecaoCenario: store.projecaoCenario,
    projecaoMeses: store.projecaoMeses,
    simuladorTipos: store.simuladorTipos,
    simulador: store.simulador,
    simuladorValido: store.simuladorValido,
    simulacaoResultado: store.simulacaoResultado,
    showLancamentoModal: store.showLancamentoModal,

    // Actions
    setActiveTab: store.setActiveTab,
    setSearchContas: store.setSearchContas,
    setProjecaoCenario: store.setProjecaoCenario,
    setSimulador: store.setSimulador,
    setShowLancamentoModal: store.setShowLancamentoModal,
    calcularSimulacao: store.calcularSimulacao,
    setSimuladorResultado: store.setSimuladorResultado,
  };
}
