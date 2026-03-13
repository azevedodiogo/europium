// Ponto de entrada do frontend.
// É aqui que a aplicação Vue é criada e configurada.
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Componente raiz.
import App from './App.vue'
// Rotas com todas as páginas.
import router from './rotas/index.js'
// Função que aplica logo o tema correto no arranque.
import { inicializarModoEscuro } from '@/composicoes/usarModoEscuro'

// Estilos globais do projeto.
import './assets/main.css'
// Animações reutilizadas em várias páginas.
import './assets/animations.css'
// Registo global do Chart.js.
import './configuracoes/chart'

// Diretiva usada para animar elementos ao entrar no ecrã.
import { scrollAnimateDirective } from '@/diretivas/animarScroll'

// Ícones registados globalmente para não ter imports repetidos em cada componente.
import {
  IconDownload,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconAlertCircleFilled,
  IconInfoCircleFilled,
  IconInfoCircle,
  IconExternalLink,
  IconSearch,
  IconX,
  IconRefresh,
  IconChevronDown,
  IconChevronUp,
  IconChevronLeft,
  IconChevronRight,
  IconSelector,
  IconCheck,
  IconFilter,
  IconAlertTriangle,
  IconAlertOctagonFilled,
  IconArrowRight,
  IconArrowNarrowRight,
  IconFileText,
  IconUsers,
  IconListSearch,
  IconZoomExclamation,
} from '@tabler/icons-vue'

// Aplica o tema antes da montagem para evitar mudanças visuais bruscas.
inicializarModoEscuro()

// Cria a instância principal da aplicação.
const app = createApp(App)

// Ativa o Pinia para estado global.
app.use(createPinia())
// Ativa o router para navegação entre páginas.
app.use(router)

// Agrupa todos os ícones num objeto para os registar em ciclo.
const icones = {
  IconDownload, IconCircleCheckFilled, IconCircleXFilled,
  IconAlertCircleFilled, IconInfoCircleFilled, IconInfoCircle,
  IconExternalLink, IconSearch, IconX, IconRefresh,
  IconChevronDown, IconChevronUp, IconChevronLeft, IconChevronRight,
  IconSelector, IconCheck, IconFilter, IconAlertTriangle,
  IconAlertOctagonFilled, IconArrowRight, IconArrowNarrowRight,
  IconFileText, IconUsers, IconListSearch, IconZoomExclamation,
}

// Regista cada ícone com o seu nome atual.
Object.entries(icones).forEach(([nome, componente]) => app.component(nome, componente))

// Regista a diretiva `v-scroll-animate`.
app.directive('scroll-animate', scrollAnimateDirective)

// Monta a aplicação no elemento `#app` do `index.html`.
app.mount('#app')
