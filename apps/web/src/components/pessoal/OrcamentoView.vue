<template>
  <v-card class="mt-4">
    <v-card-title>Orçamento Estratégico (50/30/20)</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="4" v-for="cat in categorias" :key="cat.id">
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
</template>

<script setup lang="ts">
interface Props {
  categorias: readonly {
    id: number;
    label: string;
    percentual: number;
    gasto: number;
    limite: number;
    color: string;
  }[];
  formatCurrency: (value: number) => string;
}

defineProps<Props>();
</script>