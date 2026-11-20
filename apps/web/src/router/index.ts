import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useWorkspaceStore } from '@/stores/workspace';

const routes: RouteRecordRaw[] = [
  // Rotas do workspace Pessoal
  {
    path: '/pessoal',
    redirect: '/pessoal/financeiro',
  },
  {
    path: '/pessoal/financeiro',
    name: 'pessoal-financeiro',
    component: () => import('@/views/pessoal/FinanceiroView.vue'),
    meta: { workspace: 'PERSONAL', module: 'financeiro' },
  },
  {
    path: '/pessoal/estudos',
    name: 'pessoal-estudos',
    component: () => import('@/views/pessoal/EstudosView.vue'),
    meta: { workspace: 'PERSONAL', module: 'estudos' },
  },
  {
    path: '/pessoal/familia',
    name: 'pessoal-familia',
    component: () => import('@/views/pessoal/FamiliaView.vue'),
    meta: { workspace: 'PERSONAL', module: 'familia' },
  },
  {
    path: '/pessoal/casa-carro',
    name: 'pessoal-casa-carro',
    component: () => import('@/views/pessoal/CasaCarroView.vue'),
    meta: { workspace: 'PERSONAL', module: 'casa-carro' },
  },

  // Rotas do workspace Profissional PJ
  {
    path: '/pj',
    redirect: '/pj/financeiro',
  },
  {
    path: '/pj/financeiro',
    name: 'pj-financeiro',
    component: () => import('@/views/pj/FinanceiroView.vue'),
    meta: { workspace: 'BUSINESS_PJ', module: 'financeiro-pj' },
  },
  {
    path: '/pj/ponte',
    name: 'pj-ponte',
    component: () => import('@/views/pj/PonteView.vue'),
    meta: { workspace: 'BUSINESS_PJ', module: 'ponte-pj-pf' },
  },
  {
    path: '/pj/irpf',
    name: 'pj-irpf',
    component: () => import('@/views/pj/IrpfView.vue'),
    meta: { workspace: 'BUSINESS_PJ', module: 'irpf-dossie' },
  },

  // Rotas do workspace Eclesiástico
  {
    path: '/eclesiastico',
    redirect: '/eclesiastico/pessoas',
  },
  {
    path: '/eclesiastico/pessoas',
    name: 'eclesiastico-pessoas',
    component: () => import('@/views/eclesiastico/PessoasView.vue'),
    meta: { workspace: 'ECCLESIASTICAL', module: 'pessoas' },
  },
  {
    path: '/eclesiastico/escalas',
    name: 'eclesiastico-escalas',
    component: () => import('@/views/eclesiastico/EscalasView.vue'),
    meta: { workspace: 'ECCLESIASTICAL', module: 'escalas' },
  },
  {
    path: '/eclesiastico/tesouraria',
    name: 'eclesiastico-tesouraria',
    component: () => import('@/views/eclesiastico/TesourariaView.vue'),
    meta: { workspace: 'ECCLESIASTICAL', module: 'tesouraria' },
  },
  {
    path: '/eclesiastico/agenda',
    name: 'eclesiastico-agenda',
    component: () => import('@/views/eclesiastico/AgendaView.vue'),
    meta: { workspace: 'ECCLESIASTICAL', module: 'agenda-visitas' },
  },
  {
    path: '/eclesiastico/pulpito',
    name: 'eclesiastico-pulpito',
    component: () => import('@/views/eclesiastico/PulpitoView.vue'),
    meta: { workspace: 'ECCLESIASTICAL', module: 'pulpito' },
  },
  {
    path: '/eclesiastico/avisos',
    name: 'eclesiastico-avisos',
    component: () => import('@/views/eclesiastico/AvisosView.vue'),
    meta: { workspace: 'ECCLESIASTICAL', module: 'avisos' },
  },

  // Redirect root to pessoal
  {
    path: '/',
    redirect: '/pessoal/financeiro',
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard para sincronizar workspace ativo
router.beforeEach((to, from, next) => {
  const workspaceStore = useWorkspaceStore();
  const requiredWorkspace = to.meta.workspace as string;

  if (requiredWorkspace && requiredWorkspace !== workspaceStore.activeWorkspace) {
    workspaceStore.setWorkspace(requiredWorkspace as 'PERSONAL' | 'BUSINESS_PJ' | 'ECCLESIASTICAL');
  }
  next();
});

export default router;
