<template>
  <div class="financeiro-view">
    <v-container fluid>
      <!-- Header da página -->
      <v-row class="mb-4">
        <v-col cols="12">
          <h1 class="display-1 font-weight-bold mb-1">Financeiro Pessoal</h1>
          <p class="text-muted">Controle de contas, cartões, orçamento e projeções</p>
        </v-col>
      </v-row>

      <!-- Cards de resumo -->
      <v-row dense class="mb-6">
        <v-col cols="12" sm="6" md="3">
          <v-card color="success" variant="tonal">
            <v-card-text class="text-center">
              <div class="display-2 font-weight-bold">R$ 12.450,00</div>
              <div class="caption">Saldo Total</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card color="warning" variant="tonal">
            <v-card-text class="text-center">
              <div class="display-2 font-weight-bold">R$ 3.200,00</div>
              <div class="caption">A Receber</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card color="error" variant="tonal">
            <v-card-text class="text-center">
              <div class="display-2 font-weight-bold">R$ 4.800,00</div>
              <div class="caption">A Pagar</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card color="info" variant="tonal">
            <v-card-text class="text-center">
              <div class="display-2 font-weight-bold">R$ 8.500,00</div>
              <div class="caption">Limite Cartão Livre</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Abas: Contas / Cartões / Orçamento / Projeções / Simulador -->
      <v-tabs v-model="activeTab" background-color="transparent" slider-color="primary">
        <v-tab :key="tab.key" v-for="tab in tabs">
          {{ tab.label }}
          <v-icon end v-if="tab.badge" :icon="tab.badgeIcon" :color="tab.badgeColor" small />
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab">
        <!-- Contas a Pagar/Receber -->
        <v-tab-item :key="tabs[0].key">
          <v-card class="mt-4">
            <v-card-title class="d-flex justify-space-between">
              <span>Contas a Pagar / Receber</span>
              <v-btn color="primary" size="small" @click="showLancamentoModal = true">
                <v-icon start>mdi-plus</v-icon> Novo Lançamento
              </v-btn>
            </v-card-title>
            <v-data-table
              :headers="contasHeaders"
              :items="contasItems"
              :search="searchContas"
              item-key="id"
              class="elevation-1"
            >
              <template #[`item.tipo`]="{ item }">
                <v-chip
                  :color="item.tipo === 'receber' ? 'success' : 'error'"
                  size="small"
                  variant="tonal"
                >
                  {{ item.tipo === 'receber' ? 'A Receber' : 'A Pagar' }}
                </v-chip>
              </template>
              <template #[`item.status`]="{ item }">
                <v-chip
                  :color="statusColor(item.status)"
                  size="x-small"
                  variant="tonal"
                >
                  {{ statusLabel(item.status) }}
                </v-chip>
              </template>
              <template #[`item.valor`]="{ item }">
                <span :class="item.tipo === 'receber' ? 'text-success' : 'text-error'">
                  {{ formatCurrency(item.valor) }}
                </span>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>

        <!-- Cartões de Crédito -->
        <v-tab-item :key="tabs[1].key">
          <v-card class="mt-4">
            <v-card-title class="d-flex justify-space-between">
              <span>Cartões de Crédito</span>
              <v-btn color="primary" size="small">Novo Cartão</v-btn>
            </v-card-title>
            <v-row dense class="pa-4">
              <v-col cols="12" md="4" v-for="cartao in cartoes" :key="cartao.id">
                <v-card variant="outlined">
                  <v-card-title>{{ cartao.nome }}</v-card-title>
                  <v-card-subtitle>Final {{ cartao.final }}</v-card-subtitle>
                  <v-card-text>
                    <div class="d-flex justify-space-between mb-2">
                      <span>Limite Total</span>
                      <strong>{{ formatCurrency(cartao.limite) }}</strong>
                    </div>
                    <div class="d-flex justify-space-between mb-2">
                      <span>Parcelado Futuro</span>
                      <span>{{ formatCurrency(cartao.parceladoFuturo) }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-2">
                      <span class="text-success">Limite Livre</span>
                      <strong class="text-success">{{ formatCurrency(cartao.limiteLivre) }}</strong>
                    </div>
                    <v-progress-linear
                      :value="((cartao.limite - cartao.limiteLivre) / cartao.limite) * 100"
                      :color="cartao.limiteLivre < cartao.limite * 0.2 ? 'error' : 'primary'"
                      height="8"
                      class="mt-2"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>

        <!-- Orçamento -->
        <v-tab-item :key="tabs[2].key">
          <v-card class="mt-4">
            <v-card-title>Orçamento Estratégico (50/30/20)</v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="4" v-for="cat in orcamentoCategorias" :key="cat.id">
                  <v-card variant="tonal" :color="cat.color">
                    <v-card-text class="text-center">
                      <div class="display-1 font-weight-bold">{{ cat.percentual }}%</div>
                      <div class="caption">{{ cat.label }}</div>
                      <div class="mt-2">
                        <v-progress-linear :value="cat.percentual" :color="cat.color" height="6" />
                      </div>
                      <div class="mt-1 text-caption">
                        {{ formatCurrency(cat.gasto) }} / {{ formatCurrency(cat.limite) }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
        </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Projeção -->
        <v-tab-item :key="tabs[3].key">
          <v-card class="mt-4">
            <v-card-title class="d-flex justify-space-between">
              <span>Projeção de Fluxo de Caixa (12 meses)</span>
              <v-select
                v-model="projecaoCenario"
                :items="cenariosProjecao"
                label="Cenário"
                variant="outlined"
                density="compact"
                hide-details
                style="max-width: 200px"
              />
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Mês</th>
                      <th>Entradas</th>
                      <th>Saídas</th>
                      <th>Saldo do Mês</th>
                      <th>Saldo Acumulado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="mes in projecaoMeses" :key="mes.mes">
                      <td>{{ mes.mes }}</td>
                      <td class="text-success">{{ formatCurrency(mes.entradas) }}</td>
                      <td class="text-error">{{ formatCurrency(mes.saidas) }}</td>
                      <td :class="mes.saldoMes >= 0 ? 'text-success' : 'text-error'">
                        {{ formatCurrency(mes.saldoMes) }}
                      </td>
                      <td :class="mes.saldoAcumulado >= 0 ? 'text-success' : 'text-error'">
                        {{ formatCurrency(mes.saldoAcumulado) }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
        </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Simulador "E se..." -->
        <v-tab-item :key="tabs[4].key">
          <v-card class="mt-4">
            <v-card-title>Simulador "E se..."</v-card-title>
            <v-card-text>
              <div v-model="simuladorValido">
                <v-row dense>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="simulador.tipo"
                      :items="simuladorTipos"
                      label="Tipo de Simulação"
                      variant="outlined"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="simulador.valor"
                      label="Valor (R$)"
                      type="number"
                      prefix="R$"
                      variant="outlined"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="simulador.parcelas"
                      label="Parcelas"
                      type="number"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="simulador.juros"
                      label="Juros ao Mês (%)"
                      type="number"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
                <v-divider class="my-4" />
                <v-btn color="primary" @click="calcularSimulacao" :disabled="!simuladorValido">
                  <v-icon start>mdi-calculator</v-icon> Calcular Impacto
                </v-btn>
              </div>

              <v-card v-if="simulacaoResultado" class="mt-6" color="primary" variant="tonal">
                <v-card-title>Resultado da Simulação</v-card-title>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" md="4">
                      <div class="text-center">
                        <div class="display-1 font-weight-bold">{{ formatCurrency(simulacaoResultado.valorTotal) }}</div>
                        <div class="caption">Valor Total com Juros</div>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4">
                      <div class="text-center">
                        <div class="display-1 font-weight-bold">{{ formatCurrency(simulacaoResultado.parcelaMensal) }}</div>
                        <div class="caption">Parcela Mensal</div>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4">
                      <div class="text-center">
                        <div class="display-1 font-weight-bold">{{ formatCurrency(simulacaoResultado.jurosTotal) }}</div>
                        <div class="caption">Juros Totais</div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-alert
                    type="info"
                    variant="tonal"
                    class="mt-4"
                    :text="simulacaoResultado.aviso"
                  />
                </v-card-text>
              </v-card>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Tabs
const tabs = [
  { key: 'contas', label: 'Contas', badge: false },
  { key: 'cartoes', label: 'Cartões', badge: false },
  { key: 'orcamento', label: 'Orçamento', badge: false },
  { key: 'projecao', label: 'Projeção', badge: false },
  { key: 'simulador', label: 'Simulador "E se..."', badge: true, badgeIcon: 'mdi-calculator-variant', badgeColor: 'warning' },
];

const activeTab = ref('contas');

// Mock data
const searchContas = ref('');

// Contas a Pagar/Receber
const contasHeaders = [
  { title: 'Descrição', key: 'descricao', sortable: true },
  { title: 'Tipo', key: 'tipo', sortable: true },
  { title: 'Valor', key: 'valor', sortable: true, align: 'end' },
  { title: 'Vencimento', key: 'vencimento', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Ações', key: 'acoes', sortable: false },
];

const contasItems = [
  { id: 1, descricao: 'Aluguel', tipo: 'pagar', valor: 1800, vencimento: '2025-01-10', status: 'pendente' },
  { id: 2, descricao: 'Salário', tipo: 'receber', valor: 8500, vencimento: '2025-01-05', status: 'recebido' },
  { id: 3, descricao: 'Internet', tipo: 'pagar', valor: 120, vencimento: '2025-01-15', status: 'pendente' },
  { id: 4, descricao: 'Freelance', tipo: 'receber', valor: 2200, vencimento: '2025-01-20', status: 'pendente' },
  { id: 5, descricao: 'Energia', tipo: 'pagar', valor: 350, vencimento: '2025-01-10', status: 'atrasado' },
  { id: 6, descricao: 'Cartão Nubank', tipo: 'pagar', valor: 1200, vencimento: '2025-01-08', status: 'pago' },
];

const statusColor = (status) => {
  const colors = {
    pendente: 'warning',
    pago: 'success',
    recebido: 'success',
    atrasado: 'error',
  };
  return colors[status] || 'default';
};

const statusLabel = (status) => {
  const labels = {
    pendente: 'Pendente',
    pago: 'Pago',
    recebido: 'Recebido',
    atrasado: 'Atrasado',
  };
  return labels[status] || status;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// Cartões de Crédito
const cartoes = [
  { id: 1, nome: 'Nubank', final: '1234', limite: 5000, parceladoFuturo: 1200, limiteLivre: 3800 },
  { id: 2, nome: 'Itaú', final: '5678', limite: 8000, parceladoFuturo: 2500, limiteLivre: 5500 },
  { id: 3, nome: 'Inter', final: '9012', limite: 3000, parceladoFuturo: 500, limiteLivre: 2500 },
];

// Orçamento
const orcamentoCategorias = [
  { id: 1, label: 'Essenciais (50%)', percentual: 48, gasto: 4800, limite: 5000, color: 'primary' },
  { id: 2, label: 'Desejos (30%)', percentual: 35, gasto: 3500, limite: 3000, color: 'warning' },
  { id: 3, label: 'Investimentos (20%)', percentual: 17, gasto: 1700, limite: 2000, color: 'success' },
];

// Projeção
const cenariosProjecao = ['Realista', 'Otimista', 'Pessimista'];
const projecaoCenario = ref('Realista');

const projecaoMeses = [
  { mes: 'Jan/25', entradas: 12500, saidas: 9800, saldoMes: 2700, saldoAcumulado: 15200 },
  { mes: 'Fev/25', entradas: 12500, saidas: 10200, saldoMes: 2300, saldoAcumulado: 17500 },
  { mes: 'Mar/25', entradas: 12500, saidas: 11000, saldoMes: 1500, saldoAcumulado: 19000 },
  { mes: 'Abr/25', entradas: 13500, saidas: 10500, saldoMes: 3000, saldoAcumulado: 22000 },
  { mes: 'Mai/25', entradas: 12500, saidas: 9800, saldoMes: 2700, saldoAcumulado: 24700 },
  { mes: 'Jun/25', entradas: 12500, saidas: 12000, saldoMes: 500, saldoAcumulado: 25200 },
];

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

const simuladorValido = computed(() => simulador.value.valor > 0);

const simulacaoResultado = ref(null);

const calcularSimulacao = () => {
  const { valor, parcelas, juros } = simulador.value;
  const jurosMensal = juros / 100;
  const parcelaMensal = valor * (jurosMensal * Math.pow(1 + jurosMensal, parcelas)) / (Math.pow(1 + jurosMensal, parcelas) - 1);
  const valorTotal = parcelaMensal * parcelas;
  const jurosTotal = valorTotal - valor;

  let aviso = '';
  if (jurosTotal > valor * 0.5) {
    aviso = 'Atenção: Os juros representam mais de 50% do valor principal. Considere alternativas.';
  } else if (jurosTotal > valor * 0.3) {
    aviso = 'Os juros são significativos. Avalie se o parcelamento é necessário.';
  } else {
    aviso = 'Simulação dentro de parâmetros razoáveis.';
  }

  simulacaoResultado.value = {
    valorTotal,
    parcelaMensal,
    jurosTotal,
    aviso,
  };
};
</script>
