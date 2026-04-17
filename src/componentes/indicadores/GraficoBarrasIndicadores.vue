<!-- Gráfico de barras usado para mostrar os indicadores por país. -->
<template>
  <!-- Área com altura calculada a partir do número de países. -->
  <div class="ind-chart-canvas-wrap" :style="{ height: chartHeight }">
    <Bar
      :key="chartThemeKey"
      :data="chartData"
      :options="chartOptions"
      class="ind-chart-canvas"
      role="img"
      :aria-label="`Gráfico do indicador em ${rows.length} países`"
    />
  </div>
</template>

<script setup>
// Computed, cálculo reativo do Vue, recalcula dados, altura e opções quando mudam as props, os dados recebidos pelo componente.
import { computed } from 'vue'
// Componente Chart.js para gráfico de barras.
import { Bar } from 'vue-chartjs'
// Hook do tema atual para adaptar as cores ao dark mode.
import { usarModoEscuro } from '@/composicoes/usarModoEscuro'
// Tooltip HTML comum: a caixa de detalhe que aparece ao passar o rato nos gráficos Chart.js.
import { createChartTooltip, getChartTooltipColors } from '@/utilitarios/tooltipsGraficos'
// Dados recebidos da página de indicadores.
const props = defineProps({
  // Linhas do indicador selecionado.
  rows: {
    type: Array,
    default: () => [],
  },
  // Unidade de medida apresentada nas caixas de detalhe.
  unit: {
    type: String,
    default: '',
  },
})
const { isDark } = usarModoEscuro()
// Força recriação do canvas, a área desenhada do gráfico, quando muda o tema.
const chartThemeKey = computed(() => (isDark.value ? 'dark' : 'light'))
// Altura dinâmica para evitar barras demasiado comprimidas.
const chartHeight = computed(() => `${Math.max(280, props.rows.length * 56)}px`)
function formatAxisLabel(value) {
  // Abrevia valores grandes no eixo X.
  if (!value) return '0'
  if (value >= 1e6) return `${Math.round(value / 1e6)}M`
  if (value >= 1e3) return `${Math.round(value / 1e3)}k`
  return Math.round(value).toString()
}
// Paleta clara/escura do gráfico.
const themeColors = computed(() =>
  isDark.value
    ? {
        bar: '#5d8fe4',
        grid: 'rgba(210, 223, 242, 0.14)',
        axis: '#afbdd0',
      }
    : {
        bar: 'rgba(0, 36, 95, 0.85)',
        grid: '#eaeff5',
        axis: '#5d646f',
      }
)
// Paleta comum da caixa de detalhe, derivada do tema atual.
const tooltipColors = computed(() => getChartTooltipColors(isDark.value))
// Dados no formato esperado pelo Chart.js.
const chartData = computed(() => ({
  labels: props.rows.map((row) => row.country),
  datasets: [
    {
      label: props.unit || 'Valor',
      data: props.rows.map((row) => row.value),
      backgroundColor: themeColors.value.bar,
      borderRadius: 4,
      borderSkipped: false,
      barThickness: 20,
      maxBarThickness: 20,
    },
  ],
}))
// Opções de orientação horizontal, caixa de detalhe e escalas.
const chartOptions = computed(() => ({
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 650,
    easing: 'easeOutCubic',
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
          label: props.unit || 'Valor',
          value: `${point.parsed.x.toLocaleString('pt-PT')} ${props.unit}`.trim(),
          color: getPointColor(point),
        })),
    }),
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: themeColors.value.grid,
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
        callback(value) {
          return formatAxisLabel(value)
        },
      },
    },
    y: {
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
  },
}))
</script>

<style scoped>
/* Área relativa do canvas, onde o gráfico é desenhado. */
.ind-chart-canvas-wrap {
  position: relative;
  width: 100%;
  overflow: visible;
}
.ind-chart-canvas {
  width: 100%;
  height: 100%;
}
</style>
