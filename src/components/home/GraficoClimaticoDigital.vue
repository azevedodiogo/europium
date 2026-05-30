<!-- Gráfico que cruza o objetivo climático com o digital. -->
<template>
  <!-- Este bloco organiza o canvas, onde o gráfico é desenhado, e a legenda manual numa coluna. -->
  <div class="chart-wrapper">
    <!-- Área do gráfico; a altura mínima evita que o Chart.js fique sem espaço para desenhar. -->
    <div class="chart-canvas-wrap">
      <Bar
        :key="chartThemeKey"
        :data="chartData"
        :options="chartOptions"
        class="chart-canvas"
        role="img"
        :aria-label="ariaLabel"
      />
    </div>
    <!-- Legenda própria para manter o aspeto consistente com o design do site. -->
    <div class="chart-legend" aria-hidden="true">
      <span class="chart-legend__item chart-legend__item--climate">
        <span class="chart-legend__dot" />
        Climático (min. 37%)
      </span>

      <span class="chart-legend__item chart-legend__item--digital">
        <span class="chart-legend__dot" />
        Digital (min. 20%)
      </span>
    </div>
  </div>
</template>

<script setup>
// Cálculos reativos para dados e opções do Chart.js.
import { computed } from 'vue'
// Componente Vue do gráfico de barras.
import { Bar } from 'vue-chartjs'
// Dados vindos da store principal.
import { useDashboardStore } from '@/stores/painel'
import { storeToRefs } from 'pinia'
// Tema atual usado para trocar cores no gráfico.
import { usarModoEscuro } from '@/composables/usarModoEscuro'
// Tooltip HTML comum: a caixa de detalhe que aparece ao passar o rato nos gráficos Chart.js.
import { createChartTooltip, getChartTooltipColors } from '@/utils/tooltipsGraficos'
const store = useDashboardStore()
const { climateDigitalData: data } = storeToRefs(store)
const { isDark } = usarModoEscuro()
// Descrição acessível para leitores de ecrã.
const ariaLabel = 'Gráfico de barras: percentagem climática e digital por país'
// Força recriação do gráfico quando o tema muda, evitando cores antigas na área desenhada.
const chartThemeKey = computed(() => (isDark.value ? 'dark' : 'light'))
// Paleta completa do gráfico para tema claro e escuro.
const themeColors = computed(() =>
  isDark.value
    ? {
        climate: '#35a24c',
        digital: '#4d86dd',
        grid: 'rgba(210, 223, 242, 0.18)',
        axis: '#afbdd0',
      }
    : {
        climate: '#2f9842',
        digital: 'rgba(20, 62, 130, 0.92)',
        grid: '#d9dfe5',
        axis: '#5d646f',
      }
)
// Paleta comum da caixa de detalhe, derivada do tema atual.
const tooltipColors = computed(() => getChartTooltipColors(isDark.value))
// Devolve o valor mínimo associado a cada tipo de objetivo.
const getMinimumLabel = (label) => (label === 'Climático' ? 'mín. 37%' : 'mín. 20%')
// Estrutura de dados esperada pelo Chart.js.
const chartData = computed(() => ({
  labels: data.value.map((item) => item.code),
  datasets: [
    {
      label: 'Climático',
      data: data.value.map((item) => item.climate),
      backgroundColor: themeColors.value.climate,
      borderRadius: 3,
      borderSkipped: false,
      categoryPercentage: 0.66,
      barPercentage: 0.86,
    },
    {
      label: 'Digital',
      data: data.value.map((item) => item.digital),
      backgroundColor: themeColors.value.digital,
      borderRadius: 3,
      borderSkipped: false,
      categoryPercentage: 0.66,
      barPercentage: 0.86,
    },
  ],
}))
// Opções visuais e de interação do gráfico.
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 700,
    easing: 'easeOutCubic',
  },
  layout: {
    padding: {
      top: 8,
      right: 4,
      bottom: 0,
      left: 0,
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: createChartTooltip({
      colors: tooltipColors.value,
      getTitle: ({ tooltip }) => tooltip.title?.[0] ?? '',
      getRows: ({ tooltip }, getPointColor) =>
        (tooltip.dataPoints ?? []).map((point) => ({
          label: point.dataset.label,
          value: `${point.parsed.y}%`,
          detail: getMinimumLabel(point.dataset.label),
          color: getPointColor(point),
        })),
    }),
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: themeColors.value.axis,
        font: {
          family: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
          size: 11,
        },
      },
    },
    y: {
      beginAtZero: true,
      max: 80,
      ticks: {
        stepSize: 10,
        color: themeColors.value.axis,
        font: {
          family: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
          size: 11,
        },
        callback(value) {
          return [0, 20, 40, 70].includes(Number(value)) ? `${value}%` : ''
        },
      },
      grid: {
        color(context) {
          return [0, 20, 40, 70].includes(Number(context.tick.value)) ? themeColors.value.grid : 'transparent'
        },
        borderDash: [4, 3],
        drawTicks: false,
      },
      border: {
        display: false,
      },
    },
  },
}))
</script>

<style scoped>
/* Estrutura vertical do gráfico e da legenda. */
.chart-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  height: 100%;
}
/* Área com altura mínima para o canvas, onde o gráfico é desenhado. */
.chart-canvas-wrap {
  position: relative;
  flex: 1;
  min-height: 280px;
  overflow: visible;
}
.chart-canvas {
  width: 100%;
  height: 100%;
}
/* Legenda manual. */
.chart-legend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
}
.chart-legend__item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-xs);
  font-weight: 400;
}
.chart-legend__dot {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  flex-shrink: 0;
}
.chart-legend__item--climate {
  color: var(--color-green);
}

.chart-legend__item--climate .chart-legend__dot {
  background: var(--color-green);
}
.chart-legend__item--digital {
  color: var(--color-navy);
}

.chart-legend__item--digital .chart-legend__dot {
  background: var(--color-navy);
}
[data-theme='dark'] .chart-legend__item--climate {
  color: #6ad281;
}
[data-theme='dark'] .chart-legend__item--climate .chart-legend__dot {
  background: #35a24c;
}
[data-theme='dark'] .chart-legend__item--digital {
  color: #9dc0f4;
}
[data-theme='dark'] .chart-legend__item--digital .chart-legend__dot {
  background: #4d86dd;
}
</style>
