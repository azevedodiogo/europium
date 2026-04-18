<!-- Barra superior com os dois seletores de país e o botão de exportação. -->
<template>
  <!-- Barra de filtros da página de comparação. -->
  <div class="cp-filter-bar" v-scroll-animate="'fade-down'">
    <!-- Par de seletores: país A e país B. -->
    <div class="cp-filter-pair">
      <div class="cp-filter-group">
        <label class="cp-filter-label">País A</label>

        <AppCombobox
          :model-value="countryA"
          :options="countryOptions"
          all-label="Selecionar país"
          width="200px"
          @update:model-value="$emit('update:countryA', $event)"
        />
      </div>

      <div class="cp-filter-group">
        <label class="cp-filter-label">País B</label>

        <AppCombobox
          :model-value="countryB"
          :options="countryOptions"
          all-label="Selecionar país"
          width="200px"
          @update:model-value="$emit('update:countryB', $event)"
        />
      </div>
    </div>
    <!-- Exporta a comparação atualmente selecionada. -->
    <AppExportMenu
      filename="comparacao-paises"
      document-label="Comparação entre Países"
      :dataCount="dataCount"
      :data="exportData"
      :fileContext="fileContext"
      :detailParts="detailParts"
    />
  </div>
</template>

<script setup>
// Combobox reutilizado para cada país.
import AppCombobox from '@/componentes/app/SeletorApp.vue'
// Menu de exportação da comparação.
import AppExportMenu from '@/componentes/app/MenuExportacaoApp.vue'
// Props controladas pela página de comparação.
defineProps({
  // Código do primeiro país.
  countryA: { type: String, default: null },
  // Código do segundo país.
  countryB: { type: String, default: null },
  // Lista de países disponíveis.
  countryOptions: { type: Array, default: () => [] },
  // Número de linhas exportáveis.
  dataCount: { type: Number, default: 0 },
  // Linhas da comparação atual que são escritas no ficheiro exportado.
  exportData: { type: Array, default: () => [] },
  // Partes usadas no nome do ficheiro exportado.
  fileContext: { type: Array, default: () => [] },
  // Detalhes mostrados na notificação de exportação.
  detailParts: { type: Array, default: () => [] },
})
// Eventos para atualizar os dois seletores no componente pai.
defineEmits(['update:countryA', 'update:countryB'])
</script>

<style scoped>
/* Barra branca com seletores e exportação. */
.cp-filter-bar {
  display: flex;
  align-items: flex-end;

  justify-content: space-between;

  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);

  padding: 16px;
  margin: 20px 32px 0;
  position: relative;
  z-index: 20;
  overflow: visible;
}
/* Grupo dos dois seletores. */
.cp-filter-pair {
  display: flex;
  align-items: flex-end;
  gap: 16px;
}
.cp-filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.cp-filter-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}
[data-theme='dark'] .cp-filter-bar {
  background: var(--color-bg-white);

  border-color: var(--color-border);
}

/* Em tablet, deixa os seletores partir linha sem esmagar o botão. */
@media (max-width: 900px) {
  .cp-filter-bar {
    align-items: stretch;
    flex-direction: column;
    gap: 14px;
  }
}

/* Em telemóvel, os dois países ficam empilhados. */
@media (max-width: 640px) {
  .cp-filter-bar {
    margin: 20px 0 0;
  }

  .cp-filter-pair {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
