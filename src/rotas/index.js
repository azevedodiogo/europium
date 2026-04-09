// Router principal da aplicação.
// Cada import abaixo corresponde a uma página acessível por URL.
import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicial from '@/paginas/PaginaInicial.vue'
import PaginaMarcosMetas from '@/paginas/PaginaMarcosMetas.vue'
import PaginaIndicadores from '@/paginas/PaginaIndicadores.vue'
import PaginaDesembolsos from '@/paginas/PaginaDesembolsos.vue'
import PaginaCompararPaises from '@/paginas/PaginaCompararPaises.vue'
import PaginaMapa from '@/paginas/PaginaMapa.vue'
import PaginaMais from '@/paginas/PaginaMais.vue'
import PaginaGlossario from '@/paginas/PaginaGlossario.vue'
import PaginaLinhaTempo from '@/paginas/PaginaLinhaTempo.vue'

// Lista de rotas da aplicação.
// Cada objeto diz que componente deve aparecer em cada caminho.
const routes = [
  {
    // Página inicial.
    path: '/',
    name: 'home',
    component: PaginaInicial,
    meta: { title: 'Início — Europium' }
  },
  {
    // Página de marcos e metas.
    path: '/marcos-metas',
    name: 'marcos-metas',
    component: PaginaMarcosMetas,
    meta: { title: 'Marcos e Metas — Europium' }
  },
  {
    // Página dos indicadores comuns.
    path: '/indicadores',
    name: 'indicadores',
    component: PaginaIndicadores,
    meta: { title: 'Indicadores — Europium' }
  },
  {
    // Página de desembolsos.
    path: '/desembolsos',
    name: 'desembolsos',
    component: PaginaDesembolsos,
    meta: { title: 'Desembolsos — Europium' }
  },
  {
    // Página de comparação entre países.
    path: '/comparar-paises',
    name: 'comparar-paises',
    component: PaginaCompararPaises,
    meta: { title: 'Comparar Países — Europium' }
  },
  {
    // Página do mapa.
    path: '/mapa',
    name: 'mapa',
    component: PaginaMapa,
    meta: { title: 'Mapa EU — Europium' }
  },
  {
    // Página agregadora de recursos extra.
    path: '/mais',
    name: 'mais',
    component: PaginaMais,
    meta: { title: 'Ver mais — Europium' }
  },
  {
    // Página do glossário.
    path: '/glossario',
    name: 'glossario',
    component: PaginaGlossario,
    meta: { title: 'Glossário MRR — Europium' }
  },
  {
    // Página da linha do tempo.
    path: '/linha-tempo',
    name: 'linha-tempo',
    component: PaginaLinhaTempo,
    meta: { title: 'Linha do Tempo MRR — Europium' }
  },
  {
    // Se o caminho não existir, volta para a página inicial.
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

// Cria a instância do router.
const router = createRouter({
  // Usa URLs normais, sem hash.
  history: createWebHistory(import.meta.env.BASE_URL),
  // Entrega ao router a lista de rotas definida acima.
  routes,

  // Controla o scroll quando o utilizador muda de página.
  scrollBehavior(to, from, savedPosition) {
    // Se o browser já tiver uma posição guardada, volta a essa posição.
    if (savedPosition) return savedPosition
    // Se o destino tiver uma âncora, tenta fazer scroll até esse elemento.
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    // Caso normal: começa no topo da página.
    return { top: 0 }
  }
})

// Atualiza o título do separador do browser sempre que a rota muda.
router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
})

// Exporta o router para ser usado no arranque da aplicação.
export default router
