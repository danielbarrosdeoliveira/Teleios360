<template>
  <div class="placeholder-view">
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8" class="text-center">
          <v-icon size="120" color="accent" class="mb-4">mdi-bullhorn</v-icon>
          <h1 class="display-1 font-weight-bold mb-4">Avisos e Comunicação</h1>
          <p class="text-h5 text-muted mb-6">Módulo em desenvolvimento</p>
          <v-chip color="warning" variant="tonal" size="large">
            <v-icon start>mdi-clock-outline</v-icon> Onda 3
          </v-chip>
          <div class="mt-8 text-body-1 text-muted" style="max-width: 500px; margin: 0 auto;">
            Sistema de avisos para a congregação, integrado com WhatsApp/Email, agendamento de envios e confirmação de leitura.
          </div>
          <v-divider class="my-6" />
          <v-list density="compact" class="mx-auto" style="max-width: 400px">
            <v-list-item v-for="feature in features" :key="feature" class="px-0">
              <template #prepend>
                <v-icon color="accent">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title>{{ feature }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const features = [
  'Criação de avisos com formatação rica',
  'Agendamento de envios (data/hora)',
  'Integração WhatsApp (grupo/lista de transmissão)',
  'Integração Email (template responsivo)',
  'Confirmação de leitura/recebimento',
  'Avisos fixos (fixados no topo)',
  'Histórico de avisos enviados',
];
</script>

<style scoped>
.placeholder-view {
  min-height: calc(100vh - 200px);
}
</style>
