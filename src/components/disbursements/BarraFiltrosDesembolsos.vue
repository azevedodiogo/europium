<!-- Barra de filtros da página de disbursements. -->
<template>
  <!-- Barra superior com filtro de país e exportação. -->
  <div class="des-filter-bar" v-scroll-animate="'fade-down'">
    <!-- Seletor de país; null representa todos os países. -->
    <div class="des-filter-group">
      <label class="des-filter-label">País</label>

      <AppCombobox
        :model-value="modelValue"
        :options="countryOptions"
        all-label="Todos os países"
        all-flag="🇪🇺"
        width="200px"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </div>
    <!-- Exporta os pagamentos do contexto ativo. -->
    <AppExportMenu
      filename="disbursements"
      document-label="Pagamentos MRR"
      :dataCount="paymentsCount"
      :data="exportData"
      :fileContext="fileContext"
      :detailParts="detailParts"
    />
  </div>
</template>

<script setup>
// Combobox reutilizado nos filtros da aplicação.
import AppCombobox from '@/components/app/SeletorApp.vue'
// Menu comum de exportação.
import AppExportMenu from '@/components/app/MenuExportacaoApp.vue'
// Props controladas pela página de disbursements.
defineProps({
  // País selecionado.
  modelValue: {
    type: String,
    default: null,
  },
  // Opções do seletor de país.
  countryOptions: {
    type: Array,
    default: () => [],
  },
  // Total de pagamentos usado na exportação.
  paymentsCount: {
    type: Number,
    default: 0,
  },
  // Linhas reais que vão ser escritas no ficheiro JSON ou CSV.
  exportData: {
    type: Array,
    default: () => [],
  },
  // Contexto usado no nome do ficheiro.
  fileContext: {
    type: Array,
    default: () => [],
  },
  // Detalhes apresentados na notificação.
  detailParts: {
    type: Array,
    default: () => [],
  },
})
// Evento padrão do v-model.
defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Barra de filtro e exportação. */
.des-filter-bar {
  display: flex;
  align-items: flex-end;

  justify-content: space-between;
  gap: 16px;

  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);

  padding: 16px;
  margin: 20px 32px 0;
  position: relative;
  z-index: 50;
  overflow: visible;
}
/* Grupo vertical com label e seletor. */
.des-filter-group {
  display: flex;

  flex-direction: column;
  gap: 5px;
}
.des-filter-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

/* Em ecrãs pequenos, coloca filtro e exportação em coluna. */
@media (max-width: 640px) {
  .des-filter-bar {
    align-items: stretch;
    flex-direction: column;
    margin: 20px 0 0;
  }
}
</style>
