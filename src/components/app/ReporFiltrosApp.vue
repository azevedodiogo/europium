<!--
  Botão para repor filtros.
  Pede confirmação no segundo clique para evitar resets acidentais.
-->
<template>
  <!-- Área relativa para o botão e o tooltip, a pequena caixa de confirmação. -->
  <div class="rf" ref="rootEl">
    <!-- Primeiro clique pede confirmação; segundo clique emite `reset`. -->
    <button type="button" class="rf__btn" :class="{ 'rf__btn--confirming': confirming }" @click="handleClick">
      <IconRefresh :size="14" class="rf__icon" />
      <span>{{ confirming ? '⚠️ Confirmar' : 'Repor' }}</span>
    </button>
    <!-- Tooltip visível apenas durante o estado de confirmação. -->
    <Transition name="rf-tip">
      <div v-if="confirming" class="rf__tooltip" role="tooltip">
        <IconInfoCircle :size="13" class="rf__tooltip-icon" />
        Todos os filtros serão repostos
      </div>
    </Transition>
  </div>
</template>

<script setup>
// Estado local do botão e ciclo de vida para detetar clique fora.
import { ref, onMounted, onUnmounted } from 'vue'

// Evento emitido para o componente pai fazer o reset real.
const emit = defineEmits(['reset'])

// Controla se o botão está à espera de confirmação.
const confirming = ref(false)
// Referência ao elemento raiz.
const rootEl = ref(null)

// No primeiro clique pede confirmação; no segundo executa o reset.
function handleClick() {
  if (confirming.value) {
    emit('reset')
    confirming.value = false
  } else confirming.value = true
}

// Fecha a confirmação quando o utilizador clica fora.
function handleOutside(e) {
  if (rootEl.value && !rootEl.value.contains(e.target)) confirming.value = false
}

// Tecla Escape também cancela a confirmação.
function handleKey(e) {
  if (e.key === 'Escape') confirming.value = false
}

// Regista listeners globais quando o componente entra no DOM.
onMounted(() => {
  document.addEventListener('mousedown', handleOutside)
  document.addEventListener('keydown', handleKey)
})

// Remove listeners quando o componente sai do DOM.
onUnmounted(() => {
  document.removeEventListener('mousedown', handleOutside)
  document.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>
.rf {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.rf__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px;

  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-family: var(--font-family);
  font-size: var(--text-base);

  color: var(--color-text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition:
    color 0.15s,
    border-color 0.15s,
    background 0.15s;
}

.rf__btn:hover {
  color: var(--color-brand-blue);
  border-color: rgba(29, 69, 135, 0.35);
}

.rf__btn--confirming {
  color: #e20b0b;
  border-color: rgba(226, 11, 11, 0.3);
  background: rgba(226, 11, 11, 0.05);
}

.rf__icon {
  flex-shrink: 0;
  transition: transform 0.4s ease;
}

.rf__btn:hover .rf__icon {
  transform: rotate(-180deg);
}

.rf__btn--confirming .rf__icon {
  transform: none !important;
}
.rf__tooltip {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;

  display: flex;
  align-items: center;
  gap: 6px;

  white-space: nowrap;
  background: var(--color-bg-white);
  border: 1px solid #8f8f8f;

  border-radius: var(--radius-sm);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);

  font-family: var(--font-family);
  font-size: var(--text-sm);

  color: #aeaeae;
  padding: 0 12px;
  height: 26px;
  z-index: 200;
}

.rf__tooltip-icon {
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.rf-tip-enter-active,
.rf-tip-leave-active {
  transition:
    opacity 0.12s,
    transform 0.12s;
}

.rf-tip-enter-from,
.rf-tip-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
[data-theme='dark'] .rf__btn {
  background: transparent;

  border-color: var(--color-border);

  color: var(--color-text-secondary);
}
[data-theme='dark'] .rf__tooltip {
  background: #1e2130;

  border-color: var(--color-border);

  color: var(--color-text-secondary);
}
</style>
