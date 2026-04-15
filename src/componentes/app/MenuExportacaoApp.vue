<template>
  <!-- Área relativa para ancorar o dropdown, o menu que abre por baixo do botão. -->
  <div class="exp" ref="rootEl">
    <!-- Botão principal que abre e fecha o menu de exportação. -->
    <button
      ref="triggerEl"
      type="button"
      class="exp__trigger"
      :class="{ 'exp__trigger--open': isOpen }"
      @click="toggleMenu"
      :aria-expanded="isOpen"
      :aria-controls="isOpen ? menuId : undefined"
      aria-haspopup="menu"
      @keydown.down.prevent="openMenu(0)"
      @keydown.up.prevent="openMenu(formats.length - 1)"
    >
      <!-- Ícone decorativo do botão. -->
      <IconDownload :size="15" />
      <!-- Texto visível do botão. -->
      Exportar
    </button>
    <!-- Transição curta para o menu aparecer de forma suave. -->
    <Transition name="exp-drop">
      <!-- O menu só é renderizado quando está aberto. -->
      <div v-if="isOpen" :id="menuId" class="exp__menu" role="menu" @keydown="handleMenuKeydown">
        <!-- Cria uma opção por cada formato suportado. -->
        <button
          v-for="fmt in formats"
          :key="fmt.value"
          type="button"
          class="exp__item"
          role="menuitem"
          @click="handleExport(fmt.value)"
        >
          {{ fmt.label }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
// Hooks e refs usados pela lógica do componente.
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
// Store global que mostra a notificação de progresso ou erro.
import { useNotificationStore } from '@/estado/notificacao'

// Props, os dados que este componente recebe, definem o ficheiro e se existe algo para exportar.
const props = defineProps({
  filename: { type: String, default: 'europium-export' },
  documentLabel: { type: String, default: '' },
  hasData: { type: Boolean, default: true },
  dataCount: { type: Number, default: -1 },
  data: { type: [Array, Object, String, Number, Boolean], default: null },
  fileContext: { type: Array, default: () => [] },
  detailParts: { type: Array, default: () => [] },
})

// Indica se o dropdown, o menu de opções, está aberto.
const isOpen = ref(false)
// Guarda a referência ao elemento raiz para detetar cliques fora.
const rootEl = ref(null)
const triggerEl = ref(null)
const menuId = `export-menu-${Math.random().toString(36).slice(2)}`
// Instância local da store de notificação.
const notifStore = useNotificationStore()
// Formatos atualmente suportados.
const formats = [
  { value: 'json', label: 'JSON' },
  { value: 'csv', label: 'CSV' },
]

// Guarda o intervalo ativo da simulação de progresso.
let activeInterval = null

// Cancela o intervalo atual, se existir.
function stopInterval() {
  if (activeInterval) {
    clearInterval(activeInterval)
    activeInterval = null
  }
}
function focusTrigger() {
  triggerEl.value?.focus({ preventScroll: true })
}
function menuButtons() {
  return [...(rootEl.value?.querySelectorAll('.exp__item') ?? [])]
}
function focusMenuItem(index) {
  nextTick(() => {
    const buttons = menuButtons()
    if (!buttons.length) return
    const targetIndex = Math.min(Math.max(index, 0), buttons.length - 1)
    buttons[targetIndex]?.focus({ preventScroll: true })
  })
}
function openMenu(focusIndex = null) {
  isOpen.value = true
  if (focusIndex !== null) focusMenuItem(focusIndex)
}
function closeMenu(restoreFocus = false) {
  isOpen.value = false
  if (restoreFocus) nextTick(focusTrigger)
}
function toggleMenu() {
  if (isOpen.value) {
    closeMenu()
  } else {
    openMenu()
  }
}
function handleMenuKeydown(event) {
  const buttons = menuButtons()
  if (!buttons.length) return
  const currentIndex = buttons.indexOf(document.activeElement)

  if (event.key === 'Escape') {
    event.preventDefault()
    closeMenu(true)
    return
  }

  if (event.key === 'Home') {
    event.preventDefault()
    focusMenuItem(0)
    return
  }

  if (event.key === 'End') {
    event.preventDefault()
    focusMenuItem(buttons.length - 1)
    return
  }

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    const direction = event.key === 'ArrowDown' ? 1 : -1
    const nextIndex = (currentIndex + direction + buttons.length) % buttons.length
    focusMenuItem(nextIndex)
  }
}

// Transforma um slug técnico num título mais legível.
function humanizeSlug(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

// Converte texto livre num fragmento seguro para nomes de ficheiro.
function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Limpa partes vazias e remove duplicados.
function compactParts(parts) {
  const seen = new Set()

  return parts
    .flat()
    .map((part) => String(part ?? '').trim())
    .filter(Boolean)
    .filter((part) => {
      const key = part.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}

// Escolhe singular ou plural conforme a contagem.
function pluralize(count, singular, plural = `${singular}s`) {
  return count === 1 ? singular : plural
}

// Monta o título, o nome final do ficheiro e a linha de detalhe da notificação.
function buildExportMeta(format) {
  const title = props.documentLabel || humanizeSlug(props.filename)
  const fileContext = compactParts(props.fileContext).map(slugify).filter(Boolean)
  const detailParts = compactParts(props.detailParts)

  if (props.dataCount > -1) {
    detailParts.push(`${props.dataCount} ${pluralize(props.dataCount, 'registo')}`)
  }

  detailParts.push(format.toUpperCase())

  return {
    title,
    filename: [props.filename, ...fileContext].join('-') + `.${format}`,
    subtitle: detailParts.join(' · '),
  }
}

// Confirma se um valor é um objeto simples e não uma lista.
function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

// Calcula a contagem real quando a página não enviou `dataCount`.
function inferDataCount(data) {
  if (props.dataCount > -1) return props.dataCount
  if (Array.isArray(data)) return data.length
  return data == null ? 0 : 1
}

// Cria o bloco de dados exportado para JSON com metadados claros.
function buildJsonPayload(meta) {
  return {
    documento: meta.title,
    ficheiro: meta.filename,
    geradoEm: new Date().toISOString(),
    detalhes: compactParts(props.detailParts),
    totalRegistos: inferDataCount(props.data),
    dados: props.data ?? [],
  }
}

// Achata objetos aninhados para colunas CSV legíveis.
function flattenRow(value, prefix = '', output = {}) {
  if (Array.isArray(value)) {
    output[prefix || 'valor'] = value
      .map((item) => (isPlainObject(item) || Array.isArray(item) ? JSON.stringify(item) : item))
      .join(' | ')
    return output
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value)
    if (!entries.length && prefix) output[prefix] = ''
    entries.forEach(([key, nestedValue]) => {
      flattenRow(nestedValue, prefix ? `${prefix}.${key}` : key, output)
    })
    return output
  }

  output[prefix || 'valor'] = value ?? ''
  return output
}

// Converte qualquer payload numa lista de linhas compatível com CSV.
function normalizeCsvRows(data) {
  if (Array.isArray(data)) return data.map((item) => flattenRow(item))
  if (isPlainObject(data)) return [flattenRow(data)]
  return [{ valor: data ?? '' }]
}

// Escapa células para impedir que separadores, aspas ou quebras partam o CSV.
function escapeCsvCell(value) {
  const text = String(value ?? '').replace(/\r?\n/g, ' ')
  if (/[;"]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}

// Serializa os dados em CSV com ponto e vírgula, mais confortável em Excel PT.
function serializeCsv(data) {
  const rows = normalizeCsvRows(data)
  const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))]
  if (!columns.length) return ''
  return [
    columns.map(escapeCsvCell).join(';'),
    ...rows.map((row) => columns.map((column) => escapeCsvCell(row[column])).join(';')),
  ].join('\n')
}

// Cria o conteúdo textual conforme o formato escolhido no menu.
function serializeExport(format, meta) {
  if (format === 'json') {
    return {
      content: JSON.stringify(buildJsonPayload(meta), null, 2),
      mimeType: 'application/json;charset=utf-8',
    }
  }

  return {
    content: `\ufeff${serializeCsv(props.data ?? buildJsonPayload(meta))}`,
    mimeType: 'text/csv;charset=utf-8',
  }
}

// Força o browser a descarregar o ficheiro gerado em memória.
function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// Gera o ficheiro final e dispara o download real.
function downloadExport(format, meta) {
  const { content, mimeType } = serializeExport(format, meta)
  downloadFile(content, meta.filename, mimeType)
}

// Trata o clique numa opção do menu.
function handleExport(format) {
  // Fecha o menu logo após a escolha.
  closeMenu(true)
  // Prepara os metadados que a notificação vai mostrar.
  const meta = buildExportMeta(format)

  // Se não houver dados, mostra erro em vez de simular a exportação.
  if (!props.hasData || props.dataCount === 0) {
    stopInterval()
    notifStore.error('Sem dados para exportar. Ajuste os filtros atuais e tente novamente.', {
      title: 'Sem dados para exportar',
      subtitle: compactParts([meta.title, props.detailParts]).join(' · '),
      filename: meta.filename,
    })
    return
  }

  // Garante que não sobra nenhum intervalo antigo.
  stopInterval()
  // Inicia a notificação no estado de progresso.
  notifStore.start(meta)

  // Percentagem interna da simulação.
  let p = 0

  // Simula o progresso do download com incrementos aleatórios.
  activeInterval = setInterval(() => {
    p += Math.random() * 22 + 8

    // Quando chega a 100, termina a exportação.
    if (p >= 100) {
      stopInterval()
      try {
        downloadExport(format, meta)
        notifStore.setProgress(100)
        notifStore.finish()
      } catch {
        notifStore.error('Não foi possível gerar o ficheiro. Tente novamente.', {
          title: 'Erro na exportação',
          subtitle: compactParts([meta.title, props.detailParts]).join(' · '),
          filename: meta.filename,
        })
      }
    } else {
      // Enquanto não chega a 100, atualiza a barra.
      notifStore.setProgress(Math.round(Math.min(p, 99)))
    }
  }, 180)
}

// Fecha o menu quando o utilizador clica fora dele.
function handleOutside(e) {
  if (rootEl.value && !rootEl.value.contains(e.target)) closeMenu()
}

// Fecha o menu quando o utilizador carrega em Escape.
function handleKey(e) {
  if (e.key === 'Escape' && isOpen.value) closeMenu(true)
}

// Regista os listeners globais quando o componente entra no DOM.
onMounted(() => {
  document.addEventListener('mousedown', handleOutside)
  document.addEventListener('keydown', handleKey)
})

// Remove listeners e intervalos quando o componente sai do DOM.
onUnmounted(() => {
  stopInterval()
  document.removeEventListener('mousedown', handleOutside)
  document.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>
/* Esta área precisa de ser relativa para o dropdown, o menu de opções, ficar alinhado ao botão. */
.exp {
  position: relative;
  display: inline-block;
}

/* Estilo base do botão de exportação. */
.exp__trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-family: var(--font-family);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-primary);
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.15s,
    border-color 0.15s,
    box-shadow 0.15s;
}

/* Pequeno realce quando o cursor passa por cima. */
.exp__trigger:hover {
  background: var(--color-progress-bg);
}

/* Estado visual do botão quando o menu está aberto. */
.exp__trigger--open {
  border-color: rgba(29, 69, 135, 0.42);
  box-shadow: 0 0 0 3px rgba(29, 69, 135, 0.08);
}

/* Painel do dropdown, o menu que aparece por baixo do botão. */
.exp__menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  width: 112px;
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: visible;
  z-index: 9000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Cada linha clicável do menu. */
.exp__item {
  width: 100%;
  height: 32px;
  padding: 0 12px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-family);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s;
}

/* Remove a linha final do último item. */
.exp__item:last-child {
  border-bottom: none;
}

/* Destaque do item ao passar o rato. */
.exp__item:hover {
  background: rgba(29, 69, 135, 0.05);
}

/* Transição do dropdown, o menu de opções. */
.exp-drop-enter-active,
.exp-drop-leave-active {
  transition:
    opacity 0.12s,
    transform 0.12s;
}

/* Estado inicial e final da animação. */
.exp-drop-enter-from,
.exp-drop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Botão em modo escuro. */
[data-theme='dark'] .exp__trigger {
  background: #223144;
  border-color: rgba(142, 166, 200, 0.24);
  color: var(--color-text-primary);
  box-shadow: 0 10px 20px rgba(11, 17, 29, 0.14);
}

/* Hover do botão em modo escuro. */
[data-theme='dark'] .exp__trigger:hover {
  background: #28384e;
  border-color: rgba(142, 182, 236, 0.4);
}

/* Estado aberto do botão em modo escuro. */
[data-theme='dark'] .exp__trigger--open {
  background: #2b3c53;
  border-color: rgba(142, 182, 236, 0.5);
  box-shadow: 0 0 0 3px rgba(119, 167, 234, 0.14);
}

/* Painel do menu em modo escuro. */
[data-theme='dark'] .exp__menu {
  background: #213044;
  border-color: rgba(142, 166, 200, 0.22);
  box-shadow: 0 18px 34px rgba(11, 17, 29, 0.24);
}

/* Itens do menu em modo escuro. */
[data-theme='dark'] .exp__item {
  color: var(--color-text-primary);
  border-bottom-color: rgba(184, 202, 228, 0.08);
}

/* Hover dos itens em modo escuro. */
[data-theme='dark'] .exp__item:hover {
  background: rgba(119, 167, 234, 0.14);
}
</style>
