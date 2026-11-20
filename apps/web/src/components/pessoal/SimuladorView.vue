<template>
  <v-card class="mt-4">
    <v-card-title>Simulador "E se..."</v-card-title>
    <v-card-text>
      <v-form v-model="simuladorValido">
        <v-row dense>
          <v-col cols="12" md="6">
            <v-select
              v-model="simulador.tipo"
              :items="tipos"
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
        <v-btn color="primary" @click="handleCalcular" :disabled="!simuladorValido">
          <v-icon start>mdi-calculator</v-icon> Calcular Impacto
        </v-btn>
      </v-form>

      <v-card v-if="resultado" class="mt-6" color="primary" variant="tonal">
        <v-card-title>Resultado da Simulação</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4">
              <div class="text-center">
                <div class="display-1 font-weight-bold">{{ formatCurrency(resultado.valorTotal) }}</div>
                <div class="caption">Valor Total com Juros</div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-center">
                <div class="display-1 font-weight-bold">{{ formatCurrency(resultado.parcelaMensal) }}</div>
                <div class="caption">Parcela Mensal</div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-center">
                <div class="display-1 font-weight-bold">{{ formatCurrency(resultado.jurosTotal) }}</div>
                <div class="caption">Juros Totais</div>
              </div>
            </v-col>
          </v-row>
          <v-alert
            type="info"
            variant="tonal"
            class="mt-4"
            :text="resultado.aviso"
          />
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface Simulador {
  tipo: string;
  valor: number;
  parcelas: number;
  juros: number;
}

interface SimulacaoResultado {
  valorTotal: number;
  parcelaMensal: number;
  jurosTotal: number;
  aviso: string;
}

interface SimuladorTipo {
  value: string;
  label: string;
}

interface Props {
  tipos: readonly SimuladorTipo[];
  simulador: Simulador;
  simuladorValido: boolean;
  resultado: SimulacaoResultado | null;
}

interface Emits {
  (e: 'calcular'): void;
  (
    e: 'update:simulador',
    value: {
      tipo: string;
      valor: number;
      parcelas: number;
      juros: number;
    }
  ): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// Intencionalmente não usado diretamente no script, mas referenciado no template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _formatCurrency = formatCurrency;

const simuladorValido = computed(() => props.simulador.valor > 0);

// Intencionalmente não usado diretamente no script, mas referenciado no template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _simuladorValido = simuladorValido;

const handleCalcular = () => {
  emit('calcular');
};

// Intencionalmente não usado diretamente no script, mas referenciado no template
const _handleCalcular = handleCalcular;
</script>