import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createQueryClient } from '@tanstack/vue-query'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from '@/router'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Cliente TanStack Query com staleTime padrão de 5 minutos
const queryClient = createQueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos (garbage collection)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
