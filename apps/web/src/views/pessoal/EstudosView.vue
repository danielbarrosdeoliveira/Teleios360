<template>
  <div class="placeholder-view">
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8" class="text-center">
          <v-icon size="120" color="primary" class="mb-4">mdi-book-open-variant</v-icon>
          <h1 class="display-1 font-weight-bold mb-4">Estudos e Biblioteca</h1>
          <p class="text-h5 text-muted mb-6">Módulo em desenvolvimento</p>
          <v-chip color="warning" variant="tonal" size="large">
            <v-icon start>mdi-clock-outline</v-icon> Onda 4
          </v-chip>
          <div class="mt-8 text-body-1 text-muted" style="max-width: 500px; margin: 0 auto;">
            Este módulo permitirá catalogar seus livros, acompanhar leituras, gerenciar cursos e manter anotações de estudo organizadas.
          </div>
          <v-divider class="my-6" />
          <v-list density="compact" class="mx-auto" style="max-width: 400px">
            <v-list-item v-for="feature in features" :key="feature" class="px-0">
              <template #prepend>
                <v-icon color="primary">mdi-check-circle</v-icon>
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
  'Catálogo de livros (Tenho / Lendo / Lido)',
  'Anotações e highlights por livro',
  'Backlog de cursos por área de interesse',
  'Metas de leitura anuais',
  'Integração com Goodreads / Kindle',
];
</script>

<style scoped>
.placeholder-view {
  min-height: calc(100vh - 200px);
}
</style>
