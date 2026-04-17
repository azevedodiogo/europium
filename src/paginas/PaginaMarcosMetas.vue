<!-- Página principal para explorar marcos e metas por país. -->
<template>
  <div class="mm">
    <div class="mm__body">
      <div class="mm__container">
        <!-- Cabeçalho da página: explica a diferença entre marcos e metas. -->
        <div class="page-hero">
          <h1 class="page-hero__title">Marcos e Metas</h1>

          <p class="page-hero__desc">
            Os marcos representam compromissos qualitativos, enquanto as metas referem-se a objetivos quantitativos.
            Filtre por país, pilar e/ou estado de execução.
          </p>
        </div>
        <!-- Filtros principais e exportação da lista filtrada. -->
        <MarcosMetasFilterBar
          :filterCountry="filterCountry"
          :filterPillar="filterPillar"
          :filterStatus="filterStatus"
          :filterType="filterType"
          :countryOptions="countryOptions"
          :pillarOptions="pillarOptions"
          :statusOptions="statusOptions"
          :typeOptions="typeOptions"
          :dataCount="filteredMarcos.length"
          :exportData="filteredMarcos"
          :fileContext="exportFileContext"
          :detailParts="exportFilterDetails"
          @update:filterCountry="filterCountry = $event"
          @update:filterPillar="filterPillar = $event"
          @update:filterStatus="filterStatus = $event"
          @update:filterType="filterType = $event"
          @reset="resetFilters"
        />
        <!-- Cartão estatístico calculado a partir dos filtros atuais. -->
        <MarcosMetasStatsCard :stats="computedStats" />
        <!-- Contador de resultados visíveis. -->
        <div class="mm__results-row" v-scroll-animate>
          <IconInfoCircle :size="16" class="mm__results-icon" />
          <span>{{ filteredMarcos.length }} resultado{{ filteredMarcos.length !== 1 ? 's' : '' }}</span>
        </div>
        <Transition name="mm-empty">
          <!-- Estado vazio quando a combinação de filtros não devolve resultados. -->
          <MarcosMetasEmptyState v-if="filteredMarcos.length === 0" @reset="resetFilters" />
        </Transition>
        <!-- Grelha paginada dos marcos/metas. -->
        <div v-if="filteredMarcos.length > 0" class="mm__grid">
          <!-- Cada cartão abre o painel lateral com o detalhe completo. -->
          <button
            v-for="marco in paginatedMarcos"
            :key="marco.id"
            type="button"
            class="mm__card"
            @click="openModal(marco)"
            :aria-label="`Ver detalhes: ${marco.name}`"
          >
            <div class="mm__card-top">
              <div class="mm__type-badge">{{ marco.type }}</div>

              <span class="mm__ref">{{ marco.flag }} {{ marco.ref }}</span>

              <div class="mm__status-badge" :data-status="marco.status">
                <IconCircleCheckFilled v-if="marco.status === 'cumprido'" :size="14" style="color: #008e3e" />

                <IconAlertCircleFilled
                  v-else-if="marco.status === 'parcial'"
                  :size="14"
                  class="mm__status-icon--partial"
                />

                <IconCircleXFilled v-else :size="14" style="color: #dc2626" />
                {{ statusLabel(marco.status) }}
              </div>
            </div>

            <h3 class="mm__card-title">{{ marco.name }}</h3>

            <p class="mm__card-desc">{{ marco.description }}</p>

            <div class="mm__card-footer">
              <span class="mm__footer-item"
                ><span class="mm__footer-key">Prazo:</span>
                <span class="mm__footer-val">{{ marco.deadline }}</span></span
              >

              <span class="mm__footer-divider" aria-hidden="true" />

              <span class="mm__footer-item"
                ><span class="mm__footer-key">Pilar:</span> <span class="mm__footer-val">{{ marco.pillar }}</span></span
              >

              <span class="mm__footer-divider" aria-hidden="true" />

              <span class="mm__footer-item"
                ><span class="mm__footer-key">Comp.:</span>
                <span class="mm__footer-val">{{ marco.component }}</span></span
              >

              <IconExternalLink :size="14" class="mm__footer-link" />
            </div>
          </button>
        </div>
        <!-- Paginação simples para manter a grelha legível. -->
        <div v-if="filteredMarcos.length > 0" class="mm__pagination">
          <button type="button" class="mm__page-btn" :disabled="currentPage === 1" @click="currentPage--">
            <IconChevronLeft :size="16" />
            Anterior
          </button>

          <span class="mm__page-info">Página {{ currentPage }} de {{ totalPages }}</span>

          <button type="button" class="mm__page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
            Seguinte

            <IconChevronRight :size="16" />
          </button>
        </div>
      </div>
    </div>
    <Transition name="panel">
      <!-- Painel modal lateral com os detalhes do marco/meta selecionado. -->
      <div
        v-if="showDetail"
        class="mm__overlay"
        ref="detailOverlayRef"
        @click.self="closeDetail"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="selectedMarco ? `mm-panel-title-${selectedMarco.id}` : undefined"
        tabindex="-1"
        @keydown.esc="closeDetail"
      >
        <div class="mm__panel">
          <button type="button" class="mm__panel-close" @click="closeDetail" aria-label="Fechar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
            </svg>
          </button>

          <div class="mm__panel-body" v-if="selectedMarco">
            <p class="mm__panel-ref">{{ selectedMarco.ref }}</p>

            <h2 :id="`mm-panel-title-${selectedMarco.id}`" class="mm__panel-title">{{ selectedMarco.name }}</h2>

            <div class="mm__panel-status" :data-status="selectedMarco.status">
              <IconCircleCheckFilled v-if="selectedMarco.status === 'cumprido'" :size="16" aria-hidden="true" />

              <IconAlertCircleFilled
                v-else-if="selectedMarco.status === 'parcial'"
                :size="16"
                class="mm__status-icon--partial"
                aria-hidden="true"
              />

              <IconCircleXFilled v-else :size="16" aria-hidden="true" />

              {{ statusLabel(selectedMarco.status) }}
            </div>

            <div class="mm__panel-section">
              <div class="mm__panel-section-head">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="3" width="12" height="10" rx="1" stroke="#5d646f" stroke-width="1.2" />
                  <path d="M5 6h6M5 8.5h4" stroke="#5d646f" stroke-width="1.2" stroke-linecap="round" />
                </svg>
                <span>Descrição</span>
              </div>

              <p class="mm__panel-section-text">{{ selectedMarco.description }}</p>
            </div>

            <hr class="mm__panel-divider" />

            <div class="mm__panel-meta">
              <div class="mm__panel-meta-col">
                <div class="mm__panel-meta-block">
                  <div class="mm__panel-meta-head">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <rect x="1" y="2" width="12" height="11" rx="1" stroke="#5d646f" stroke-width="1.1" />
                      <path d="M4 1v3M10 1v3M1 6h12" stroke="#5d646f" stroke-width="1.1" stroke-linecap="round" /></svg
                    ><span class="mm__panel-meta-label">Prazo</span>
                  </div>

                  <p class="mm__panel-meta-value">{{ selectedMarco.deadline }}</p>
                </div>

                <div class="mm__panel-meta-block">
                  <p class="mm__panel-meta-label">Componente</p>

                  <p class="mm__panel-meta-value">{{ selectedMarco.component }}</p>
                </div>
              </div>

              <div class="mm__panel-divider-v" aria-hidden="true" />

              <div class="mm__panel-meta-col">
                <div class="mm__panel-meta-block">
                  <div class="mm__panel-meta-head">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="6" stroke="#5d646f" stroke-width="1.1" />
                      <circle cx="7" cy="7" r="2.5" stroke="#5d646f" stroke-width="1.1" /></svg
                    ><span class="mm__panel-meta-label">Pilar</span>
                  </div>

                  <p class="mm__panel-meta-value">{{ selectedMarco.pillar }}</p>
                </div>

                <div class="mm__panel-meta-block">
                  <p class="mm__panel-meta-label">País</p>

                  <p class="mm__panel-meta-value">{{ selectedMarco.country }}</p>
                </div>
              </div>
            </div>

            <hr class="mm__panel-divider" />

            <div class="mm__panel-section">
              <div class="mm__panel-section-head">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.5" stroke="#0a1018" stroke-width="1.2" />
                  <path d="M8 5v3.5l2 1.5" stroke="#0a1018" stroke-width="1.2" stroke-linecap="round" />
                </svg>
                <span>Histórico de Revisões</span>
              </div>

              <div class="mm__timeline">
                <div v-for="(entry, i) in selectedMarco.history" :key="i" class="mm__timeline-item">
                  <div class="mm__timeline-line-wrap">
                    <div class="mm__timeline-dot" />

                    <div v-if="i < selectedMarco.history.length - 1" class="mm__timeline-line" />
                  </div>

                  <div class="mm__timeline-content">
                    <p class="mm__timeline-event">{{ entry.event }}</p>

                    <p class="mm__timeline-date">{{ entry.date }} - {{ entry.source }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
// Estado local e estatísticas derivadas desta página.
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
// Store principal onde vive a lista de marcos e metas.
import { useDashboardStore } from '@/estado/painel'
import { storeToRefs } from 'pinia'
import MarcosMetasFilterBar from '@/componentes/marcos-metas/BarraFiltrosMarcosMetas.vue'
import MarcosMetasStatsCard from '@/componentes/marcos-metas/CartaoEstatisticasMarcosMetas.vue'
import MarcosMetasEmptyState from '@/componentes/marcos-metas/EstadoVazioMarcosMetas.vue'
import { criarOpcoesPaisesEuropeus } from '@/utilitarios/paises.mjs'
const store = useDashboardStore()
const { marcos, marcosCountries, marcosPillars, marcosTypes, marcosStatusLabels } = storeToRefs(store)
// Filtros independentes da página.
const filterCountry = ref(null)
const filterPillar = ref(null)
const filterStatus = ref(null)
const filterType = ref(null)
// Estatísticas calculadas sobre o país filtrado ou sobre todos os dados.
const computedStats = computed(() => {
  const countryMarcos = filterCountry.value
    ? marcos.value.filter((m) => m.country === filterCountry.value)
    : marcos.value
  const countryOption = filterCountry.value ? countryOptions.value.find((o) => o.value === filterCountry.value) : null
  const total = countryMarcos.length
  const cumpridos = countryMarcos.filter((m) => m.status === 'cumprido').length
  const parciais = countryMarcos.filter((m) => m.status === 'parcial').length
  const naoCumpr = countryMarcos.filter((m) => m.status === 'nao-cumprido').length
  return {
    country: countryOption ? countryOption.label : 'Todos os países',
    flag: countryOption ? countryOption.flag : '🇪🇺',
    total,
    cumpridos: { count: cumpridos, pct: total ? Math.round((cumpridos / total) * 100) : 0 },
    parciais: { count: parciais, pct: total ? Math.round((parciais / total) * 100) : 0 },
    naoCumpridos: { count: naoCumpr, pct: total ? Math.round((naoCumpr / total) * 100) : 0 },
  }
})
// Estado da paginação e do painel de detalhe.
const currentPage = ref(1)
const perPage = ref(10)
const showDetail = ref(false)
const selectedMarco = ref(null)
const detailOverlayRef = ref(null)
let lastFocusedElement = null
// Lista comum de países, filtrada pelos países presentes nos marcos e metas.
const countryOptions = computed(() => {
  const availableCountryNames = new Set(marcosCountries.value)
  return criarOpcoesPaisesEuropeus()
    .filter((country) => availableCountryNames.has(country.label))
    .map((country) => ({ ...country, value: country.label }))
})
// Opções dos pilares do MRR, derivadas dos dados recebidos.
const pillarOptions = computed(() => marcosPillars.value.map((pillar) => ({ value: pillar, label: pillar })))
// Estados existentes nos dados atuais de marcos/metas.
const statusValues = computed(() => [...new Set(marcos.value.map((marco) => marco.status))].sort())
// Opções de estado de execução, com labels vindas do recurso dashboard.
const statusOptions = computed(() =>
  statusValues.value.map((status) => ({ value: status, label: statusLabel(status) }))
)
// Opções de tipo de compromisso, derivadas dos dados recebidos.
const typeOptions = computed(() => marcosTypes.value.map((type) => ({ value: type, label: type })))
// Aplica todos os filtros em conjunto.
const filteredMarcos = computed(() =>
  marcos.value.filter(
    (m) =>
      (!filterCountry.value || m.country === filterCountry.value) &&
      (!filterPillar.value || m.pillar === filterPillar.value) &&
      (!filterStatus.value || m.status === filterStatus.value) &&
      (!filterType.value || m.type === filterType.value)
  )
)
// Segmentos usados para gerar nomes de ficheiro mais explícitos na exportação.
const exportFileContext = computed(() => {
  const parts = []
  if (filterCountry.value) parts.push(filterCountry.value)
  if (filterPillar.value) parts.push(filterPillar.value)
  if (filterStatus.value) parts.push(statusLabel(filterStatus.value))
  if (filterType.value) parts.push(filterType.value)
  return parts
})
// Detalhes apresentados na notificação de exportação.
const exportFilterDetails = computed(() => {
  const parts = []
  if (filterCountry.value) parts.push(`País: ${filterCountry.value}`)
  if (filterPillar.value) parts.push(`Pilar: ${filterPillar.value}`)
  if (filterStatus.value) parts.push(`Estado: ${statusLabel(filterStatus.value)}`)
  if (filterType.value) parts.push(`Tipo: ${filterType.value}`)
  return parts
})
// Total de páginas, nunca inferior a 1 para simplificar a UI.
const totalPages = computed(() => Math.max(1, Math.ceil(filteredMarcos.value.length / perPage.value)))
// Subconjunto de cartões mostrado na página atual.
const paginatedMarcos = computed(() => {
  const s = (currentPage.value - 1) * perPage.value
  return filteredMarcos.value.slice(s, s + perPage.value)
})
// Abre o detalhe e bloqueia o scroll da página por baixo.
function openModal(m) {
  lastFocusedElement = document.activeElement
  selectedMarco.value = m
  showDetail.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    detailOverlayRef.value?.focus({ preventScroll: true })
  })
}
// Fecha o detalhe e repõe o scroll normal.
function closeDetail() {
  showDetail.value = false
  document.body.style.overflow = ''
  if (lastFocusedElement?.isConnected) {
    nextTick(() => {
      lastFocusedElement?.focus({ preventScroll: true })
      lastFocusedElement = null
    })
  }
}
function resetFilters() {
  // Repõe todos os filtros e volta à primeira página.
  filterCountry.value = null
  filterPillar.value = null
  filterStatus.value = null
  filterType.value = null
  currentPage.value = 1
}
// Converte chaves internas de estado em texto legível.
function statusLabel(s) {
  return marcosStatusLabels.value?.[s] ?? s
}
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Estrutura geral da página. */
.mm {
  background: var(--color-bg-page);
  min-height: 100vh;
}

.mm__body {
  padding: 0 0 60px;
}

.mm__container {
  max-width: 1520px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* Linha de resultados e contador. */
.mm__results-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 32px 10px;
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

.mm__results-icon {
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

/* Grelha dos cartões de marcos/metas. */
.mm__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 0 32px;
}

/* Cartão clicável de cada compromisso. */
.mm__card {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 17px;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition:
    box-shadow 0.15s,
    border-color 0.15s;
}

.mm__card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-color: rgba(29, 69, 135, 0.2);
}

.mm__card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.mm__type-badge {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 3px 9px;
  font-size: var(--text-sm);
  white-space: nowrap;
}

.mm__ref {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.mm__status-badge {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: 500;
  border: 1px solid;
}

.mm__status-badge[data-status='cumprido'] {
  color: var(--color-green);
  background: rgba(0, 142, 62, 0.08);
  border-color: rgba(0, 142, 62, 0.2);
}

.mm__status-badge[data-status='parcial'] {
  color: #f4da31;
  background: rgba(243, 223, 37, 0.1);
  border-color: #fcee65;
}

.mm__status-badge[data-status='nao-cumprido'] {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.08);
  border-color: rgba(220, 38, 38, 0.2);
}

.mm__status-icon--partial {
  color: #f4da31;
}

.mm__card-title {
  font-size: var(--text-base);
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.4;
}

.mm__card-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
  flex: 1;
}

.mm__card-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
  flex-wrap: wrap;
}

.mm__footer-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-sm);
}

.mm__footer-key {
  color: var(--color-text-secondary);
}

.mm__footer-val {
  font-weight: 500;
}

.mm__footer-divider {
  display: block;
  width: 1px;
  height: 12px;
  background: var(--color-border);
}

.mm__footer-link {
  margin-left: auto;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

/* Paginação da grelha. */
.mm__pagination {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 20px 32px 0;
  justify-content: flex-end;
}

.mm__page-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-primary);
  background: var(--color-bg-white);
  cursor: pointer;
  transition: background 0.15s;
}

.mm__page-btn:hover:not(:disabled) {
  background: var(--color-progress-bg);
}

.mm__page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.mm__page-info {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin-right: auto;
}

.mm__overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(10, 16, 24, 0.45);
  display: flex;
  justify-content: flex-end;
}
.mm__overlay:focus {
  outline: none;
}

.mm__panel {
  width: 512px;
  max-width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background: #f9fafb;
  border: 1px solid var(--color-border);
  border-radius: 8px 0 0 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  position: relative;
}

.mm__panel-close {
  position: absolute;
  top: 10px;
  right: 16px;
  width: 16px;
  height: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mm__panel-body {
  padding: 24px;
}

.mm__panel-ref {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.mm__panel-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 14px;
  line-height: 1.4;
}

.mm__panel-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-size: var(--text-base);
  font-weight: 500;
  border: 1px solid;
  margin-bottom: 28px;
}

.mm__panel-status[data-status='cumprido'] {
  color: var(--color-green);
  background: rgba(0, 142, 62, 0.08);
  border-color: rgba(0, 142, 62, 0.2);
}

.mm__panel-status[data-status='parcial'] {
  color: #f4da31;
  background: rgba(243, 223, 37, 0.1);
  border-color: #fcee65;
}

.mm__panel-status[data-status='nao-cumprido'] {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.08);
  border-color: rgba(220, 38, 38, 0.2);
}

.mm__panel-section {
  margin-bottom: 20px;
}

.mm__panel-section-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-base);
  font-weight: 500;
  margin-bottom: 10px;
}

.mm__panel-section-text {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.625;
}

.mm__panel-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 20px 0;
}

.mm__panel-meta {
  display: flex;
  gap: 0;
  margin-bottom: 4px;
}

.mm__panel-meta-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mm__panel-divider-v {
  width: 1px;
  background: var(--color-border);
  margin: 0 24px;
  align-self: stretch;
}
.mm__panel-meta-block {
}

.mm__panel-meta-head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.mm__panel-meta-label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.mm__panel-meta-value {
  font-size: var(--text-base);
  font-weight: 500;
  margin-top: 4px;
}

.mm__timeline {
  display: flex;
  flex-direction: column;
}

.mm__timeline-item {
  display: flex;
  gap: 12px;
}

.mm__timeline-line-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 8px;
}

.mm__timeline-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-brand-blue);
  flex-shrink: 0;
  margin-top: 6px;
}

.mm__timeline-line {
  flex: 1;
  width: 1px;
  background: var(--color-border);
  margin: 4px 0;
  min-height: 24px;
}

.mm__timeline-content {
  padding-bottom: 20px;
}

.mm__timeline-event {
  font-size: var(--text-base);
  margin-bottom: 4px;
  line-height: 1.4;
}

.mm__timeline-date {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.mm-empty-enter-active,
.mm-empty-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.mm-empty-enter-from,
.mm-empty-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.2s;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
}

.panel-enter-active .mm__panel,
.panel-leave-active .mm__panel {
  transition: transform 0.2s ease;
}

.panel-enter-from .mm__panel,
.panel-leave-to .mm__panel {
  transform: translateX(100%);
}
[data-theme='dark'] .mm__panel {
  background: #223246;

  border-color: var(--color-border);
}
[data-theme='dark'] .mm__overlay {
  background: rgba(0, 0, 0, 0.65);
}
[data-theme='dark'] .mm__card {
  background: var(--color-bg-white);

  border-color: var(--color-border);
}
[data-theme='dark'] .mm__card:hover {
  border-color: rgba(74, 127, 212, 0.3);
}
[data-theme='dark'] .mm__card-footer {
  border-top-color: var(--color-border);
}
[data-theme='dark'] .mm__page-btn {
  background: var(--color-bg-white);

  border-color: var(--color-border);

  color: var(--color-text-primary);
}

/* Em tablet, os cartões passam a ocupar a largura total para leitura confortável. */
@media (max-width: 900px) {
  .mm__grid {
    grid-template-columns: 1fr;
  }
}

/* No telemóvel, remove margens fixas e simplifica paginação. */
@media (max-width: 640px) {
  .mm__results-row,
  .mm__grid,
  .mm__pagination {
    margin-left: 0;
    margin-right: 0;
  }

  .mm__pagination {
    align-items: stretch;
    flex-direction: column;
  }

  .mm__page-info {
    margin-right: 0;
    order: -1;
  }
}
</style>
