<template>
  <div class="not-found-view">
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" class="text-center">
          <v-icon size="150" color="error" class="mb-6">mdi-alert-circle-outline</v-icon>
          <h1 class="display-1 font-weight-bold mb-2">404</h1>
          <h2 class="text-h4 mb-4">Página não encontrada</h2>
          <p class="text-muted mb-6" style="max-width: 400px; margin: 0 auto;">
            A página que você procura não existe ou foi movida. Verifique o endereço ou use a navegação lateral.
          </p>
          <v-btn color="primary" size="large" @click="$router.push('/pessoal/financeiro')">
            <v-icon start>mdi-home</v-icon> Ir para o Financeiro Pessoal
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// NotFound View
</script>

<style scoped>
.not-found-view {
  min-height: calc(100vh - 100px);
}
</style>
