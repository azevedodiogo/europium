
<!-- Página que coloca dois países frente a frente para comparação direta. -->
<template>
  
  <div class="cp-page">
    
    <div class="cp-container">

      
      <!-- Cabeçalho da página: explica a comparação lado a lado. -->
      <div class="page-hero">
        
        <h1 class="page-hero__title">Comparar Países</h1>
        
        <p class="page-hero__desc">Compare lado a lado o desempenho de dois Estados-Membros no Mecanismo de Recuperação e Resiliência.</p>
      </div>

      
      <!-- Seletores dos dois países comparados. -->
      <CompareCountriesFilterBar
        :countryA="countryA"
        :countryB="countryB"
        :countryOptions="countryOptions"
        :dataCount="tableRows.length"
        :exportData="tableRows"
        :fileContext="comparisonExportContext"
        :detailParts="comparisonExportDetails"
        @update:countryA="countryA = $event"
        @update:countryB="countryB = $event"
      />

      
      <!-- Cartões de síntese calculados para os países ativos. -->
      <CompareCountriesSummaryCards :dataA="dataA" :dataB="dataB" />

      
      <!-- Gráficos só aparecem quando existem dois países válidos e diferentes. -->
      <div class="cp-charts-row" v-if="dataA && dataB">

        
        <!-- Gráfico de barras com métricas financeiras e de execução. -->
        <div class="cp-chart-card" @mouseleave="hideSvgTooltip">
          
          <div
            v-if="svgTooltip.visible && svgTooltip.owner === 'bar'"
            class="grafico-tooltip cp-svg-tooltip"
            :data-placement="svgTooltip.placement"
            :style="svgTooltipStyle"
            aria-hidden="true"
          >
            <div class="grafico-tooltip__title">{{ svgTooltip.title }}</div>
            <div class="grafico-tooltip__rows">
              <div v-for="row in svgTooltip.rows" :key="`${row.label}-${row.value}`" class="grafico-tooltip__row">
                <span class="grafico-tooltip__dot" :style="{ background: row.color }"></span>
                <span class="grafico-tooltip__copy">
                  <span class="grafico-tooltip__label">{{ row.label }}</span><span v-if="row.detail" class="grafico-tooltip__meta">· {{ row.detail }}</span>
                </span>
                <strong class="grafico-tooltip__value">{{ row.value }}</strong>
              </div>
            </div>
          </div>
          
          <h2 class="cp-chart-title">Comparação de Métricas</h2>
          
          <svg viewBox="0 0 542 296" class="cp-chart-svg" role="img"
            :aria-label="`Comparação de métricas: ${dataA.name} vs ${dataB.name}`">

            
            <g v-for="tick in barTicks" :key="tick.val">
              
              <line :x1="BL" :y1="bY(tick.val)" :x2="BL+BW" :y2="bY(tick.val)" class="cp-grid-line" stroke-width="1"/>
              
              <text :x="BL-5" :y="bY(tick.val)+4" text-anchor="end" class="cp-axis">{{ tick.val }}</text>
            </g>

            
            <g v-for="(g, gi) in barGroups" :key="g.label">
              
              <rect
                :x="bGX(gi)"
                :y="bY(g.a)"
                :width="BW2"
                :height="bH(g.a)"
                class="cp-bar cp-bar--a"
                rx="2"
                @mouseenter="showMetricTooltip($event, 'bar', dataA.name, g.label, g.a, 'a')"
                @mousemove="showMetricTooltip($event, 'bar', dataA.name, g.label, g.a, 'a')"
              />
              
              <rect
                :x="bGX(gi)+BW2+4"
                :y="bY(g.b)"
                :width="BW2"
                :height="bH(g.b)"
                class="cp-bar cp-bar--b"
                rx="2"
                @mouseenter="showMetricTooltip($event, 'bar', dataB.name, g.label, g.b, 'b')"
                @mousemove="showMetricTooltip($event, 'bar', dataB.name, g.label, g.b, 'b')"
              />
              
              <text :x="bGX(gi)+BW2+2" :y="BT+BH+20" text-anchor="middle" class="cp-axis">{{ g.label }}</text>
            </g>

            
            <rect :x="lgX" :y="BT+BH+34" width="12" height="12" class="cp-legend-dot cp-legend-dot--a" rx="2"/>
            
            <text :x="lgX+16" :y="BT+BH+44" class="cp-legend cp-legend--a">{{ dataA.name }}</text>
            
            <rect :x="lgX+lgAW+20" :y="BT+BH+34" width="12" height="12" class="cp-legend-dot cp-legend-dot--b" rx="2"/>
            
            <text :x="lgX+lgAW+36" :y="BT+BH+44" class="cp-legend cp-legend--b">{{ dataB.name }}</text>
          </svg>
        </div>

        
        <!-- Gráfico radar para comparar o perfil temático dos dois países. -->
        <div class="cp-chart-card" @mouseleave="hideSvgTooltip">
          
          <div
            v-if="svgTooltip.visible && svgTooltip.owner === 'radar'"
            class="grafico-tooltip cp-svg-tooltip"
            :data-placement="svgTooltip.placement"
            :style="svgTooltipStyle"
            aria-hidden="true"
          >
            <div class="grafico-tooltip__title">{{ svgTooltip.title }}</div>
            <div class="grafico-tooltip__rows">
              <div v-for="row in svgTooltip.rows" :key="`${row.label}-${row.value}`" class="grafico-tooltip__row">
                <span class="grafico-tooltip__dot" :style="{ background: row.color }"></span>
                <span class="grafico-tooltip__copy">
                  <span class="grafico-tooltip__label">{{ row.label }}</span><span v-if="row.detail" class="grafico-tooltip__meta">· {{ row.detail }}</span>
                </span>
                <strong class="grafico-tooltip__value">{{ row.value }}</strong>
              </div>
            </div>
          </div>
          
          <h2 class="cp-chart-title">Perfil Comparativo</h2>
          
          <svg viewBox="0 0 512 296" class="cp-chart-svg" role="img"
            :aria-label="`Perfil comparativo: ${dataA.name} vs ${dataB.name}`">

            
            <polygon v-for="r in [0.25,0.5,0.75,1]" :key="r" :points="rPoly(r)" class="cp-radar-ring" fill="none" stroke-width="1"/>

            
            <line v-for="(ax,i) in rAxes" :key="`sp${i}`" :x1="RCX" :y1="RCY" :x2="rPt(1,i).x" :y2="rPt(1,i).y" class="cp-radar-spoke" stroke-width="1"/>

            
            <polygon
              :points="rData(dataB.radar)"
              class="cp-radar-shape cp-radar-shape--b"
              stroke-width="1.5"
              stroke-linejoin="round"
              @mouseenter="showRadarTooltip($event, 'radar', dataB.name, dataB.radar, 'b')"
              @mousemove="showRadarTooltip($event, 'radar', dataB.name, dataB.radar, 'b')"
            />
            
            <polygon
              :points="rData(dataA.radar)"
              class="cp-radar-shape cp-radar-shape--a"
              stroke-width="1.5"
              stroke-linejoin="round"
              @mouseenter="showRadarTooltip($event, 'radar', dataA.name, dataA.radar, 'a')"
              @mousemove="showRadarTooltip($event, 'radar', dataA.name, dataA.radar, 'a')"
            />

            
            <text v-for="(ax,i) in rAxes" :key="`lbl${i}`"
              :x="rLblPos(i).x" :y="rLblPos(i).y"
              :text-anchor="rLblAnchor(i)"
              dominant-baseline="middle"
              class="cp-radar-lbl">{{ ax.label }}</text>

            
            <rect :x="rLgX" y="276" width="12" height="12" class="cp-legend-dot cp-legend-dot--a" rx="2"/>
            
            <text :x="rLgX+16" y="286" class="cp-legend cp-legend--a">{{ dataA.name }}</text>
            
            <rect :x="rLgX+rLgAW+20" y="276" width="12" height="12" class="cp-legend-dot cp-legend-dot--b" rx="2"/>
            
            <text :x="rLgX+rLgAW+36" y="286" class="cp-legend cp-legend--b">{{ dataB.name }}</text>
          </svg>
        </div>
      </div>

      
      <!-- Tabela textual com diferenças numéricas entre os países. -->
      <CompareCountriesTable :dataA="dataA" :dataB="dataB" :rows="tableRows" />

      
      <div v-if="!dataA || !dataB" class="cp-empty">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          
          <circle cx="20" cy="20" r="18" class="cp-empty__stroke" stroke-width="1.5"/>
          
          <path d="M12 20h16M18 14l6 6-6 6" class="cp-empty__stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Selecione dois países diferentes para comparar.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Estado e cálculos de comparação entre dois países.
import { ref, computed } from 'vue'
import CompareCountriesFilterBar from '@/componentes/comparar-paises/BarraFiltrosCompararPaises.vue'
import CompareCountriesSummaryCards from '@/componentes/comparar-paises/CartoesResumoCompararPaises.vue'
import CompareCountriesTable from '@/componentes/comparar-paises/TabelaCompararPaises.vue'
// Composição que carrega o recurso pelo json-server com fallback centralizado.
import { usarRecursoApi } from '@/composicoes/usarRecursoApi'
// Hook usado para adaptar os tooltips SVG ao tema ativo.
import { usarModoEscuro } from '@/composicoes/usarModoEscuro'
// Paleta comum usada pelos tooltips de gráficos.
import { getChartTooltipColors } from '@/utilitarios/tooltipsGraficos'
// Recurso ativo da página.
const resource = usarRecursoApi('compare')
// Estado global do tema atual.
const { isDark } = usarModoEscuro()
// Cores comuns dos tooltips, sincronizadas com light/dark mode.
const svgTooltipColors = computed(() => getChartTooltipColors(isDark.value))
// Lista completa de países disponíveis para comparação.
const ALL = computed(() => resource.value.countries)
// Países escolhidos por defeito.
const countryA = ref('PT')
const countryB = ref('ES')
// Opções enviadas para o componente de filtros.
const countryOptions = computed(() => ALL.value.map((country) => ({
  value: country.value,
  label: country.name,
  flag: country.flag,
})))
// País A válido; fica nulo se for igual ao país B para impedir comparação repetida.
const dataA = computed(() => {
  const c = ALL.value.find((country) => country.value === countryA.value)
  return (c && c.value !== countryB.value) ? c : null
})
// País B válido; fica nulo se for igual ao país A.
const dataB = computed(() => {
  const c = ALL.value.find((country) => country.value === countryB.value)
  return (c && c.value !== countryA.value) ? c : null
})
// Constantes do gráfico de barras: margens, largura e altura.
const BL=62, BT=8, BW=405, BH=222
const BW2=28
// Escala máxima do gráfico de barras, vinda dos dados.
const BY_MAX = computed(() => resource.value.barMax ?? 180)
// Estado do tooltip usado nos gráficos SVG da comparação.
const svgTooltip = ref({
  visible: false,
  owner: '',
  title: '',
  rows: [],
  x: 0,
  y: 0,
  placement: 'top',
})
// Estilo inline que posiciona e pinta o tooltip SVG com os mesmos tokens dos Chart.js.
const svgTooltipStyle = computed(() => ({
  left: `${svgTooltip.value.x}px`,
  top: `${svgTooltip.value.y}px`,
  opacity: 1,
  '--grafico-tooltip-bg': svgTooltipColors.value.bg,
  '--grafico-tooltip-text': svgTooltipColors.value.text,
  '--grafico-tooltip-muted': svgTooltipColors.value.muted,
  '--grafico-tooltip-border': svgTooltipColors.value.border,
  '--grafico-tooltip-shadow': svgTooltipColors.value.shadow,
}))
function getSeriesColor(series) {
  // País A usa azul; país B usa verde, tal como as barras e o radar.
  if (series === 'a') return isDark.value ? '#4d86dd' : '#1d4587'
  return isDark.value ? '#59bd70' : '#008e3e'
}
function setSvgTooltipPosition(event, owner, title, rows) {
  // Procura o cartão onde o gráfico SVG está desenhado.
  const card = event.currentTarget.closest('.cp-chart-card')
  // Se por algum motivo não existir cartão, não mostra tooltip.
  if (!card) return
  // Mede o cartão para converter coordenadas da janela em coordenadas locais.
  const rect = card.getBoundingClientRect()
  // Calcula a posição horizontal do rato dentro do cartão.
  const x = event.clientX - rect.left
  // Calcula a posição vertical do rato dentro do cartão.
  const y = event.clientY - rect.top
  // Limita a posição horizontal para o tooltip não sair fora do cartão.
  const safeX = Math.min(Math.max(x, 128), Math.max(rect.width - 128, 128))
  // Mostra por baixo quando o cursor está perto do topo do cartão.
  const placement = y < 130 ? 'bottom' : 'top'
  // Atualiza todos os dados usados pelo template do tooltip.
  svgTooltip.value = { visible: true, owner, title, rows, x: safeX, y: placement === 'bottom' ? y + 18 : y - 14, placement }
}
function showMetricTooltip(event, owner, countryName, metricLabel, value, series) {
  // Mostra uma métrica financeira específica no gráfico de barras.
  setSvgTooltipPosition(event, owner, countryName, [{
    label: metricLabel,
    value: `${value} mil M`,
    color: getSeriesColor(series),
  }])
}
function showRadarTooltip(event, owner, countryName, values, series) {
  // Mostra todas as dimensões temáticas do país no radar.
  setSvgTooltipPosition(event, owner, countryName, rAxes.value.map((axis, index) => ({
    label: axis.label,
    value: `${Math.round((values[index] ?? 0) * 100)}%`,
    color: getSeriesColor(series),
  })))
}
function hideSvgTooltip() {
  // Oculta o tooltip quando o rato sai do cartão do gráfico.
  svgTooltip.value.visible = false
}
// Converte um valor financeiro para coordenada vertical no SVG.
function bY(v)  { return BT + BH - Math.min(v, BY_MAX.value) / BY_MAX.value * BH }
// Calcula a altura visual de cada barra.
function bH(v)  { return BH - (bY(v) - BT) }
// Grupos comparados no gráfico de barras.
const barGroups = computed(() => {
  if (!dataA.value || !dataB.value) return []
  const a=dataA.value, b=dataB.value
  return (resource.value.barMetrics ?? []).map(metric => ({
    label: metric.label,
    a: a[metric.key],
    b: b[metric.key],
  }))
})
// Espaçamento automático entre grupos de barras.
const groupGap = computed(() => {
  const totalBarW = barGroups.value.length * (BW2*2 + 4)
  return (BW - totalBarW) / (barGroups.value.length + 1)
})
function bGX(gi) {
  // Coordenada X inicial do grupo de barras indicado pelo índice.
  const g = groupGap.value
  return BL + g + gi * (BW2*2 + 4 + g)
}
// Posição da legenda do gráfico de barras.
const lgX    = computed(() => BL + BW/2 - 55)
const lgAW   = computed(() => 8 + (dataA.value?.name?.length ?? 0) * 6)
// Marcas fixas do eixo Y do gráfico de barras.
const barTicks = computed(() => resource.value.barTicks ?? [])
// Constantes geométricas do radar.
const RCX=256, RCY=128, RR=96
// Eixos temáticos do radar e respetivos ângulos.
const rAxes = computed(() => resource.value.radarAxes ?? [])
function rPt(r, i) {
  // Calcula um ponto polar do radar em coordenadas SVG.
  const a = rAxes.value[i].angle * Math.PI / 180
  return { x: RCX + r*RR*Math.cos(a), y: RCY + r*RR*Math.sin(a) }
}
function rPoly(r) {
  // Desenha um anel do radar com o mesmo raio em todos os eixos.
  return rAxes.value.map((_,i) => { const p=rPt(r,i); return `${p.x},${p.y}` }).join(' ')
}
function rData(values) {
  // Transforma os valores normalizados do país numa polygon SVG.
  return values.map((v,i) => { const p=rPt(v,i); return `${p.x},${p.y}` }).join(' ')
}
function rLblPos(i) {
  const pad=20
  const a = rAxes.value[i].angle * Math.PI / 180
  return { x: RCX + (RR+pad)*Math.cos(a), y: RCY + (RR+pad)*Math.sin(a) }
}
function rLblAnchor(i) {
  // Ajusta o alinhamento do texto para as etiquetas não ficarem sobre os eixos.
  const angle = ((rAxes.value[i].angle % 360) + 360) % 360
  if (angle === 90 || angle === 270) return 'middle'
  if (angle > 90 && angle < 270)    return 'end'
  return 'start'
}
const rLgX  = computed(() => RCX - 55)
const rLgAW = computed(() => 8 + (dataA.value?.name?.length ?? 0) * 6)
// Linhas da tabela de comparação final.
const tableRows = computed(() => {
  if (!dataA.value || !dataB.value) return []
  const a=dataA.value, b=dataB.value
  return (resource.value.tableMetrics ?? []).map((metric) => {
    const precision = metric.precision ?? 1
    const diff = precision === 0
      ? Math.round(a[metric.key] - b[metric.key])
      : +(a[metric.key] - b[metric.key]).toFixed(precision)
    return { label: metric.label, a: a[metric.key], b: b[metric.key], diff }
  })
})
// Contexto usado no nome e notificação da exportação.
const comparisonExportContext = computed(() =>
  dataA.value && dataB.value ? [dataA.value.name, dataB.value.name] : []
)
const comparisonExportDetails = computed(() =>
  dataA.value && dataB.value ? [`${dataA.value.name} vs ${dataB.value.name}`] : []
)
</script>

<style scoped>

.cp-page      { background: var(--color-bg-page); min-height: 100vh; padding-bottom: 60px; }

.cp-container { max-width: 1520px; margin: 0 auto; padding: 0 var(--container-padding); }
.cp-charts-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 12px 32px 0;
}
.cp-chart-card {
  
  background: var(--color-bg-white); border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md); padding: 24px;
  position: relative;
  overflow: visible;
}
.cp-chart-title {
  
  font-size: 18px; font-weight: 600; color: var(--color-text-primary); margin-bottom: 16px;
}


.cp-chart-svg { width: 100%; display: block; overflow: visible; }


.cp-axis      { font-family: var(--font-family); font-size: 11px; fill: #5d646f; }

.cp-legend    { font-family: var(--font-family); font-size: 11px; }

.cp-radar-lbl { font-family: var(--font-family); font-size: 13px; fill: #6b7280; }
.cp-grid-line,
.cp-radar-ring,

.cp-radar-spoke { stroke: #eaeff5; }
.cp-bar--a,

.cp-legend-dot--a { fill: #1d4587; }
.cp-bar--b,

.cp-legend-dot--b { fill: #008e3e; }

.cp-bar,
.cp-radar-shape {
  
  cursor: pointer;
}

.cp-legend--a { fill: #1d4587; }

.cp-legend--b { fill: #008e3e; }

.cp-radar-shape--a { fill: rgba(29,69,135,0.10); stroke: #1d4587; }

.cp-radar-shape--b { fill: rgba(0,142,62,0.15); stroke: #008e3e; }
.cp-empty {
  
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  
  padding: 80px 24px; text-align: center;
  
  color: var(--color-text-secondary); font-size: var(--text-base);
  
  background: var(--color-bg-white); border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md); margin: 12px 32px 0;
}

.cp-empty__stroke { stroke: var(--color-border); }


@media (max-width: 1100px) {
  
  .cp-charts-row { grid-template-columns: 1fr; }
  
  .cp-container { padding: 0 40px; }
}
[data-theme="dark"] .cp-chart-card {
  
  background: var(--color-bg-white);
  
  border-color: var(--color-border);
}
[data-theme="dark"] .cp-grid-line,
[data-theme="dark"] .cp-radar-ring,
[data-theme="dark"] .cp-radar-spoke {
  
  stroke: rgba(210,223,242,0.18);
}
[data-theme="dark"] .cp-bar--a,
[data-theme="dark"] .cp-legend-dot--a {
  
  fill: #4d86dd;
}
[data-theme="dark"] .cp-legend--a {
  
  fill: #9dc0f4;
}
[data-theme="dark"] .cp-legend--b {
  
  fill: #75d48a;
}
[data-theme="dark"] .cp-radar-shape--a {
  
  fill: rgba(77,134,221,0.18);
  
  stroke: #6b9aed;
}
[data-theme="dark"] .cp-radar-shape--b {
  
  fill: rgba(53,162,76,0.16);
  
  stroke: #59bd70;
}

</style>
