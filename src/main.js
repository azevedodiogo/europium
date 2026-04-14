// Ponto de entrada do frontend.
// É aqui que a aplicação Vue é criada e configurada.
import { createApp, h } from 'vue'
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
import IconePublico from '@/componentes/app/IconePublico.vue'

// Aplica o tema antes da montagem para evitar mudanças visuais bruscas.
inicializarModoEscuro()

// Cria a instância principal da aplicação.
const app = createApp(App)

// Ativa o Pinia para estado global.
app.use(createPinia())
// Ativa o router para navegação entre páginas.
app.use(router)

// Agrupa todos os ícones globais num objeto para os registar em ciclo.
const icones = {
  IconDownload: 'download',
  IconCircleCheckFilled: 'circle-check-filled',
  IconCircleXFilled: 'circle-x-filled',
  IconAlertCircleFilled: 'alert-circle-filled',
  IconInfoCircle: 'info-circle',
  IconExternalLink: 'external-link',
  IconSearch: 'search',
  IconX: 'x',
  IconRefresh: 'refresh',
  IconChevronDown: 'chevron-down',
  IconChevronLeft: 'chevron-left',
  IconChevronRight: 'chevron-right',
  IconSelector: 'selector',
  IconCheck: 'check',
  IconArrowRight: 'arrow-right',
  IconArrowNarrowRight: 'arrow-narrow-right',
  IconFileText: 'file-text',
  IconUsers: 'users',
}

// Regista cada ícone com o seu nome atual.
Object.entries(icones).forEach(([nome, ficheiro]) => {
  app.component(nome, {
    props: {
      size: { type: [Number, String], default: 24 },
    },
    setup(props, { attrs }) {
      return () =>
        h(IconePublico, {
          ...attrs,
          src: `/icons/${ficheiro}.svg`,
          size: props.size,
        })
    },
  })
})

// Regista a diretiva `v-scroll-animate`.
app.directive('scroll-animate', scrollAnimateDirective)

// Monta a aplicação no elemento `#app` do `index.html`.
app.mount('#app')
