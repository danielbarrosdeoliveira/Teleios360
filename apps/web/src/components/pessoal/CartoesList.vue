<template>
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
</template>

<script setup lang="ts">
interface Props {
  cartoes: readonly {
    id: number;
    nome: string;
    final: string;
    limite: number;
    parceladoFuturo: number;
    limiteLivre: number;
  }[];
  formatCurrency: (value: number) => string;
}

const _props = defineProps<Props>();

const _formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};
</script>