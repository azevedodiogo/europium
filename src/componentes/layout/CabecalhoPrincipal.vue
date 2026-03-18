
<!--
  Cabeçalho principal da aplicação.
  Mostra o logótipo, a navegação e o botão do modo escuro.
-->
<template>
  <!-- Cabeçalho fixo no topo. -->
  <header class="header">
    <!-- Contentor alinhado com a largura do site. -->
    <div class="header__inner">
      <!-- Logótipo com ligação à página inicial. -->
      <RouterLink to="/" class="header__logo" aria-label="Europium — Início">
        <div class="header__logo-img" aria-hidden="true">
          <img src="/eu-flag.webp" alt="" width="46" height="31" />
        </div>

        <div class="header__logo-text">
          <span class="header__logo-name">Europium</span>
          <span class="header__logo-tagline">Recuperação e Resiliência</span>
        </div>
      </RouterLink>

      <!-- Navegação principal. -->
      <nav class="header__nav" role="navigation" aria-label="Navegação principal" ref="navEl">
        <!-- Pílula animada que acompanha o link ativo. -->
        <div
          v-if="pillStyle"
          class="header__pill"
          :style="pillStyle"
          aria-hidden="true"
        />

        <!-- Um link por cada secção principal. -->
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="header__nav-link"
          :class="{ 'header__nav-link--active': isActive(link.to), 'header__nav-link--mais': link.to === '/mais' }"
          :aria-current="isActive(link.to) ? 'page' : undefined"
          :ref="el => setLinkRef(el, link.to)"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Ações do lado direito. -->
      <div class="header__actions">
        <!-- Botão que alterna entre tema claro e escuro. -->
        <button
          type="button"
          class="header__theme-btn"
          @click="toggle"
          :aria-label="isDark ? 'Activar modo claro' : 'Activar modo escuro'"
          :title="isDark ? 'Modo claro' : 'Modo escuro'"
        >
          <!-- Lua quando o tema atual é claro. -->
          <svg v-if="!isDark" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13.5 10.5A6 6 0 0 1 5.5 2.5a6 6 0 1 0 8 8z"
              stroke="currentColor" stroke-width="1.4"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <!-- Sol quando o tema atual é escuro. -->
          <svg v-else width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.4"/>
            <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7"
              stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
// Estado local do cabeçalho e leitura da rota atual.
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { usarModoEscuro } from '@/composicoes/usarModoEscuro'

// Rota atual.
const route                  = useRoute()
// Estado do tema e ação para alternar.
const { isDark, toggle }     = usarModoEscuro()
// Referência ao contentor da navegação.
const navEl                  = ref(null)
// Mapa de referências para cada link.
const linkRefs               = ref({})

// Lista de links principais do site.
const navLinks = [
  { to: '/',                label: 'Início'          },
  { to: '/marcos-metas',    label: 'Marcos e Metas'  },
  { to: '/indicadores',     label: 'Indicadores'     },
  { to: '/desembolsos',     label: 'Desembolsos'     },
  { to: '/comparar-paises', label: 'Comparar Países' },
  { to: '/mais',            label: 'Ver mais →'       },
]

// Diz se um caminho deve aparecer como ativo.
function isActive(path) {
  return path === '/' ? route.path === '/' : route.path.startsWith(path)
}

// Guarda a referência real de cada link.
function setLinkRef(el, to) {
  if (el) linkRefs.value[to] = el.$el ?? el
}

// Calcula a posição e a largura da pílula do menu.
const pillStyle = computed(() => {
  const activeLink = navLinks.find(l => isActive(l.to))
  if (!activeLink || !navEl.value) return null
  const el = linkRefs.value[activeLink.to]
  if (!el) return null
  const navRect  = navEl.value.getBoundingClientRect()
  const linkRect = el.getBoundingClientRect()
  return {
    // Distância do link ativo à esquerda da barra.
    left:  `${linkRect.left - navRect.left}px`,
    // Largura exata do link ativo.
    width: `${linkRect.width}px`,
  }
})

// Força um recálculo depois da montagem.
onMounted(() => nextTick(() => {}))

// Recalcula também sempre que a rota muda.
watch(() => route.path, () => nextTick(() => {}))
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 200;
  height: var(--header-height);
  
  background: rgba(255, 255, 255, 0.96);
  
  backdrop-filter: blur(12px) saturate(160%);
  
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  
  border-bottom: 0.8px solid var(--color-border);
}
.header__inner {
  max-width: 1520px;
  margin: 0 auto;
  
  padding: 0 32px;
  height: 100%;
  display: grid;
  
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
}
.header__logo {
  
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  justify-self: center;
  transform: translateX(34px);
  flex-shrink: 0;
}
.header__logo-img {
  
  display: flex; align-items: center;
  
  border-radius: 5px; overflow: hidden;
  
  width: 46px; height: 31px; flex-shrink: 0;
}

.header__logo-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

.header__logo-text     { display: flex; flex-direction: column; gap: 1px; }

.header__logo-name     { font-size: var(--text-base); font-weight: 600; color: var(--color-text-primary); line-height: 1; }

.header__logo-tagline  { font-size: 11px; font-weight: 400; color: var(--color-text-secondary); line-height: 1; }
.header__nav {
  
  display: flex;
  align-items: center;
  gap: 2px;
  position: relative;
}
.header__pill {
  position: absolute;
  top: 0; height: 100%;
  
  border-radius: var(--radius-sm);
  pointer-events: none;
  z-index: 0;
  
  background: rgba(29, 69, 135, 0.08);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.6),
    0 0 0 1px rgba(29,69,135,0.12);
  transition:
    
    left  0.38s cubic-bezier(0.34, 1.56, 0.64, 1),
    
    width 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.header__nav-link {
  
  position: relative; z-index: 1;
  
  padding: 8px 12px;
  
  font-size: var(--text-base); font-weight: 400;
  color: var(--color-text-secondary);
  
  border-radius: var(--radius-sm);
  
  text-decoration: none; white-space: nowrap;
  transition: color 0.15s ease;
}

.header__nav-link:hover         { color: var(--color-brand-blue); }

.header__nav-link--active       { color: var(--color-brand-blue); font-weight: 500; }

.header__nav-link--mais         { font-style: normal; }
.header__actions {
  justify-self: end;
  
  display: flex;
  align-items: center;
  gap: 8px;
}
.header__theme-btn {
  
  display: flex; align-items: center; justify-content: center;
  
  width: 32px; height: 32px;
  
  border: 1px solid transparent;
  border-radius: 8px;
  
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.header__theme-btn:hover {
  
  background: var(--color-brand-blue-10);
  
  border-color: rgba(29,69,135,0.15);
  color: var(--color-brand-blue);
}
[data-theme="dark"] .header {
  
  background: rgba(26, 38, 56, 0.9);
  
  border-bottom-color: rgba(208,224,246,0.08);
}
[data-theme="dark"] .header__nav-link {
  color: #b8c7da;
}
[data-theme="dark"] .header__nav-link:hover {
  color: #eef4ff;
  
  background: rgba(119,167,234,0.12);
}
[data-theme="dark"] .header__nav-link--active {
  
  color: #f5f8ff;
}
[data-theme="dark"] .header__pill {
  
  background: rgba(119,167,234,0.14);
  
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    0 0 0 1px rgba(119,167,234,0.18);
}
[data-theme="dark"] .header__theme-btn {
  
  background: rgba(119,167,234,0.08);
  
  border-color: rgba(157,192,244,0.14);
  color: #dce7f7;
}
[data-theme="dark"] .header__theme-btn:hover {
  
  background: rgba(119,167,234,0.14);
  
  border-color: rgba(157,192,244,0.26);
  color: #f5f8ff;
}


@media (max-width: 1100px) {
  
  .header__nav-link { padding: 8px 9px; font-size: 13px; }
}

@media (max-width: 900px) {
  
  .header__nav { display: none; }
  
  .header__inner { grid-template-columns: 1fr auto; }

  .header__logo {
    justify-self: start;
    transform: none;
  }
}
</style>
