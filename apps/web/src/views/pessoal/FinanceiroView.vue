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
          <ContasList
            :headers="contasHeaders"
            :items="contasItems"
            :search="searchContas"
            @novo-lancamento="showLancamentoModal = true"
          />
        </v-tab-item>

        <!-- Cartões de Crédito -->
        <v-tab-item :key="tabs[1].key">
          <CartoesList :cartoes="cartoes" :format-currency="formatCurrency" />
        </v-tab-item>

        <!-- Orçamento -->
        <v-tab-item :key="tabs[2].key">
          <OrcamentoView :categorias="orcamentoCategorias" :format-currency="formatCurrency" />
        </v-tab-item>

        <!-- Projeção -->
        <v-tab-item :key="tabs[3].key">
          <ProjecaoView
            :cenarios="cenariosProjecao"
            :cenario-selecionado="projecaoCenario"
            :meses="projecaoMeses"
            :format-currency="formatCurrency"
          />
        </v-tab-item>

        <!-- Simulador "E se..." -->
        <v-tab-item :key="tabs[4].key">
          <SimuladorView
            :tipos="simuladorTipos"
            :simulador="simulador"
            :simulador-valido="simuladorValido"
            :resultado="simulacaoResultado"
            @calcular="calcularSimulacao"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFinanceiroStore } from '@/stores/financeiro';

const financeiroStore = useFinanceiroStore();

const _activeTab = ref('contas');

const _contasHeaders = computed(() => financeiroStore.contasHeaders);
const _contasItems = computed(() => financeiroStore.contasItems);
const _statusColor = financeiroStore.statusColor;
const _statusLabel = financeiroStore.statusLabel;
const _formatCurrency = financeiroStore.formatCurrency;
const _cartoes = computed(() => financeiroStore.cartoes);
const _orcamentoCategorias = computed(() => financeiroStore.orcamentoCategorias);
const _cenariosProjecao = computed(() => financeiroStore.cenariosProjecao);
const _projecaoCenario = computed({
  get: () => financeiroStore.projecaoCenario,
  set: (value) => financeiroStore.setProjecaoCenario(value),
});
const _projecaoMeses = computed(() => financeiroStore.projecaoMeses);
const _simuladorTipos = computed(() => financeiroStore.simuladorTipos);
const _simulador = computed({
  get: () => financeiroStore.simulador,
  set: (value) => financeiroStore.setSimulador(value),
});
const _simuladorValido = computed(() => financeiroStore.simuladorValido);
const _simulacaoResultado = computed(() => financeiroStore.simulacaoResultado);

const _calcularSimulacao = () => financeiroStore.calcularSimulacao();
const _showLancamentoModal = computed({
  get: () => financeiroStore.showLancamentoModal,
  set: (value) => financeiroStore.setShowLancamentoModal(value),
});
</script>