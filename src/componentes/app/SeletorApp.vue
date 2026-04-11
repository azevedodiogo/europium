
<!--
  Seletor reutilizável da aplicação.
  Mostra um botão e um painel com opções, no estilo de combobox simples.
-->
<template>
  <!-- Contentor relativo para o botão e o painel das opções. -->
  <div class="cbox" :style="{ width }" ref="rootEl">
    <!-- Botão que abre e fecha a lista. -->
    <button
      type="button"
      class="cbox__trigger"
      :class="{ 'cbox__trigger--open': isOpen }"
      @click="toggle"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
    >
      <!-- Bandeira opcional da seleção atual. -->
      <span v-if="selectedFlag" class="cbox__flag" aria-hidden="true">{{ selectedFlag }}</span>

      <!-- Texto da opção selecionada. -->
      <span class="cbox__label">{{ selectedLabel }}</span>

      <!-- Quando nada está selecionado, mostra a seta do combobox. -->
      <IconSelector v-if="modelValue === null" :size="16" class="cbox__chevron" />

      <!-- Quando já existe seleção, mostra o visto. -->
      <IconCheck v-else :size="14" class="cbox__check" />
    </button>

    <!-- Animação do painel das opções. -->
    <Transition name="cbox-drop">
      <!-- Painel com a opção "Todos" e com a lista recebida por props. -->
      <div v-if="isOpen" class="cbox__panel" role="listbox">
        <!-- Opção especial para limpar a seleção. -->
        <button
          type="button"
          class="cbox__option"
          :class="{ 'cbox__option--selected': modelValue === null }"
          role="option"
          :aria-selected="modelValue === null"
          @click="select(null)"
        >
          <span v-if="allFlag" class="cbox__opt-flag" aria-hidden="true">{{ allFlag }}</span>
          <span class="cbox__opt-label">{{ allLabel ?? 'Todos' }}</span>
          <IconCheck v-if="modelValue === null" :size="13" class="cbox__opt-check" />
        </button>

        <!-- Restantes opções da lista. -->
        <button
          v-for="opt in options"
          :key="opt.value"
          type="button"
          class="cbox__option"
          :class="{ 'cbox__option--selected': modelValue === opt.value }"
          role="option"
          :aria-selected="modelValue === opt.value"
          @click="select(opt.value)"
        >
          <span v-if="opt.flag" class="cbox__opt-flag" aria-hidden="true">{{ opt.flag }}</span>
          <span class="cbox__opt-label">{{ opt.label }}</span>
          <IconCheck v-if="modelValue === opt.value" :size="13" class="cbox__opt-check" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
// Estado local do painel e valores derivados da seleção atual.
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props que configuram a seleção atual, a lista e o tamanho do componente.
const props = defineProps({
  modelValue: { default: null },
  options:    { type: Array,  default: () => [] },
  allLabel:   { type: String, default: 'Todos'  },
  allFlag:    { type: String, default: null     },
  width:      { type: String, default: '180px'  },
})

// Emite a mudança de valor para o componente pai.
const emit = defineEmits(['update:modelValue'])

// Diz se o painel está aberto.
const isOpen = ref(false)
// Referência ao elemento raiz para detetar clique fora.
const rootEl = ref(null)

// Bandeira que deve aparecer no botão.
const selectedFlag = computed(() => {
  if (props.modelValue === null) return props.allFlag ?? null
  return props.options.find(o => o.value === props.modelValue)?.flag ?? null
})

// Texto que deve aparecer no botão.
const selectedLabel = computed(() => {
  if (props.modelValue === null) return props.allLabel
  return props.options.find(o => o.value === props.modelValue)?.label ?? props.allLabel
})

// Abre ou fecha o painel.
function toggle() { isOpen.value = !isOpen.value }

// Escolhe um valor e fecha o painel.
function select(v) { emit('update:modelValue', v); isOpen.value = false }

// Fecha o painel quando o clique acontece fora do componente.
function handleOutside(e) { if (rootEl.value && !rootEl.value.contains(e.target)) isOpen.value = false }

// Tecla Escape fecha o painel.
function handleKey(e) { if (e.key === 'Escape') isOpen.value = false }

// Regista listeners globais.
onMounted(() => {
  document.addEventListener('mousedown', handleOutside)
  document.addEventListener('keydown', handleKey)
})

// Remove listeners ao desmontar.
onUnmounted(() => {
  document.removeEventListener('mousedown', handleOutside)
  document.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>

.cbox { position: relative; display: inline-block; }
.cbox__trigger {
  
  width: 100%; height: 36px;
  
  display: flex; align-items: center; gap: 7px;
  
  padding: 0 10px;
  
  background: white; border: 1px solid var(--color-border);
  
  border-radius: var(--radius-sm);
  
  box-shadow: 0 1px 2px rgba(0,0,0,.05);
  
  font-family: var(--font-family); font-size: var(--text-base);
  
  color: var(--color-text-primary); cursor: pointer;
  
  transition: border-color .15s, box-shadow .15s;
}
.cbox__trigger:hover,

.cbox__trigger--open { border-color: rgba(29,69,135,.4); }

.cbox__trigger--open { box-shadow: 0 0 0 3px rgba(29,69,135,.07); }


.cbox__flag   { font-size: 14px; line-height: 1; flex-shrink: 0; }

.cbox__label  { flex: 1; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.cbox__chevron { color: var(--color-text-secondary); flex-shrink: 0; }

.cbox__check   { color: var(--color-brand-blue); flex-shrink: 0; }
.cbox__panel {
  
  position: absolute; top: calc(100% + 4px); left: 0;
  
  min-width: 100%; max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  background: white; border: 1px solid var(--color-border);
  
  border-radius: var(--radius-sm);
  
  box-shadow: 0 4px 16px rgba(0,0,0,.10);
  z-index: 500;
}
.cbox__panel::-webkit-scrollbar {
  display: none;
}
.cbox__option {
  width: 100%; height: 36px;
  
  display: flex; align-items: center; gap: 8px;
  
  padding: 0 10px;
  
  background: white; border: none;
  
  border-bottom: .8px solid var(--color-border);
  
  font-family: var(--font-family); font-size: var(--text-base);
  
  color: var(--color-text-primary); cursor: pointer; text-align: left;
  transition: background .1s;
}

.cbox__option:last-child { border-bottom: none; }

.cbox__option:hover { background: var(--color-brand-blue-10); }

.cbox__option--selected { background: var(--color-brand-blue-10); }


.cbox__opt-flag  { font-size: 14px; flex-shrink: 0; }

.cbox__opt-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.cbox__opt-check { color: var(--color-brand-blue); flex-shrink: 0; }


.cbox-drop-enter-active, .cbox-drop-leave-active { transition: opacity .14s, transform .14s; }

.cbox-drop-enter-from, .cbox-drop-leave-to { opacity: 0; transform: translateY(-4px); }
[data-theme="dark"] .cbox__trigger {
  
  background: #223144;
  
  color: var(--color-text-primary);
  
  border-color: rgba(142, 166, 200, 0.26);
  
  box-shadow: 0 10px 20px rgba(11,17,29,0.16);
}

[data-theme="dark"] .cbox__trigger:hover,
[data-theme="dark"] .cbox__trigger--open {
  
  background: #28384e;
  
  border-color: rgba(142, 182, 236, 0.46);
}
[data-theme="dark"] .cbox__trigger--open {
  
  box-shadow: 0 0 0 3px rgba(119, 167, 234, 0.14);
}
[data-theme="dark"] .cbox__chevron,
[data-theme="dark"] .cbox__check {
  color: #d7e5f8;
}
[data-theme="dark"] .cbox__panel {
  
  background: #213044;
  
  border-color: rgba(142, 166, 200, 0.22);
  
  box-shadow: 0 18px 34px rgba(11,17,29,0.24);
}
[data-theme="dark"] .cbox__option {
  
  background: #213044;
  
  color: var(--color-text-primary);
  
  border-bottom-color: rgba(184, 202, 228, 0.08);
}

[data-theme="dark"] .cbox__option:hover,
[data-theme="dark"] .cbox__option--selected {
  
  background: rgba(119, 167, 234, 0.14);
}

</style>
