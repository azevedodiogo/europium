// Escapa caracteres especiais para impedir que texto dos dados seja interpretado como HTML.
export function escapeHtml(value) {
  // Converte qualquer valor recebido para texto antes de aplicar as substituições.
  return String(value ?? '')
    // Substitui o símbolo `&`, que poderia iniciar entidades HTML.
    .replaceAll('&', '&amp;')
    // Substitui o sinal menor, evitando abertura de tags.
    .replaceAll('<', '&lt;')
    // Substitui o sinal maior, evitando fecho de tags.
    .replaceAll('>', '&gt;')
    // Substitui aspas duplas usadas em atributos HTML.
    .replaceAll('"', '&quot;')
    // Substitui aspas simples usadas em atributos HTML.
    .replaceAll("'", '&#039;')
}

// Paleta comum dos tooltips em modo claro e modo escuro.
export function getChartTooltipColors(isDark) {
  // Escolhe cores suaves quando a aplicação está em dark mode.
  if (isDark) {
    // Devolve todas as variáveis necessárias ao cartão do tooltip.
    return {
      // Fundo translúcido do cartão.
      bg: 'rgba(28, 28, 30, 0.88)',
      // Texto principal.
      text: 'rgba(255, 255, 255, 0.94)',
      // Texto secundário.
      muted: 'rgba(235, 235, 245, 0.62)',
      // Linha de contorno do cartão.
      border: 'rgba(255, 255, 255, 0.08)',
      // Sombra do cartão.
      shadow: 'rgba(0, 0, 0, 0.18)',
    }
  }
  // Devolve uma versão clara, mais limpa do que o tooltip preto nativo.
  return {
    // Fundo quase branco com ligeira transparência.
    bg: 'rgba(255, 255, 255, 0.9)',
    // Texto principal escuro.
    text: '#1d1d1f',
    // Texto secundário.
    muted: 'rgba(60, 60, 67, 0.72)',
    // Contorno subtil.
    border: 'rgba(17, 17, 17, 0.06)',
    // Sombra leve para destacar sem pesar.
    shadow: 'rgba(15, 23, 42, 0.1)',
  }
}

// Procura o elemento HTML do tooltip ou cria-o se ainda não existir.
function getTooltipElement(chart) {
  // Usa o contentor direto do canvas para posicionar o tooltip relativamente ao gráfico.
  const wrapper = chart.canvas.parentNode
  // Tenta reutilizar o tooltip já existente para evitar recriar nós a cada movimento do rato.
  let tooltipElement = wrapper.querySelector('.grafico-tooltip')
  // Cria o tooltip apenas na primeira interação.
  if (!tooltipElement) {
    // Cria um elemento `div` normal para ter controlo total sobre o visual.
    tooltipElement = document.createElement('div')
    // Aplica a classe global usada por todos os gráficos.
    tooltipElement.className = 'grafico-tooltip'
    // Esconde o tooltip dos leitores de ecrã porque o gráfico já tem descrição acessível.
    tooltipElement.setAttribute('aria-hidden', 'true')
    // Coloca o tooltip dentro do wrapper para respeitar a posição do gráfico.
    wrapper.appendChild(tooltipElement)
  }
  // Devolve o elemento pronto a atualizar.
  return tooltipElement
}

// Extrai a cor visual associada a uma série do Chart.js.
function getPointColor(point) {
  // Dá prioridade à cor de fundo, usada nos gráficos de barras.
  const backgroundColor = Array.isArray(point.dataset.backgroundColor)
    ? point.dataset.backgroundColor[point.dataIndex]
    : point.dataset.backgroundColor
  // Usa a cor da linha como alternativa, usada no gráfico de desembolsos.
  const borderColor = Array.isArray(point.dataset.borderColor)
    ? point.dataset.borderColor[point.dataIndex]
    : point.dataset.borderColor
  // Devolve a primeira cor válida ou uma cor de marca como fallback.
  return backgroundColor || borderColor || '#1d4587'
}

// Transforma uma linha de dados do tooltip em HTML.
function renderTooltipRow(row) {
  // Escapa a cor para impedir valores inválidos vindos de dados externos.
  const color = escapeHtml(row.color)
  // Escapa a etiqueta principal.
  const label = escapeHtml(row.label)
  // Escapa o valor numérico/textual.
  const value = escapeHtml(row.value)
  // Só mostra detalhe quando foi passado, por exemplo "mín. 37%".
  const detail = row.detail
    ? `<span class="grafico-tooltip__meta">· ${escapeHtml(row.detail)}</span>`
    : ''
  // Devolve uma linha consistente para todos os gráficos.
  return `
    <div class="grafico-tooltip__row">
      <span class="grafico-tooltip__dot" style="background:${color}"></span>
      <span class="grafico-tooltip__copy">
        <span class="grafico-tooltip__label">${label}</span>${detail}
      </span>
      <strong class="grafico-tooltip__value">${value}</strong>
    </div>
  `
}

// Aplica cores e posicionamento ao tooltip HTML.
function positionTooltip({ chart, tooltip, tooltipElement, colors }) {
  // Guarda a largura real para impedir que o tooltip fique cortado nas laterais.
  const tooltipWidth = tooltipElement.offsetWidth || 220
  // Guarda a altura real para decidir se aparece acima ou abaixo do ponto.
  const tooltipHeight = tooltipElement.offsetHeight || 96
  // Mede a largura do canvas para calcular limites internos.
  const chartWidth = chart.canvas.offsetWidth
  // Garante uma margem mínima à esquerda.
  const minX = Math.min((tooltipWidth / 2) + 8, chartWidth / 2)
  // Garante uma margem mínima à direita.
  const maxX = Math.max(chartWidth - (tooltipWidth / 2) - 8, minX)
  // Limita o X ao espaço disponível no gráfico.
  const safeX = Math.min(Math.max(tooltip.caretX, minX), maxX)
  // Mostra por baixo quando não existe espaço suficiente por cima.
  const showBelow = tooltip.caretY < tooltipHeight + 18
  // Define uma variável CSS para o fundo.
  tooltipElement.style.setProperty('--grafico-tooltip-bg', colors.bg)
  // Define uma variável CSS para o texto principal.
  tooltipElement.style.setProperty('--grafico-tooltip-text', colors.text)
  // Define uma variável CSS para texto secundário.
  tooltipElement.style.setProperty('--grafico-tooltip-muted', colors.muted)
  // Define uma variável CSS para o contorno.
  tooltipElement.style.setProperty('--grafico-tooltip-border', colors.border)
  // Define uma variável CSS para a sombra.
  tooltipElement.style.setProperty('--grafico-tooltip-shadow', colors.shadow)
  // Guarda a posição para o CSS ajustar a direção da animação.
  tooltipElement.dataset.placement = showBelow ? 'bottom' : 'top'
  // Posiciona horizontalmente o tooltip.
  tooltipElement.style.left = `${safeX}px`
  // Posiciona verticalmente o tooltip acima ou abaixo do ponto ativo.
  tooltipElement.style.top = `${showBelow ? tooltip.caretY + 18 : tooltip.caretY - 14}px`
  // Torna o tooltip visível.
  tooltipElement.style.opacity = '1'
}

// Cria uma configuração de tooltip externo para Chart.js com visual comum.
export function createChartTooltip({ colors, getTitle, getRows }) {
  // Devolve o objeto esperado por `plugins.tooltip`.
  return {
    // Desativa o tooltip nativo para usar o HTML personalizado.
    enabled: false,
    // Função chamada pelo Chart.js sempre que muda o ponto ativo.
    external(context) {
      // Obtém o gráfico e o estado atual do tooltip.
      const { chart, tooltip } = context
      // Obtém ou cria o elemento HTML do tooltip.
      const tooltipElement = getTooltipElement(chart)
      // Esconde o tooltip quando o Chart.js indica opacidade zero.
      if (tooltip.opacity === 0) {
        // Aplica a opacidade zero mantendo o elemento disponível para reutilização.
        tooltipElement.style.opacity = '0'
        // Termina para não recalcular conteúdo nem posição.
        return
      }
      // Recolhe os pontos ativos enviados pelo Chart.js.
      const points = tooltip.dataPoints ?? []
      // Calcula o título com a função específica de cada gráfico.
      const title = escapeHtml(getTitle?.(context) ?? tooltip.title?.[0] ?? '')
      // Calcula as linhas com a função específica de cada gráfico.
      const rows = getRows
        ? getRows(context, getPointColor)
        : points.map((point) => ({
            label: point.dataset.label,
            value: point.formattedValue,
            color: getPointColor(point),
          }))
      // Escreve a estrutura HTML comum.
      tooltipElement.innerHTML = `
        <div class="grafico-tooltip__title">${title}</div>
        <div class="grafico-tooltip__rows">${rows.map(renderTooltipRow).join('')}</div>
      `
      // Posiciona o cartão depois de escrever o HTML, porque agora já existe largura real.
      positionTooltip({ chart, tooltip, tooltipElement, colors })
    },
  }
}
