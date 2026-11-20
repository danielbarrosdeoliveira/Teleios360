<template>
  <v-app>
    <!-- Topbar com seletor de workspace -->
    <v-app-bar :color="currentWorkspace.color" dark prominent>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      
      <v-toolbar-title class="d-flex align-center gap-2">
        <v-icon :icon="currentWorkspace.icon" class="mr-2" />
        <span class="font-weight-medium">Teleios360</span>
        <v-chip
          :color="currentWorkspace.color"
          variant="tonal"
          size="x-small"
          class="ml-2"
        >
          {{ currentWorkspace.label }}
        </v-chip>
      </v-toolbar-title>

      <v-spacer />

      <!-- Seletor de Workspace -->
      <v-menu :close-on-content-click="false" offset-y>
        <template #activator="{ props: menuProps }">
          <v-btn
            v-bind="menuProps"
            variant="text"
            class="mr-2"
            :style="{ color: 'white' }"
          >
            <v-icon start :icon="currentWorkspace.icon" />
            {{ currentWorkspace.label }}
            <v-icon end>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list lines="two" class="pa-2" style="min-width: 280px">
          <v-list-item
            v-for="ws in allWorkspaces"
            :key="ws.id"
            :to="ws.baseRoute"
            :class="['px-2', activeWorkspace === ws.id ? 'bg-grey-lighten-5' : '']"
            @click="setWorkspace(ws.id)"
          >
            <template #prepend>
              <v-icon :color="ws.color" :icon="ws.icon" class="mr-3" />
            </template>
            <v-list-item-title>
              {{ ws.label }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ ws.description }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon @click="toggleDrawerMini">
        <v-icon>{{ drawerMini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar / Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawerOpen"
      :mini-variant="drawerMini"
      :width="280"
      :mini-variant-width="80"
      permanent
      :color="currentWorkspace.color"
      dark
    >
      <v-list density="compact" nav>
        <!-- Header do drawer -->
        <v-list-item class="px-4 py-3" disabled>
          <template #prepend>
            <v-icon :size="drawerMini ? 28 : 36" :color="currentWorkspace.color" :icon="currentWorkspace.icon" />
          </template>
          <v-list-item-title v-if="!drawerMini" class="text-h6 font-weight-bold">
            {{ currentWorkspace.label }}
          </v-list-item-title>
        </v-list-item>

        <v-divider v-if="!drawerMini" />

        <!-- Módulos do workspace atual -->
        <v-list-item
          v-for="module in currentWorkspaceModules"
          :key="module.id"
          :to="module.route"
          :disabled="!module.active"
          :class="['px-2', module.comingSoon ? 'opacity-60' : '']"
          exact
        >
          <template #prepend>
            <v-icon :icon="module.icon" />
          </template>
          <v-list-item-title v-if="!drawerMini">{{ module.label }}</v-list-item-title>
          <template #append>
            <v-chip
              v-if="module.comingSoon"
              :label="module.comingSoon"
              size="x-small"
              color="warning"
              variant="tonal"
            />
          </template>
        </v-list-item>

        <!-- Placeholder para módulos não ativos (mostra "Em breve") -->
        <v-list-item
          v-for="module in inactiveModules"
          :key="module.id"
          disabled
          class="px-2 opacity-50"
        >
          <template #prepend>
            <v-icon :icon="module.icon" />
          </template>
          <v-list-item-title v-if="!drawerMini">{{ module.label }}</v-list-item-title>
          <template #append>
            <v-chip
              label="Em breve"
              size="x-small"
              color="surface-variant"
              variant="tonal"
            />
          </template>
        </v-list-item>
      </v-list>

      <v-divider v-if="!drawerMini" />

      <!-- Rodapé do drawer -->
      <v-list-item class="px-4 py-2" disabled v-if="!drawerMini">
        <v-list-item-title class="caption text-muted">
          Teleios360 ERP — Onda 1: Financeiro Pessoal
        </v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>

    <!-- Área principal de conteúdo -->
    <v-main class="pa-4">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkspaceStore } from '@/stores/workspace';

const workspaceStore = useWorkspaceStore();
const _router = useRouter();

// Inicializa store do localStorage
workspaceStore.initFromStorage();

// Computeds
const _activeWorkspace = computed(() => workspaceStore.activeWorkspace);
const _currentWorkspace = computed(() => workspaceStore.currentWorkspace);
const _currentWorkspaceModules = computed(() => workspaceStore.currentWorkspaceModules);
const _allWorkspaces = computed(() => workspaceStore.allWorkspaces);
const _drawerOpen = computed({
  get: () => workspaceStore.drawerOpen,
  set: (val) => workspaceStore.setDrawerOpen(val),
});
const _drawerMini = computed({
  get: () => workspaceStore.drawerMini,
  set: (val) => workspaceStore.setDrawerMini(val),
});

// Módulos inativos (para mostrar "Em breve")
const _inactiveModules = computed(() =>
  workspaceStore.currentWorkspaceModules.filter((m) => !m.active)
);

// Actions
const _setWorkspace = (id: string) => {
  workspaceStore.setWorkspace(id as 'PERSONAL' | 'BUSINESS_PJ' | 'ECCLESIASTICAL');
  // Fecha drawer em mobile após seleção
  if (window.innerWidth < 1264) {
    workspaceStore.setDrawerOpen(false);
  }
};

const _toggleDrawer = () => workspaceStore.toggleDrawer();
const _toggleDrawerMini = () => workspaceStore.toggleDrawerMini();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ajuste para o drawer mini */
:deep(.v-navigation-drawer--mini-variant .v-list-item__prepend) {
  margin-right: 0 !important;
}

/* Garante que o app preencha a tela */
:deep(.v-application--wrap) {
  min-height: 100vh;
}
</style>
