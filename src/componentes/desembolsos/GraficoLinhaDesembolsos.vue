<!-- Gráfico principal dos pagamentos ao longo do tempo. -->
<template>
  <!-- Área do gráfico com altura fixa para o canvas, onde o Chart.js desenha a linha. -->
  <div class="des-chart-canvas-wrap">
    <Line
      :key="chartThemeKey"
      :data="chartData"
      :options="chartOptions"
      class="des-chart-canvas"
      role="img"
      aria-label="Gráfico de linha com a evolução acumulada dos desembolsos"
    />
  </div>
</template>

<script setup>
// Computed, cálculo reativo do Vue, recalcula dados e opções quando mudam as props, os dados recebidos pelo componente.
import { computed } from 'vue'
// Componente Vue do gráfico de linhas.
import { Line } from 'vue-chartjs'
// Hook interno que expõe o tema claro/escuro atual.
import { usarModoEscuro } from '@/composicoes/usarModoEscuro'
// Tooltip HTML comum: a caixa de detalhe que aparece ao passar o rato nos gráficos Chart.js.
import { createChartTooltip, getChartTooltipColors } from '@/utilitarios/tooltipsGraficos'
// Pontos da série cumulativa recebidos da página de desembolsos.
const props = defineProps({
  points: {
    type: Array,
    default: () => [],
  },
})
// Formatador português usado nos eixos e nas caixas de detalhe.
const BILLION_FORMATTER = new Intl.NumberFormat('pt-PT', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
})
const { isDark } = usarModoEscuro()
// Recria o gráfico quando o tema muda, garantindo que o canvas, a zona desenhada do gráfico, recebe as novas cores.
const chartThemeKey = computed(() => (isDark.value ? 'dark' : 'light'))
function formatBillionAmount(value) {
  // Converte valores numéricos para a mesma unidade apresentada no resto da página.
  return `${BILLION_FORMATTER.format(value)} mil M`
}
function measureTextWidth(text) {
  // Em ambiente sem DOM, usa uma aproximação simples baseada no número de caracteres.
  if (typeof document === 'undefined') return text.length * 6
  // Reutiliza um canvas temporário, uma área de desenho invisível, para medir a largura real do texto do eixo.
  const canvas = measureTextWidth.canvas ?? (measureTextWidth.canvas = document.createElement('canvas'))
  // Obtém o contexto 2D necessário para medir texto.
  const context = canvas.getContext('2d')
  // Se o contexto não existir, recorre à aproximação simples.
  if (!context) return text.length * 6
  // Replica a tipografia usada nos ticks do gráfico.
  context.font = '400 11px Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'
  // Devolve a largura medida em píxeis.
  return context.measureText(text).width
}
// Escala dinâmica do eixo Y: Portugal usa 0-12, a vista agregada usa intervalos maiores.
const yScale = computed(() => {
  // Procura o maior valor acumulado recebido pelo gráfico.
  const maxValue = Math.max(0, ...props.points.map((point) => point.v))

  // Para países pequenos, mantém exatamente a escala do node do Figma: 0, 3, 6, 9, 12.
  if (maxValue <= 12) {
    return { max: 12, stepSize: 3, maxTicksLimit: 6 }
  }

  // Para valores médios e agregados, usa saltos de 15 mil M para evitar labels colados.
  const stepSize = 15

  // Arredonda o topo da escala para o múltiplo de 15 seguinte.
  const max = Math.ceil(maxValue / stepSize) * stepSize

  // Devolve a escala usada diretamente nas opções do Chart.js.
  return { max, stepSize, maxTicksLimit: Math.floor(max / stepSize) + 1 }
})
// Labels reais que o eixo Y irá mostrar no gráfico atual.
const yAxisLabels = computed(() => {
  const labels = []
  for (let value = 0; value <= yScale.value.max; value += yScale.value.stepSize) {
    labels.push(formatBillionAmount(value))
  }
  return labels
})
// Reserva horizontal do eixo Y calculada a partir do texto real, como no Figma.
const yAxisWidth = computed(() => {
  const longestLabel = yAxisLabels.value.reduce((max, label) => Math.max(max, measureTextWidth(label)), 0)
  return Math.ceil(longestLabel + 20)
})
// Espaço entre os labels do eixo Y e a área útil do gráfico.
const yAxisTickPadding = computed(() => 8)
// Paleta do gráfico para modo claro e modo escuro.
const themeColors = computed(() =>
  isDark.value
    ? {
        line: '#5d8fe4',
        pointFill: '#edf4fc',
        pointStroke: '#5d8fe4',
        area: 'rgba(93, 143, 228, 0.18)',
        grid: 'rgba(210, 223, 242, 0.16)',
        axis: '#afbdd0',
      }
    : {
        line: 'rgba(20, 62, 130, 0.9)',
        pointFill: '#ffffff',
        pointStroke: 'rgba(20, 62, 130, 0.9)',
        area: 'rgba(29, 69, 135, 0.14)',
        grid: '#eaeff5',
        axis: '#5d646f',
      }
)
// Paleta comum da caixa de detalhe, derivada do tema atual.
const tooltipColors = computed(() => getChartTooltipColors(isDark.value))
// Dados no formato esperado pelo Chart.js.
const chartData = computed(() => ({
  labels: props.points.map((point) => point.d),
  datasets: [
    {
      label: 'Pagamentos acumulados',
      data: props.points.map((point) => point.v),
      borderColor: themeColors.value.line,
      backgroundColor: themeColors.value.area,
      fill: true,
      tension: 0.32,
      borderWidth: 1.8,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointBorderWidth: 2,
      pointHoverBorderWidth: 2,
      pointBackgroundColor: themeColors.value.pointFill,
      pointBorderColor: themeColors.value.pointStroke,
      pointHoverBackgroundColor: themeColors.value.pointFill,
      pointHoverBorderColor: themeColors.value.pointStroke,
      clip: false,
    },
  ],
}))
// Opções visuais, animação, caixa de detalhe e escalas do gráfico.
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 850,
    easing: 'easeOutCubic',
  },
  layout: {
    padding: {
      left: 0,
      right: 6,
      top: 8,
      bottom: 0,
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
          label: 'Total acumulado',
          value: `${formatBillionAmount(point.parsed.y)} EUR`,
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
      max: yScale.value.max,
      afterFit(scale) {
        // Reserva largura fixa para os labels do Y e afasta a grelha, como no Figma.
        scale.width = yAxisWidth.value
      },
      ticks: {
        stepSize: yScale.value.stepSize,
        maxTicksLimit: yScale.value.maxTicksLimit,
        padding: yAxisTickPadding.value,
        color: themeColors.value.axis,
        font: {
          family: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
          size: 11,
        },
        callback(value) {
          return formatBillionAmount(value)
        },
      },
      grid: {
        color: themeColors.value.grid,
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
/* Área que mantém o gráfico com a altura esperada no layout. */
.des-chart-canvas-wrap {
  /* Permite ao Chart.js posicionar a zona desenhada do gráfico dentro deste bloco. */
  position: relative;
  /* Faz o gráfico ocupar toda a largura do card. */
  width: 100%;
  /* No Figma, o desenho vetorial de referência do gráfico tem 280px de altura. */
  height: 280px;
  /* Permite que a caixa de detalhe apareça fora da área exata do gráfico. */
  overflow: visible;
}
.des-chart-canvas {
  /* A zona desenhada do gráfico acompanha a largura do bloco. */
  width: 100%;
  /* A zona desenhada do gráfico fica limitada à altura fixa definida acima. */
  height: 100%;
}
</style>
