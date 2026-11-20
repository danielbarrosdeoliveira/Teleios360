<template>
  <v-card class="mt-4">
    <v-card-title class="d-flex justify-space-between">
      <span>Contas a Pagar / Receber</span>
      <v-btn color="primary" size="small" @click="emit('novo-lancamento')">
        <v-icon start>mdi-plus</v-icon> Novo Lançamento
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      item-key="id"
      class="elevation-1"
    >
      <template #[`item.tipo`]="{ item }">
        <v-chip
          :color="statusColor(item.tipo)"
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
</template>

<script setup lang="ts">
interface Props {
  headers: readonly {
    title: string;
    key: string;
    sortable?: boolean;
    align?: 'start' | 'end' | 'center';
  }[];
  items: readonly {
    id: number;
    descricao: string;
    tipo: 'pagar' | 'receber';
    valor: number;
    vencimento: string;
    status: 'pendente' | 'pago' | 'recebido' | 'atrasado';
  }[];
  search: string;
}

type Emits = (e: 'novo-lancamento') => void;

const _props = defineProps<Props>();
const _emit = defineEmits<Emits>();

const _statusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pendente: 'warning',
    pago: 'success',
    recebido: 'success',
    atrasado: 'error',
  };
  return colors[status] || 'default';
};

const _statusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pendente: 'Pendente',
    pago: 'Pago',
    recebido: 'Recebido',
    atrasado: 'Atrasado',
  };
  return labels[status] || status;
};

const _formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};
</script>