import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { WorkspaceConfig, WorkspaceId, WorkspaceModule } from '@/config/workspaces';
import { getActiveModules, getAllModules, WORKSPACE_ORDER, WORKSPACES } from '@/config/workspaces';

const STORAGE_KEY = 'teleios360-workspace';

export const useWorkspaceStore = defineStore('workspace', () => {
  // Estado
  const activeWorkspace = ref<WorkspaceId>('PERSONAL');
  const drawerOpen = ref(true);
  const drawerMini = ref(false);

  // Inicializa do localStorage
  function initFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in WORKSPACES) {
      activeWorkspace.value = saved as WorkspaceId;
    }
  }

  // Getters
  const currentWorkspace = computed<WorkspaceConfig>(() => WORKSPACES[activeWorkspace.value]);
  const currentWorkspaceModules = computed<WorkspaceModule[]>(() =>
    getAllModules(activeWorkspace.value)
  );
  const activeModules = computed<WorkspaceModule[]>(() => getActiveModules(activeWorkspace.value));
  const workspaceOrder = computed(() => WORKSPACE_ORDER);
  const allWorkspaces = computed(() => WORKSPACE_ORDER.map((id) => WORKSPACES[id]));

  // Actions
  function setWorkspace(id: WorkspaceId) {
    if (id in WORKSPACES) {
      activeWorkspace.value = id;
      localStorage.setItem(STORAGE_KEY, id);
    }
  }

  function toggleDrawer() {
    drawerOpen.value = !drawerOpen.value;
  }

  function setDrawerOpen(open: boolean) {
    drawerOpen.value = open;
  }

  function toggleDrawerMini() {
    drawerMini.value = !drawerMini.value;
  }

  function setDrawerMini(mini: boolean) {
    drawerMini.value = mini;
  }

  // Verifica se um módulo está ativo
  function isModuleActive(moduleId: string): boolean {
    return activeModules.value.some((m) => m.id === moduleId);
  }

  // Obtém a rota base do workspace atual
  const currentBaseRoute = computed(() => currentWorkspace.value.baseRoute);

  return {
    // State
    activeWorkspace,
    drawerOpen,
    drawerMini,
    // Getters
    currentWorkspace,
    currentWorkspaceModules,
    activeModules,
    workspaceOrder,
    allWorkspaces,
    currentBaseRoute,
    // Actions
    initFromStorage,
    setWorkspace,
    toggleDrawer,
    setDrawerOpen,
    toggleDrawerMini,
    setDrawerMini,
    isModuleActive,
  };
});
