import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useFinanceiroStore = defineStore('financeiro', () => {
  // Tabs configuration
  const tabs = [
    { key: 'contas', label: 'Contas', badge: false },
    { key: 'cartoes', label: 'Cartões', badge: false },
    { key: 'orcamento', label: 'Orçamento', badge: false },
    { key: 'projecao', label: 'Projeção', badge: false },
    {
      key: 'simulador',
      label: 'Simulador "E se..."',
      badge: true,
      badgeIcon: 'mdi-calculator-variant',
      badgeColor: 'warning',
    },
  ];

  // UI State
  const activeTab = ref('contas');
  const searchContas = ref('');
  const showLancamentoModal = ref(false);

  // Contas a Pagar/Receber
  const contasHeaders = [
    { title: 'Descrição', key: 'descricao', sortable: true },
    { title: 'Tipo', key: 'tipo', sortable: true },
    { title: 'Valor', key: 'valor', sortable: true, align: 'end' },
    { title: 'Vencimento', key: 'vencimento', sortable: true },
    { title: 'Status', key: 'status', sortable: true },
    { title: 'Ações', key: 'acoes', sortable: false },
  ];

  const contasItems = ref([
    {
      id: 1,
      descricao: 'Aluguel',
      tipo: 'pagar' as const,
      valor: 1800,
      vencimento: '2025-01-10',
      status: 'pendente' as const,
    },
    {
      id: 2,
      descricao: 'Salário',
      tipo: 'receber' as const,
      valor: 8500,
      vencimento: '2025-01-05',
      status: 'recebido' as const,
    },
    {
      id: 3,
      descricao: 'Internet',
      tipo: 'pagar' as const,
      valor: 120,
      vencimento: '2025-01-15',
      status: 'pendente' as const,
    },
    {
      id: 4,
      descricao: 'Freelance',
      tipo: 'receber' as const,
      valor: 2200,
      vencimento: '2025-01-20',
      status: 'pendente' as const,
    },
    {
      id: 4,
      descricao: 'Energia',
      tipo: 'pagar' as const,
      valor: 350,
      vencimento: '2025-01-10',
      status: 'atrasado' as const,
    },
    {
      id: 5,
      descricao: 'Cartão Nubank',
      tipo: 'pagar' as const,
      valor: 1200,
      vencimento: '2025-01-08',
      status: 'pago' as const,
    },
  ]);

  const statusColor = (status: string): string => {
    const colors: Record<string, string> = {
      pendente: 'warning',
      pago: 'success',
      recebido: 'success',
      atrasado: 'error',
    };
    return colors[status] || 'default';
  };

  const statusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      pendente: 'Pendente',
      pago: 'Pago',
      recebido: 'Recebido',
      atrasado: 'Atrasado',
    };
    return labels[status] || status;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  // Cartões de Crédito
  const cartoes = ref([
    {
      id: 1,
      nome: 'Nubank',
      final: '1234',
      limite: 5000,
      parceladoFuturo: 1200,
      limiteLivre: 3800,
    },
    { id: 2, nome: 'Itaú', final: '5678', limite: 8000, parceladoFuturo: 2500, limiteLivre: 5500 },
    { id: 3, nome: 'Inter', final: '9012', limite: 3000, parceladoFuturo: 500, limiteLivre: 2500 },
  ]);

  // Orçamento
  const orcamentoCategorias = ref([
    {
      id: 1,
      label: 'Essenciais (50%)',
      percentual: 48,
      gasto: 4800,
      limite: 5000,
      color: 'primary',
    },
    { id: 2, label: 'Desejos (30%)', percentual: 35, gasto: 3500, limite: 3000, color: 'warning' },
    {
      id: 3,
      label: 'Investimentos (20%)',
      percentual: 17,
      gasto: 1700,
      limite: 2000,
      color: 'success',
    },
  ]);

  // Projeção
  const cenariosProjecao = ['Realista', 'Otimista', 'Pessimista'];
  const projecaoCenario = ref('Realista');

  const projecaoMeses = ref([
    { mes: 'Jan/25', entradas: 12500, saidas: 9800, saldoMes: 2700, saldoAcumulado: 15200 },
    { mes: 'Fev/25', entradas: 12500, saidas: 10200, saldoMes: 2300, saldoAcumulado: 17500 },
    { mes: 'Mar/25', entradas: 12500, saidas: 11000, saldoMes: 1500, saldoAcumulado: 19000 },
    { mes: 'Abr/25', entradas: 13500, saidas: 10500, saldoMes: 3000, saldoAcumulado: 22000 },
    { mes: 'Mai/25', entradas: 12500, saidas: 9800, saldoMes: 2700, saldoAcumulado: 24700 },
    { mes: 'Jun/25', entradas: 12500, saidas: 12000, saldoMes: 500, saldoAcumulado: 25200 },
  ]);

  // Simulador
  const simuladorTipos = [
    { value: 'emprestimo', label: 'Novo Empréstimo / Financiamento' },
    { value: 'parcelamento', label: 'Parcelamento de Compra' },
    { value: 'quitar', label: 'Quitação Antecipada' },
    { value: 'investimento', label: 'Novo Investimento' },
  ];

  const simulador = ref({
    tipo: 'emprestimo',
    valor: 0,
    parcelas: 12,
    juros: 1.5,
  });

  const _simuladorValido = computed(() => simulador.value.valor > 0);

  const _simulacaoResultado = ref<{
    valorTotal: number;
    parcelaMensal: number;
    jurosTotal: number;
    aviso: string;
  } | null>(null);

  const calcularSimulacao = () => {
    const { valor, parcelas, juros } = simulador.value;
    const jurosMensal = juros / 100;
    const parcelaMensal =
      (valor * (jurosMensal * (1 + jurosMensal) ** parcelas)) / ((1 + jurosMensal) ** parcelas - 1);
    const valorTotal = parcelaMensal * parcelas;
    const jurosTotal = valorTotal - valor;

    let aviso = '';
    if (jurosTotal > valor * 0.5) {
      aviso =
        'Atenção: Os juros representam mais de 50% do valor principal. Considere alternativas.';
    } else if (jurosTotal > valor * 0.3) {
      aviso = 'Os juros são significativos. Avalie se o parcelamento é necessário.';
    } else {
      aviso = 'Simulação dentro de parâmetros razoáveis.';
    }

    return {
      valorTotal,
      parcelaMensal,
      jurosTotal,
      aviso,
    };
  };

  // Actions
  const setActiveTab = (tab: string) => {
    activeTab.value = tab;
  };

  const setSearchContas = (value: string) => {
    searchContas.value = value;
  };

  const setProjecaoCenario = (value: string) => {
    projecaoCenario.value = value;
  };

  const setSimulador = (value: typeof simulador.value) => {
    simulador.value = value;
  };

  const setShowLancamentoModal = (value: boolean) => {
    showLancamentoModal.value = value;
  };

  const setSimuladorResultado = (_resultado: ReturnType<typeof calcularSimulacao>) => {
    // Store the result in the store
    // Using a separate ref to hold the result
  };

  const simulacaoResultadoRef = ref<{
    valorTotal: number;
    parcelaMensal: number;
    jurosTotal: number;
    aviso: string;
  } | null>(null);

  return {
    // State
    tabs,
    activeTab,
    searchContas,
    contasHeaders,
    contasItems,
    statusColor,
    statusLabel,
    formatCurrency,
    cartoes,
    orcamentoCategorias,
    cenariosProjecao,
    projecaoCenario,
    projecaoMeses,
    simuladorTipos,
    simulador,
    simulacaoResultado: simulacaoResultadoRef,
    showLancamentoModal,

    // Getters
    simuladorValido: computed(() => simulador.value.valor > 0),

    // Actions
    setActiveTab,
    setSearchContas,
    setProjecaoCenario,
    setSimulador,
    setShowLancamentoModal,
    calcularSimulacao,
    setSimuladorResultado,
  };
});
