<!-- Esta página organiza os acontecimentos do MRR numa linha temporal vertical. -->
<template>
  <div class="lt-page">
    <div class="lt-container">
      <!-- Cabeçalho textual: explica ao utilizador o intervalo histórico que está a consultar. -->
      <div class="page-hero">
        <h1 class="page-hero__title">Linha do Tempo MRR</h1>

        <p class="page-hero__desc">
          Os marcos institucionais do Mecanismo de Recuperação e Resiliência — da proposta legislativa de 2020 ao prazo
          final de execução em agosto de 2026.
        </p>
      </div>
      <!-- Controlos de categoria: filtram os eventos sem mudar de página. -->
      <TimelineControls
        v-model="activeCategory"
        :categories="CATEGORIES"
        :legend="LEGEND"
        @update:modelValue="openEvent = null"
      />
      <!-- Corpo principal: contém a linha central, o marcador da data atual e os cartões dos eventos. -->
      <div class="lt-body" ref="bodyRef">
        <!-- Linha de fundo: representa toda a duração visual do mecanismo até ao ponto final. -->
        <div class="lt-spine" :style="{ bottom: spineBottom + 'px' }" aria-hidden="true">
          <div class="lt-spine__fill" />
        </div>
        <!-- Linha preenchida: mostra apenas a parte do mecanismo que já passou até hoje. -->
        <div class="lt-spine__progress" :style="{ height: progressHeight + 'px' }" aria-hidden="true" />
        <!-- Marcador "Hoje": fica alinhado com o progresso real calculado por data. -->
        <div class="lt-now" :style="{ top: currentMarkerTop + 'px' }" aria-hidden="true">
          <div class="lt-now__dot" />

          <div class="lt-now__label">Hoje · {{ currentDateLabel }}</div>
        </div>
        <!-- Lista animada dos eventos filtrados; alterna cartões à esquerda e à direita da linha. -->
        <TransitionGroup name="lt-event-anim" tag="div" class="lt-events-wrap">
          <div
            v-for="(event, i) in filteredEvents"
            :key="event.id"
            class="lt-event"
            :class="[`lt-event--${i % 2 === 0 ? 'left' : 'right'}`, { 'lt-event--open': openEvent === event.id }]"
            :style="{ '--delay': `${i * 80}ms` }"
            v-scroll-animate
          >
            <!-- Conector curto que liga o cartão ao ponto correspondente na linha vertical. -->
            <div class="lt-event__connector" aria-hidden="true" />
            <!-- Ponto clicável do evento; a cor vem do tipo de acontecimento. -->
            <button
              type="button"
              class="lt-event__dot"
              :style="{ background: EVENT_COLORS[event.type], boxShadow: `0 0 0 4px ${EVENT_COLORS[event.type]}22` }"
              @click="toggle(event.id)"
              :aria-expanded="openEvent === event.id"
              :aria-controls="`lt-event-body-${event.id}`"
              :aria-label="`${openEvent === event.id ? 'Fechar' : 'Abrir'} detalhes: ${event.title}`"
            />
            <!-- Cartão do evento; quando está aberto mostra impacto e países envolvidos. -->
            <article class="lt-card" :class="{ 'lt-card--open': openEvent === event.id }">
              <button
                type="button"
                class="lt-card__head"
                @click="toggle(event.id)"
                :aria-expanded="openEvent === event.id"
                :aria-controls="`lt-event-body-${event.id}`"
              >
                <div class="lt-card__meta">
                  <span class="lt-card__type" :style="typeStyle(event.type)">{{ event.typeLabel }}</span>

                  <time class="lt-card__date">{{ event.date }}</time>
                </div>

                <h3 class="lt-card__title">{{ event.title }}</h3>

                <IconChevronDown
                  :size="14"
                  class="lt-card__chevron"
                  :style="{ transform: openEvent === event.id ? 'rotate(180deg)' : 'rotate(0deg)' }"
                />
              </button>
              <Transition name="lt-expand">
                <div v-if="openEvent === event.id" :id="`lt-event-body-${event.id}`" class="lt-card__body">
                  <p class="lt-card__desc">{{ event.description }}</p>

                  <div v-if="event.impact" class="lt-card__impact">
                    <span class="lt-card__tag-label">Impacto</span>
                    <p>{{ event.impact }}</p>
                  </div>

                  <div v-if="event.countries" class="lt-card__countries">
                    <span class="lt-card__tag-label">Países envolvidos</span>
                    <p>{{ event.countries }}</p>
                  </div>
                </div>
              </Transition>
            </article>
          </div>
        </TransitionGroup>
        <!-- Marco final fixo: assinala o prazo oficial de conclusão do mecanismo. -->
        <div class="lt-end" v-scroll-animate>
          <div class="lt-end__ring" />

          <div ref="endDotRef" class="lt-end__dot" />

          <div class="lt-end__card">
            <div>
              <p class="lt-end__label">Prazo Final</p>

              <p class="lt-end__date">{{ mechanism.finalDateLabel }}</p>

              <p class="lt-end__desc">{{ mechanism.finalDescription }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Cartões de síntese colocados abaixo da linha do tempo. -->
      <TimelineStatsGrid :stats="STATS" />
    </div>
  </div>
</template>

<script setup>
// Imports do Vue usados para estado local, medições do DOM e ciclo de vida.
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
// Componentes filhos que separam filtros e estatísticas da página principal.
import TimelineControls from '@/components/timeline/ControlosLinhaTempo.vue'
import TimelineStatsGrid from '@/components/timeline/GrelhaEstatisticasLinhaTempo.vue'
// Composable, função reutilizável do Vue, que carrega o recurso pelo json-server, a API local usada para simular dados.
import { usarRecursoApi } from '@/composables/usarRecursoApi'
// Categoria ativa nos filtros; começa em "todos" para mostrar a cronologia completa.
const activeCategory = ref('todos')
// Guarda o id do evento aberto para permitir expandir/fechar apenas um cartão de cada vez.
const openEvent = ref(null)
// Referência ao corpo da timeline, necessária para medir a altura visual disponível.
const bodyRef = ref(null)
// Referência ao ponto final, usada para fazer a linha terminar exatamente na bolinha final.
const endDotRef = ref(null)
// Altura da parte preenchida da linha, calculada a partir da data atual.
const progressHeight = ref(0)
// Distância inferior da linha de fundo, para não ultrapassar o último ponto.
const spineBottom = ref(0)
// Data corrente do browser, usada para posicionar o marcador "Hoje".
const TODAY = new Date()
// Recurso reativo da linha do tempo.
const resource = usarRecursoApi('timeline')
// Observador usado para recalcular a linha quando a altura da timeline muda.
let bodyObserver = null
function toggle(id) {
  // Clicar no mesmo evento fecha-o; clicar noutro troca o cartão aberto.
  openEvent.value = openEvent.value === id ? null : id
}
function typeStyle(type) {
  // Estilo inline das pills, para manter cor, rebordo e fundo coerentes com a legenda.
  const c = EVENT_COLORS.value[type] ?? '#1d4587'
  return { color: c, borderColor: c + '33', background: c + '0d' }
}
// Configuração temporal ativa do mecanismo.
const mechanism = computed(() => resource.value.mechanism)
// Meses abreviados em português para a etiqueta visual do marcador atual.
const SHORT_MONTHS = computed(() => resource.value.shortMonths ?? [])
// Texto apresentado junto da bolinha vermelha da data atual.
const currentDateLabel = computed(
  () => `${TODAY.getDate()} ${SHORT_MONTHS.value[TODAY.getMonth()]} ${TODAY.getFullYear()}`
)
// Categorias disponíveis no filtro superior.
const CATEGORIES = computed(() => resource.value.categories ?? [])
// Legenda visual associada às mesmas categorias do filtro.
const LEGEND = computed(() => resource.value.legend ?? [])
// Cores oficiais da página para cada tipo de evento.
const EVENT_COLORS = computed(() => Object.fromEntries(LEGEND.value.map((item) => [item.key, item.color])))
// Eventos carregados do recurso ativo.
const EVENTS = computed(() => resource.value.events)
// Aplica o filtro de categoria sem alterar a estrutura original dos dados.
const filteredEvents = computed(() =>
  activeCategory.value === 'todos' ? EVENTS.value : EVENTS.value.filter((event) => event.type === activeCategory.value)
)
// Estatísticas apresentadas nos cartões inferiores.
const STATS = computed(() => resource.value.stats)
function clamp(value, min, max) {
  // Garante que um valor fica sempre dentro dos limites aceites.
  return Math.min(Math.max(value, min), max)
}
function getTimelineProgressRatio() {
  // Calcula a percentagem temporal já decorrida entre o início e o fim do MRR.
  const now = Date.now()
  const start = Date.parse(mechanism.value.start)
  const end = Date.parse(mechanism.value.end)
  const elapsed = now - start
  const total = end - start
  if (total <= 0) return 0
  return clamp(elapsed / total, 0, 1)
}
const currentMarkerTop = computed(() => Math.max(progressHeight.value, 0))
function measureTimeline() {
  // Mede posições reais no ecrã para a linha acabar na bolinha final, não no fim da área.
  if (!bodyRef.value || !endDotRef.value) return
  const bodyRect = bodyRef.value.getBoundingClientRect()
  const dotRect = endDotRef.value.getBoundingClientRect()
  const bodyHeight = bodyRef.value.offsetHeight
  const dotCenter = dotRect.top - bodyRect.top + dotRect.height / 2
  const visibleSpineHeight = Math.max(Math.round(dotCenter), 0)
  spineBottom.value = Math.max(bodyHeight - visibleSpineHeight, 0)
  progressHeight.value = Math.round(visibleSpineHeight * getTimelineProgressRatio())
}
async function syncTimeline() {
  // Espera pelo DOM atualizado antes de medir novamente alturas e posições.
  await nextTick()
  measureTimeline()
}
watch(
  [filteredEvents, openEvent],
  () => {
    // Filtros e cartões abertos alteram alturas; por isso a linha tem de ser recalculada.
    syncTimeline()
  },
  { flush: 'post' }
)
onMounted(async () => {
  // Primeiro cálculo depois de o HTML da página estar montado.
  await nextTick()
  if (bodyRef.value) {
    // O ResizeObserver cobre alterações de altura provocadas por textos, filtros e responsividade.
    bodyObserver = new ResizeObserver(() => {
      measureTimeline()
    })
    bodyObserver.observe(bodyRef.value)
  }
  window.addEventListener('resize', measureTimeline)
  setTimeout(() => {
    measureTimeline()
  }, 120)
})
onBeforeUnmount(() => {
  // Limpeza dos listeners para evitar medições em páginas que já foram desmontadas.
  window.removeEventListener('resize', measureTimeline)
  bodyObserver?.disconnect()
})
</script>

<style scoped>
/* Estrutura geral da página e largura máxima usada no resto do site. */
.lt-page {
  background: var(--color-bg-page);
  min-height: 100vh;
  padding-bottom: 80px;
}

.lt-container {
  max-width: 1520px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
/* Área relativa que permite posicionar linha central, progresso e cartões sobre o mesmo eixo. */
.lt-body {
  position: relative;
  margin: 0 32px 48px;

  padding: 8px 0 48px;
}
/* Linha central completa, limitada por JS para não passar a bolinha final. */
.lt-spine {
  position: absolute;
  top: 0;
  bottom: 0;

  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  z-index: 0;
}
.lt-spine__fill {
  width: 100%;
  height: 100%;

  background: linear-gradient(to bottom, var(--color-border) 0%, var(--color-border) 100%);
  border-radius: 1px;
}
/* Segmento colorido que representa a passagem do tempo até à data atual. */
.lt-spine__progress {
  position: absolute;
  top: 0;

  left: 50%;
  transform: translateX(-50%);
  width: 2px;

  background: linear-gradient(to bottom, #6366f1, #1d4587, #d97706, #dc2626);
  border-radius: 1px;

  transition: height 2.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
  z-index: 1;

  pointer-events: none;
}
/* Marcador absoluto da data de hoje. */
.lt-now {
  position: absolute;
  left: 50%;

  transform: translate(-50%, -50%);
  z-index: 3;
  pointer-events: none;

  transition: top 2.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
}
.lt-now__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;

  border: 2px solid var(--color-bg-white);
  background: #dc2626;
  box-shadow:
    0 0 0 4px rgba(220, 38, 38, 0.16),
    0 6px 14px rgba(220, 38, 38, 0.14);
}
.lt-now__label {
  position: absolute;
  top: 50%;
  right: 18px;

  transform: translateY(-50%);

  display: inline-flex;
  align-items: center;
  height: 24px;

  padding: 0 10px;

  border-radius: var(--radius-full);

  background: var(--color-bg-white);

  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  box-shadow: 0 6px 18px rgba(9, 14, 24, 0.06);
}

.lt-events-wrap {
  position: relative;
  z-index: 2;
}
.lt-event {
  position: relative;

  display: flex;
  margin-bottom: 28px;
}
.lt-event--left {
  justify-content: flex-end;

  padding-right: calc(50% + 28px);
}
.lt-event--right {
  justify-content: flex-start;

  padding-left: calc(50% + 28px);
}
.lt-event__dot {
  position: absolute;
  top: 18px;

  left: 50%;
  transform: translateX(-50%);

  width: 14px;
  height: 14px;
  border-radius: 50%;

  border: 2.5px solid white;
  cursor: pointer;
  z-index: 3;

  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.2s;
  outline: none;
}
.lt-event__dot:hover,
.lt-event--open .lt-event__dot {
  transform: translateX(-50%) scale(1.35);
}
.lt-event__connector {
  position: absolute;
  top: 24px;
  height: 1px;

  background: var(--color-border);
  z-index: 1;
}

.lt-event--left .lt-event__connector {
  left: calc(50% + 7px);
  right: calc(50% - 28px + 100%);
  width: 20px;
}

.lt-event--right .lt-event__connector {
  right: calc(50% + 7px);
  left: calc(50% + 7px);
  width: 20px;
}
.lt-card {
  width: 100%;

  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;

  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.lt-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);

  border-color: rgba(29, 69, 135, 0.18);

  transform: translateY(-2px);
}
.lt-card--open {
  box-shadow: 0 6px 24px rgba(29, 69, 135, 0.1);

  border-color: rgba(29, 69, 135, 0.22);
}
.lt-card__head {
  width: 100%;
  padding: 16px 18px 14px;
  position: relative;
  display: block;
  text-align: left;
  color: inherit;
}
.lt-card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 7px;
}
.lt-card__type {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;

  border: 1px solid;
  border-radius: var(--radius-full);

  padding: 2px 9px;
  text-transform: uppercase;
  white-space: nowrap;
}

.lt-card__date {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
.lt-card__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);

  line-height: 1.4;
  padding-right: 20px;
}
.lt-card__chevron {
  position: absolute;
  top: 18px;
  right: 14px;
  color: var(--color-text-secondary);

  transition:
    transform 0.25s ease,
    color 0.15s;
  flex-shrink: 0;
}

.lt-card--open .lt-card__chevron {
  color: var(--color-brand-blue);
}
.lt-card__body {
  padding: 0 18px 16px;

  border-top: 1px solid var(--color-border);

  display: flex;
  flex-direction: column;
  gap: 10px;
}
.lt-card__desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);

  line-height: 1.65;
  margin: 12px 0 0;
}
.lt-card__impact,
.lt-card__countries {
  background: rgba(29, 69, 135, 0.04);

  border-left: 3px solid var(--color-brand-blue);

  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;

  padding: 9px 12px;
}
.lt-card__tag-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: var(--color-brand-blue);

  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.lt-card__impact p,
.lt-card__countries p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
}

.lt-expand-enter-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.lt-expand-leave-active {
  transition: all 0.2s ease;
}

.lt-expand-enter-from,
.lt-expand-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.lt-event-anim-enter-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.lt-event-anim-leave-active {
  transition: all 0.2s ease;
  position: absolute;
}

.lt-event-anim-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.lt-event-anim-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.lt-event-anim-move {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.lt-end {
  --lt-end-translate: -50%;
  position: relative;

  display: flex;
  justify-content: flex-start;

  padding: 16px 0 0 calc(50% + 28px);
  z-index: 4; /* acima do eixo central */
}
.lt-end__dot {
  position: absolute;
  top: 8px;
  left: 50%;

  transform: translateX(var(--lt-end-translate));

  width: 18px;
  height: 18px;
  border-radius: 50%;

  background: white;
  border: 3px solid #d97706;
  z-index: 3;

  animation: endPulse 3s ease-in-out infinite;
}
.lt-end__ring {
  position: absolute;
  top: 0px;
  left: 50%;

  transform: translateX(var(--lt-end-translate));

  width: 34px;
  height: 34px;
  border-radius: 50%;

  background: rgba(217, 119, 6, 0.12);
  z-index: 2;

  animation: endRingPulse 3s ease-in-out infinite;
}
@keyframes endPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.18);
    transform: translateX(var(--lt-end-translate)) scale(1);
  }

  50% {
    box-shadow: 0 0 0 5px rgba(217, 119, 6, 0);
    transform: translateX(var(--lt-end-translate)) scale(1.04);
  }
}
@keyframes endRingPulse {
  0%,
  100% {
    transform: translateX(var(--lt-end-translate)) scale(1);
    opacity: 0.28;
  }

  50% {
    transform: translateX(var(--lt-end-translate)) scale(1.14);
    opacity: 0.08;
  }
}
.lt-end__card {
  width: calc(50% - 28px);

  display: flex;
  align-items: flex-start;

  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);

  padding: 20px 22px;
  max-width: none;
  text-align: left;
  margin-top: 26px;

  box-shadow: 0 8px 22px rgba(9, 14, 24, 0.06);
}
.lt-end__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 22px;
  padding: 0 10px;

  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.35px;

  text-transform: uppercase;
  color: #d97706;

  background: rgba(217, 119, 6, 0.08);

  border: 1px solid rgba(217, 119, 6, 0.18);

  border-radius: var(--radius-full);
  margin-bottom: 10px;
}

.lt-end__date {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.lt-end__desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 900px) {
  .lt-event--left,
  .lt-event--right {
    padding-left: 32px;
    padding-right: 0;

    justify-content: flex-start;
  }

  .lt-event__dot {
    left: 7px;
    transform: none;
  }

  .lt-event__dot:hover,
  .lt-event--open .lt-event__dot {
    transform: scale(1.35);
  }

  .lt-event__connector {
    display: none;
  }

  .lt-spine,
  .lt-spine__progress {
    left: 14px;
    transform: none;
  }

  .lt-now {
    left: 14px;
    transform: translateY(-50%);
  }

  .lt-now__label {
    left: 20px;
    right: auto;
  }

  .lt-end {
    --lt-end-translate: 0;
    justify-content: flex-start;
    padding-left: 32px;
  }

  .lt-end__dot {
    left: 5px;
  }

  .lt-end__ring {
    left: -3px;
  }

  .lt-end__card {
    width: 100%;
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .lt-body {
    margin-left: 0;
    margin-right: 0;
  }

  .lt-container {
    padding: 0 20px;
  }
}
</style>
