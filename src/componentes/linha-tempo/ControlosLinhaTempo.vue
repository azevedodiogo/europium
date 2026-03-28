
<!-- Filtros e legenda da linha do tempo. -->
<template>
  
  <!-- Controlos superiores da linha do tempo. -->
  <div class="lt-controls" v-scroll-animate="'fade-down'">
    
    <!-- Botões de filtro por categoria. -->
    <div class="lt-tabs" role="group" aria-label="Filtrar por categoria">
      
      <button
        v-for="cat in categories"
        :key="cat.key"
        type="button"
        class="lt-tab"
        :class="{ 'lt-tab--active': modelValue === cat.key }"
        @click="$emit('update:modelValue', cat.key)"
      >
        {{ cat.label }}
      </button>
    </div>

    
    <!-- Legenda das cores usadas nos pontos da timeline. -->
    <div class="lt-legend">
      
      <span v-for="item in legend" :key="item.key" class="lt-legend__item">
        
        <span class="lt-legend__dot" :style="{ background: item.color }" />
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
// Props controladas pela página da linha do tempo.
defineProps({
  // Categoria atualmente selecionada.
  modelValue: {
    type: String,
    default: 'todos',
  },
  // Lista de categorias disponíveis.
  categories: {
    type: Array,
    default: () => [],
  },
  // Itens da legenda visual.
  legend: {
    type: Array,
    default: () => [],
  },
})
// Evento de v-model emitido ao clicar numa categoria.
defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Layout dos controlos. */
.lt-controls {
  
  display: flex;
  align-items: center;
  
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 32px 48px;
}
/* Grupo dos botões de categoria. */
.lt-tabs {
  
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
/* Botão individual de categoria. */
.lt-tab {
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
  transition: all .15s;
}
.lt-tab:hover {
  
  border-color: rgba(29, 69, 135, .35);
  color: var(--color-brand-blue);
}
.lt-tab--active {
  
  background: var(--color-brand-blue);
  
  border-color: var(--color-brand-blue);
  color: white;
}
/* Legenda das cores. */
.lt-legend {
  
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.lt-legend__item {
  
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
.lt-legend__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}


@media (max-width: 640px) {
  .lt-controls {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
