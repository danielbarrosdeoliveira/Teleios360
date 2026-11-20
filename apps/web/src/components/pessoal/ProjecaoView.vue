<template>
  <v-card class="mt-4">
    <v-card-title class="d-flex justify-space-between">
      <span>Projeção de Fluxo de Caixa (12 meses)</span>
      <v-select
        v-model="cenarioSelecionado"
        :items="cenarios"
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
            <tr v-for="mes in meses" :key="mes.mes">
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
</template>

<script setup lang="ts">
interface Props {
  cenarios: readonly string[];
  cenarioSelecionado: string;
  meses: readonly {
    mes: string;
    entradas: number;
    saidas: number;
    saldoMes: number;
    saldoAcumulado: number;
  }[];
  formatCurrency: (value: number) => string;
}

type Emits = (e: 'update:cenarioSelecionado', value: string) => void;

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const _cenarioSelecionado = computed({
  get: () => props.cenarioSelecionado,
  set: (value) => emit('update:cenarioSelecionado', value),
});

const _formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};
</script>