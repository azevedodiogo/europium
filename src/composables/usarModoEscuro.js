// Reatividade usada para guardar e observar o tema atual.
import { computed, ref, watch } from 'vue'

// Chave principal da preferência de tema.
const CHAVE_STORAGE = 'europium-theme-preference'
// Chave antiga mantida apenas para limpar versões anteriores.
const CHAVE_STORAGE_ANTIGA = 'europium-theme'
// Marca que diz se o utilizador escolheu o tema manualmente.
const CHAVE_STORAGE_EXPLICITA = 'europium-theme-explicit'
// Query do sistema operativo para detetar modo escuro.
const QUERY_SISTEMA = '(prefers-color-scheme: dark)'

// `matchMedia` só existe no browser, por isso protegemos o acesso.
const mediaQuery = typeof window !== 'undefined' ? window.matchMedia(QUERY_SISTEMA) : null

// Ref que acompanha a preferência atual do sistema.
const systemPrefersDark = ref(mediaQuery?.matches ?? false)

// Lê a preferência inicial guardada ou, se não existir, segue o sistema.
function lerPreferenciaInicial() {
  if (typeof window === 'undefined') return 'system'

  const guardado = localStorage.getItem(CHAVE_STORAGE)
  const preferenciaExplicita = localStorage.getItem(CHAVE_STORAGE_EXPLICITA) === 'true'

  if (preferenciaExplicita && (guardado === 'dark' || guardado === 'light')) {
    return guardado
  }

  // Se não houver escolha explícita, limpa restos antigos e volta ao modo do sistema.
  localStorage.removeItem(CHAVE_STORAGE)
  localStorage.removeItem(CHAVE_STORAGE_ANTIGA)
  localStorage.removeItem(CHAVE_STORAGE_EXPLICITA)
  return 'system'
}

// Preferência real da aplicação: `dark`, `light` ou `system`.
const themePreference = ref(lerPreferenciaInicial())

// Estado derivado final: verdadeiro quando o tema ativo é escuro.
const isDark = computed(() =>
  themePreference.value === 'system' ? systemPrefersDark.value : themePreference.value === 'dark'
)

// Escreve o tema no elemento `<html>`.
function aplicarTema(escuro) {
  document.documentElement.setAttribute('data-theme', escuro ? 'dark' : 'light')
  document.documentElement.style.colorScheme = escuro ? 'dark' : 'light'
}

// Atualiza a ref quando o sistema operativo muda de tema.
function sincronizarPreferenciaSistema(event) {
  systemPrefersDark.value = event.matches
}

// Nos browsers recentes usamos `addEventListener`.
if (typeof mediaQuery?.addEventListener === 'function') {
  mediaQuery.addEventListener('change', sincronizarPreferenciaSistema)
  // Nos browsers antigos ainda existe `addListener`.
} else if (typeof mediaQuery?.addListener === 'function') {
  mediaQuery.addListener(sincronizarPreferenciaSistema)
}

// Sempre que o tema ativo muda, escreve o novo valor no `<html>`.
watch(
  isDark,
  (novoValor) => {
    aplicarTema(novoValor)
  },
  { immediate: true }
)

// Guarda no `localStorage` apenas quando o utilizador escolhe manualmente.
watch(themePreference, (novoValor) => {
  if (novoValor === 'system') {
    localStorage.removeItem(CHAVE_STORAGE)
    localStorage.removeItem(CHAVE_STORAGE_ANTIGA)
    localStorage.removeItem(CHAVE_STORAGE_EXPLICITA)
    return
  }
  localStorage.setItem(CHAVE_STORAGE, novoValor)
  localStorage.setItem(CHAVE_STORAGE_EXPLICITA, 'true')
  localStorage.removeItem(CHAVE_STORAGE_ANTIGA)
})

// Função chamada no arranque da aplicação.
export function inicializarModoEscuro() {
  aplicarTema(isDark.value)
}

// Composição pública usada pelos componentes.
export function usarModoEscuro() {
  // Alterna entre claro e escuro.
  function toggle() {
    themePreference.value = isDark.value ? 'light' : 'dark'
  }

  return { isDark, toggle }
}
