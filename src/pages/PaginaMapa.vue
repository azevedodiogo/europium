<!-- Página do mapa interativo da União Europeia. -->
<template>
  <div class="mv-page">
    <div class="mv-container">
      <!-- Introdução da página: explica o objetivo do mapa e o hover, ou seja, passar o rato por cima. -->
      <div class="page-hero">
        <h1 class="page-hero__title">Mapa da União Europeia</h1>

        <p class="page-hero__desc">
          Visualização geográfica dos 27 Estados-Membros com dados do Mecanismo de Recuperação e Resiliência. Passe o
          cursor por cima de cada país para ver os detalhes.
        </p>
      </div>
      <!-- Barra de controlo da métrica e legenda da escala cromática. -->
      <div class="mv-controls" v-scroll-animate="'fade-down'">
        <!-- Botões que trocam a métrica usada para colorir os países. -->
        <div class="mv-tabs" role="group" aria-label="Métrica">
          <button
            v-for="m in METRICS"
            :key="m.key"
            type="button"
            class="mv-tab"
            :class="{ 'mv-tab--active': activeMetric === m.key }"
            @click="setMetric(m.key)"
          >
            {{ m.label }}
          </button>
        </div>
        <!-- Legenda dinâmica: os limites mudam consoante a métrica selecionada. -->
        <div class="mv-legend" aria-label="Escala de cores">
          <span class="mv-legend__bound">{{ legendMin }}</span>

          <div class="mv-legend__track">
            <div v-for="c in PALETTE" :key="c" class="mv-legend__chip" :style="{ background: c }" />
          </div>

          <span class="mv-legend__bound">{{ legendMax }}</span>

          <span class="mv-legend__hint">Escala por país da UE</span>
        </div>
      </div>
      <!-- Área do mapa onde o SVG e os tooltips, as caixas de detalhe, ficam alinhados com o rato. -->
      <div class="mv-map-shell" v-scroll-animate ref="mapShell">
        <svg
          v-if="ready"
          :viewBox="`0 0 ${W} ${H}`"
          class="mv-svg"
          role="img"
          aria-label="Mapa interativo dos 27 Estados-Membros da UE"
        >
          <defs>
            <radialGradient id="oceanGrad" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stop-color="#c9dff2" />

              <stop offset="100%" stop-color="#a8c9e4" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" :width="W" :height="H" fill="url(#oceanGrad)" />
          <!-- Países vizinhos aparecem no mapa, mas são assinalados como fora da UE. -->
          <path
            v-for="c in contextPaths"
            :key="`ctx-${c.id}`"
            :d="c.d"
            class="mv-ctx"
            @mouseenter="(e) => enterCtx(e, c.id)"
            @mousemove="move"
            @mouseleave="leaveCtx"
          />
          <!-- Estados-Membros da UE: recebem cor de acordo com a métrica ativa. -->
          <path
            v-for="c in euPaths"
            :key="c.id"
            :d="c.d"
            :fill="getFill(c.id)"
            class="mv-country"
            :class="{ 'mv-country--hovered': hoveredId === c.id }"
            @mouseenter="(e) => enter(e, c.id)"
            @mousemove="move"
            @mouseleave="leave"
          >
            <title>{{ getName(c.id) }}</title>
          </path>
        </svg>
        <!-- Estado de carregamento enquanto o mapa geográfico é importado. -->
        <div v-else class="mv-loading">
          <div class="mv-loading__spin" />
          <span>A carregar mapa…</span>
        </div>
        <Transition name="tip">
          <!-- Tooltip, a caixa de detalhe, dos países vizinhos que não pertencem à UE. -->
          <div v-if="hoveredCtxId && hoverCtxData" class="mv-ctx-tip" :style="tipPos" role="tooltip">
            <span class="mv-ctx-tip__flag">{{ hoverCtxData.flag }}</span>

            <div class="mv-ctx-tip__text">
              <span class="mv-ctx-tip__name">{{ hoverCtxData.name }}</span>

              <span class="mv-ctx-tip__badge">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <circle cx="5" cy="5" r="4" stroke="#dc2626" stroke-width="1.2" />

                  <path d="M3 5h4" stroke="#dc2626" stroke-width="1.2" stroke-linecap="round" />
                </svg>
                Não é membro da UE
              </span>
            </div>
          </div>
        </Transition>
        <Transition name="tip">
          <!-- Tooltip detalhado, a caixa com métricas dos Estados-Membros da UE. -->
          <div v-if="hoveredId && hoverData" class="mv-tip" :style="tipPos" role="tooltip">
            <div class="mv-tip__head">
              <span class="mv-tip__flag">{{ hoverData.flag }}</span>
              <div>
                <p class="mv-tip__name">{{ hoverData.name }}</p>

                <p class="mv-tip__sub">
                  {{ activeMetricLabel }}: <strong>{{ formatVal(hoverData[activeMetric]) }}</strong>
                </p>
              </div>
            </div>

            <div class="mv-tip__body">
              <div class="mv-tip__row">
                <span>Fundos totais</span>
                <strong>{{ hoverData.funds }} mil M€</strong>
              </div>

              <div class="mv-tip__row">
                <span>Desembolsado</span>
                <strong>{{ hoverData.disbursed }} mil M€</strong>
              </div>

              <div class="mv-tip__row mv-tip__row--prog">
                <span>Progresso</span>

                <div class="mv-tip__bar-wrap">
                  <div class="mv-tip__bar">
                    <div class="mv-tip__fill" :style="{ width: hoverData.progress + '%' }" />
                  </div>

                  <span class="mv-tip__pct">{{ hoverData.progress }}%</span>
                </div>
              </div>

              <div class="mv-tip__divider" />

              <div class="mv-tip__row">
                <span>Marcos</span>
                <strong>{{ hoverData.marcos }}</strong>
              </div>

              <div class="mv-tip__row">
                <span>Obj. Climático</span>

                <strong class="mv-tip__green">{{ hoverData.climate }}%</strong>
              </div>

              <div class="mv-tip__row">
                <span>Obj. Digital</span>
                <strong>{{ hoverData.digital }}%</strong>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      <!-- Estatísticas agregadas por baixo do mapa. -->
      <div class="mv-stats" v-scroll-animate.stagger>
        <div class="mv-stat" v-for="s in stats" :key="s.label">
          <span class="mv-stat__val">{{ s.value }}</span>

          <span class="mv-stat__lbl">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Estado local, cálculos derivados e ciclo de vida da página.
import { ref, computed, onMounted, nextTick, watch } from 'vue'
// Cálculo partilhado para manter os agregados iguais aos da homepage.
import { calculateRrfSummary } from '@/utils/resumoRrf.mjs'
// Composição que carrega o recurso pelo json-server, a API local usada para simular dados.
import { usarRecursoApi } from '@/composables/usarRecursoApi'
// Tamanho fixo do viewBox do SVG, a área interna usada para desenhar o mapa.
const W = 960,
  H = 680
// Recurso reativo que contém os indicators por país.
const resource = usarRecursoApi('map')
// Conversão dos ids numéricos do world-atlas para códigos ISO.
const EU_NUM_TO_ISO = computed(() => resource.value.euNumToIso ?? {})
// Países desenhados como contexto geográfico, mas fora da União Europeia.
const CONTEXT_NUMS = computed(() => new Set(resource.value.contextNums ?? []))
// Nomes e bandeiras usados nas caixas de detalhe dos países de contexto.
const CONTEXT_NAMES = computed(() => resource.value.contextNames ?? {})
// Metadados do país expostos como computed, um cálculo reativo do Vue, para reagir a atualizações da API.
const COUNTRY_META = computed(() => resource.value.countryMeta)
// Métricas disponíveis para colorir o mapa.
const METRICS = computed(() => resource.value.metrics ?? [])
// Paleta sequencial da escala de cor.
const PALETTE = computed(() => resource.value.palette ?? [])
// Métrica selecionada inicialmente.
const activeMetric = ref('progress')
// Nome legível da métrica ativa.
const activeMetricLabel = computed(() => METRICS.value.find((m) => m.key === activeMetric.value)?.label)
// Atualiza a métrica quando o utilizador clica num separador.
function setMetric(key) {
  activeMetric.value = key
}
function formatVal(v) {
  // Aplica o formatador correto da métrica ativa.
  const m = METRICS.value.find((x) => x.key === activeMetric.value)
  return m ? `${v}${m.suffix ?? ''}` : v
}
// Intervalo mínimo/máximo usado na legenda e no cálculo da cor.
const metricRange = computed(() => {
  const vals = Object.values(COUNTRY_META.value).map((c) => c[activeMetric.value])
  if (!vals.length) return { min: 0, max: 0 }
  return { min: Math.min(...vals), max: Math.max(...vals) }
})
// Limites apresentados na legenda.
const legendMin = computed(() => formatVal(metricRange.value.min))
const legendMax = computed(() => formatVal(metricRange.value.max))
function getFill(id) {
  // Converte o valor do país numa posição da paleta.
  const d = COUNTRY_META.value[id]
  if (!d) return '#b0bec5'
  const { min, max } = metricRange.value
  const pct = max === min ? 0.5 : (d[activeMetric.value] - min) / (max - min)
  return PALETTE.value[Math.min(PALETTE.value.length - 1, Math.floor(pct * PALETTE.value.length))]
}
// Nome de fallback usado se um país não estiver nos metadados.
function getName(id) {
  return COUNTRY_META.value[id]?.name || id
}
// Estado de carregamento do SVG, o desenho vetorial do mapa.
const ready = ref(false)
// Caminhos SVG dos Estados-Membros, ou seja, os contornos desenhados no mapa.
const euPaths = ref([])
// Caminhos SVG, os contornos vetoriais, dos países vizinhos de contexto.
const contextPaths = ref([])
// Geometria do atlas carregada uma vez; os paths só são construídos quando os dados da API já existem.
const mapGeometry = ref(null)
function hasMapData() {
  return Object.keys(EU_NUM_TO_ISO.value).length > 0 && Object.keys(COUNTRY_META.value).length > 0
}
function rebuildMapPaths() {
  if (!mapGeometry.value || !hasMapData()) return

  const { features, path } = mapGeometry.value
  const nextEuPaths = []
  const nextContextPaths = []

  features.forEach((f) => {
    // Cada feature do atlas é classificada como país UE ou país de contexto.
    const numId = String(f.id).padStart(3, '0')
    const isoId = EU_NUM_TO_ISO.value[numId]
    const d = path(f)
    if (!d) return
    if (isoId) {
      nextEuPaths.push({
        id: isoId,
        d,
      })
    } else if (CONTEXT_NUMS.value.has(numId)) {
      const centroid = path.centroid(f)
      nextContextPaths.push({ id: numId, d, cx: centroid[0], cy: centroid[1] })
    }
  })

  euPaths.value = nextEuPaths
  contextPaths.value = nextContextPaths
  ready.value = true
}
onMounted(async () => {
  // Importa bibliotecas pesadas apenas nesta página para não carregar o resto da app.
  await nextTick()
  const [topoModule, d3Module, topoData] = await Promise.all([
    import('topojson-client'),
    import('d3-geo'),
    import('world-atlas/countries-50m.json'),
  ])
  const topo = topoModule
  const { geoMercator, geoPath } = d3Module
  const topoJson = topoData.default ?? topoData
  const projection = geoMercator()
    .center([13, 52])
    .scale(820)
    .translate([W / 2, H / 2])
  const path = geoPath(projection)
  const countries = topo.feature(topoJson, topoJson.objects.countries)
  mapGeometry.value = { features: countries.features, path }
  rebuildMapPaths()
})
watch([EU_NUM_TO_ISO, COUNTRY_META, CONTEXT_NUMS], rebuildMapPaths)
// Referência à área usada para posicionar as caixas de detalhe.
const mapShell = ref(null)
// Estado de hover, quando o rato está por cima de um país da UE.
const hoveredId = ref(null)
// Estado de hover, quando o rato está por cima de um país de contexto.
const hoveredCtxId = ref(null)
// Coordenadas do rato dentro da área do mapa.
const mouseX = ref(0)
const mouseY = ref(0)
// Dados da caixa de detalhe ativa para país UE.
const hoverData = computed(() => (hoveredId.value ? COUNTRY_META.value[hoveredId.value] : null))
// Dados da caixa de detalhe ativa para país de contexto.
const hoverCtxData = computed(() => (hoveredCtxId.value ? CONTEXT_NAMES.value[hoveredCtxId.value] : null))
function enter(e, id) {
  // Ao entrar num país da UE, fecha qualquer caixa de detalhe de contexto.
  hoveredId.value = id
  hoveredCtxId.value = null
  updateMouse(e)
}
function enterCtx(e, id) {
  // Ao entrar num país de contexto, fecha qualquer caixa de detalhe de Estado-Membro.
  hoveredCtxId.value = id
  hoveredId.value = null
  updateMouse(e)
}
function move(e) {
  updateMouse(e)
}
function leave() {
  hoveredId.value = null
}
function leaveCtx() {
  hoveredCtxId.value = null
}
function updateMouse(e) {
  // Guarda a posição relativa ao mapa para a caixa de detalhe não depender da janela inteira.
  if (!mapShell.value) return
  const r = mapShell.value.getBoundingClientRect()
  mouseX.value = e.clientX - r.left
  mouseY.value = e.clientY - r.top
}
const tipPos = computed(() => {
  // Ajusta a caixa de detalhe para não sair fora dos limites do mapa.
  if (!mapShell.value) return {}
  const tw = hoveredCtxId.value ? 200 : 230
  const th = hoveredCtxId.value ? 72 : 230
  const sw = mapShell.value.offsetWidth
  const sh = mapShell.value.offsetHeight
  let left = mouseX.value + 18
  let top = mouseY.value - th / 2
  if (left + tw > sw - 8) left = mouseX.value - tw - 18
  if (top < 8) top = 8
  if (top + th > sh - 8) top = sh - th - 8
  return { left: `${left}px`, top: `${top}px` }
})
const stats = computed(() => {
  // Agregados apresentados nos cartões inferiores.
  const summary = calculateRrfSummary(COUNTRY_META.value)
  return [
    { value: String(summary.memberStates), label: 'Estados-Membros' },
    { value: `${Math.round(summary.funds)} mil M€`, label: 'Fundos totais do MRR' },
    { value: `${Math.round(summary.disbursed)} mil M€`, label: 'Total Desembolsado' },
    { value: `${summary.progress}%`, label: 'Progresso Médio' },
    { value: `${summary.climate}%`, label: 'Obj. Climático Médio' },
  ]
})
</script>

<style scoped>
/* Estrutura global da página do mapa. */
.mv-page {
  background: var(--color-bg-page);
  min-height: 100vh;
  padding-bottom: 60px;
}

.mv-container {
  max-width: 1520px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
/* Barra com métricas e legenda. */
.mv-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 32px 14px;
}

/* Separadores de métrica. */
.mv-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.mv-tab {
  height: 32px;
  padding: 0 14px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  background: var(--color-bg-white);

  font-family: var(--font-family);
  font-size: var(--text-sm);
  font-weight: 500;

  color: var(--color-text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.mv-tab:hover {
  border-color: rgba(29, 69, 135, 0.35);
  color: var(--color-brand-blue);
}
.mv-tab--active {
  background: var(--color-brand-blue);
  border-color: var(--color-brand-blue);

  color: white;
  box-shadow: 0 2px 6px rgba(29, 69, 135, 0.25);
}
/* Legenda cromática da métrica selecionada. */
.mv-legend {
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.mv-legend__track {
  display: flex;
  border-radius: 3px;
  overflow: hidden;
}

.mv-legend__chip {
  width: 28px;
  height: 12px;
}

.mv-legend__bound {
  font-weight: 500;
  color: var(--color-text-primary);
}

.mv-legend__hint {
  color: var(--color-text-secondary);
  font-size: 11px;
  margin-left: 4px;
}
/* Moldura do SVG, o desenho vetorial do mapa, e zona de posicionamento das caixas de detalhe. */
.mv-map-shell {
  position: relative;
  margin: 0 32px;

  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);
  overflow: hidden;

  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.mv-svg {
  width: 100%;
  height: auto;
  display: block;
}
.mv-ctx {
  fill: #cfd8dc;
  stroke: #e8edf0;
  stroke-width: 0.7;
  stroke-linejoin: round;
  cursor: default;
  transition: fill 0.12s ease;
}

.mv-ctx:hover {
  fill: #b8c5ce;
}
.mv-country {
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 0.8;
  stroke-linejoin: round;
  cursor: pointer;

  transition:
    filter 0.12s ease,
    stroke-width 0.12s ease;
}
.mv-country:hover,
.mv-country--hovered {
  stroke: white;
  stroke-width: 1.6;

  filter: brightness(1.12) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.22));
}
.mv-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  padding: 100px 0;
  color: var(--color-text-secondary);
  font-size: var(--text-base);
}
.mv-loading__spin {
  width: 32px;
  height: 32px;
  border-radius: 50%;

  border: 3px solid var(--color-border);

  border-top-color: var(--color-brand-blue);

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.mv-tip {
  position: absolute;
  z-index: 50;
  width: 230px;

  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);

  box-shadow:
    0 8px 28px rgba(0, 0, 0, 0.13),
    0 2px 8px rgba(0, 0, 0, 0.06);
  pointer-events: none;
  overflow: hidden;
}
.mv-tip__head {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px;

  background: linear-gradient(135deg, rgba(29, 69, 135, 0.08), rgba(29, 69, 135, 0.03));

  border-bottom: 1px solid var(--color-border);
}

.mv-tip__flag {
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
}

.mv-tip__name {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.mv-tip__sub {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-top: 2px;
}

.mv-tip__sub strong {
  color: var(--color-brand-blue);
}

.mv-tip__body {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mv-tip__row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.mv-tip__row strong {
  color: var(--color-text-primary);
  font-weight: 500;
}

.mv-tip__row--prog {
  flex-direction: column;
  align-items: stretch;
  gap: 5px;
}

.mv-tip__bar-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mv-tip__bar {
  flex: 1;
  height: 5px;
  background: rgba(29, 69, 135, 0.12);
  border-radius: 3px;
  overflow: hidden;
}

.mv-tip__fill {
  height: 100%;
  background: var(--color-brand-blue);
  border-radius: 3px;
  transition: width 0.3s;
}

.mv-tip__pct {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-brand-blue);
  min-width: 30px;
  text-align: right;
}

.mv-tip__divider {
  height: 1px;
  background: var(--color-border);
  margin: 2px 0;
}

.mv-tip__green {
  color: var(--color-green) !important;
}

.tip-enter-active {
  transition:
    opacity 0.15s,
    transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tip-leave-active {
  transition: opacity 0.1s;
}

.tip-enter-from {
  opacity: 0;
  transform: scale(0.94);
}

.tip-leave-to {
  opacity: 0;
}
.mv-stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin: 12px 32px 0;
}
.mv-stat {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);
  padding: 14px 16px;

  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mv-stat__val {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-brand-blue);
  letter-spacing: -0.4px;
}

.mv-stat__lbl {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
.mv-ctx-tip {
  position: absolute;
  z-index: 50;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 14px;

  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);

  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.11),
    0 2px 6px rgba(0, 0, 0, 0.06);
  pointer-events: none;
  white-space: nowrap;
}

.mv-ctx-tip__flag {
  font-size: 20px;
  line-height: 1;
  flex-shrink: 0;
}

.mv-ctx-tip__text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.mv-ctx-tip__name {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
}
.mv-ctx-tip__badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  font-size: 11px;
  font-weight: 600;
  color: #dc2626;

  letter-spacing: 0.15px;
}

@media (max-width: 1100px) {
  .mv-stats {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .mv-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .mv-map-shell,
  .mv-controls,
  .mv-stats {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
