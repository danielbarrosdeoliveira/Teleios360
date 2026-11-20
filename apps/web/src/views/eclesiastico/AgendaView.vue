<template>
  <div class="placeholder-view">
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8" class="text-center">
          <v-icon size="120" color="accent" class="mb-4">mdi-map-marker-radius</v-icon>
          <h1 class="display-1 font-weight-bold mb-4">Agenda Ministerial / Visitas</h1>
          <p class="text-h5 text-muted mb-6">Módulo em desenvolvimento</p>
          <v-chip color="warning" variant="tonal" size="large">
            <v-icon start>mdi-clock-outline</v-icon> Onda 3
          </v-chip>
          <div class="mt-8 text-body-1 text-muted" style="max-width: 500px; margin: 0 auto;">
            Agenda ministerial e visitas nos lares (recorrentes ou pontuais) com histórico e pedidos de oração.
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
const _features = [
  'Agenda de visitas nos lares (recorrentes e pontuais)',
  'Histórico de visitas por família/membro',
  'Registro de pedidos de oração por visita',
  'Agenda de compromissos ministeriais',
  'Lembretes automáticos de visitas agendadas',
  'Relatório de visitas por período/obreiro',
];
</script>

<style scoped>
.placeholder-view {
  min-height: calc(100vh - 200px);
}
</style>
