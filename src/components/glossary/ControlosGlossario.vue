<!-- Controlos do glossário: pesquisa, letras e categorias. -->
<template>
  <!-- Controlos separados da página para manter o template, a parte visual principal, simples. -->
  <div class="gl-controls" v-scroll-animate="'fade-down'">
    <!-- Campo de pesquisa com estado visual de foco. -->
    <div class="gl-search" :class="{ 'gl-search--focus': searchFocused }">
      <IconSearch :size="16" class="gl-search__icon" />
      <!-- Input controlado pela página pai através de eventos update. -->
      <input
        :value="query"
        type="text"
        class="gl-search__input"
        placeholder="Pesquisar termo ou definição…"
        aria-label="Pesquisar glossário"
        @focus="searchFocused = true"
        @blur="searchFocused = false"
        @input="$emit('update:query', $event.target.value)"
      />
      <!-- Limpeza rápida do texto pesquisado. -->
      <button
        v-if="query"
        type="button"
        class="gl-search__clear"
        @click="$emit('update:query', '')"
        aria-label="Limpar"
      >
        <IconX :size="14" />
      </button>
    </div>
    <!-- Pills de categoria. -->
    <div class="gl-cats" role="group" aria-label="Categorias">
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        class="gl-cat"
        :class="{ 'gl-cat--active': activeCategory === cat }"
        @click="$emit('update:activeCategory', cat)"
      >
        {{ cat }}
      </button>
    </div>
  </div>
</template>

<script setup>
// Estado local usado apenas para a classe de foco da pesquisa.
import { ref } from 'vue'
const searchFocused = ref(false)
// Props controladas pela página do glossário.
defineProps({
  // Texto atual da pesquisa.
  query: { type: String, default: '' },
  // Categoria ativa.
  activeCategory: { type: String, default: 'Todos' },
  // Categorias disponíveis, já calculadas pela página.
  categories: { type: Array, default: () => [] },
})
// Eventos emitidos para atualizar query e categoria no componente pai.
defineEmits(['update:query', 'update:activeCategory'])
</script>

<style scoped>
/* Layout vertical dos controlos. */
.gl-controls {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0 32px 16px;
}
/* Caixa de pesquisa. */
.gl-search {
  display: flex;
  align-items: center;

  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);
  padding: 12px;

  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
.gl-search--focus {
  border-color: var(--color-brand-blue);

  box-shadow: 0 0 0 3px rgba(29, 69, 135, 0.06);
}
.gl-search__icon {
  color: var(--color-text-secondary);
  flex-shrink: 0;
  margin-right: 8px;
}
.gl-search__input {
  flex: 1;
  border: none;
  outline: none;

  background: transparent;

  font-family: var(--font-family);
  font-size: var(--text-base);
  color: var(--color-text-primary);
}
.gl-search__clear {
  color: var(--color-text-secondary);

  display: flex;
  align-items: center;
}
/* Lista das categorias. */
.gl-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
/* Pill individual da categoria. */
.gl-cat {
  height: 30px;
  padding: 0 12px;

  border: 1px solid var(--color-border);

  border-radius: var(--radius-full);

  background: var(--color-bg-white);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
}
.gl-cat--active {
  background: var(--color-brand-blue);

  border-color: var(--color-brand-blue);
  color: #fff;
}
</style>
