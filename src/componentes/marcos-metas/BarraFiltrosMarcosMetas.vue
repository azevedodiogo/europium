
<!-- Barra de filtros principal da página de marcos e metas. -->
<template>
  
  <!-- Contentor único dos filtros, animado quando entra no ecrã. -->
  <div class="mm__filter-bar" v-scroll-animate="'fade-down'">
    
    <!-- Filtro de país. -->
    <div class="mm__filter-group">
      
      <label class="mm__filter-label">País</label>
      
      <AppCombobox
        :model-value="filterCountry"
        :options="countryOptions"
        all-label="Todos os países"
        all-flag="🇪🇺"
        width="200px"
        @update:model-value="$emit('update:filterCountry', $event)"
      />
    </div>

    
    <!-- Filtro de pilar temático. -->
    <div class="mm__filter-group">
      
      <label class="mm__filter-label">Pilar</label>
      
      <AppCombobox
        :model-value="filterPillar"
        :options="pillarOptions"
        all-label="Todos os pilares"
        width="180px"
        @update:model-value="$emit('update:filterPillar', $event)"
      />
    </div>

    
    <!-- Filtro de estado de execução. -->
    <div class="mm__filter-group">
      
      <label class="mm__filter-label">Estado</label>
      
      <AppCombobox
        :model-value="filterStatus"
        :options="statusOptions"
        all-label="Todos os estados"
        width="180px"
        @update:model-value="$emit('update:filterStatus', $event)"
      />
    </div>

    
    <!-- Filtro de tipo: marco ou meta. -->
    <div class="mm__filter-group">
      
      <label class="mm__filter-label">Tipo</label>
      
      <AppCombobox
        :model-value="filterType"
        :options="typeOptions"
        all-label="Todos os tipos"
        width="150px"
        @update:model-value="$emit('update:filterType', $event)"
      />
    </div>

    
    <!-- Ações finais: limpar filtros e exportar resultados. -->
    <div class="mm__filter-export">
      
      <AppResetFilters @reset="$emit('reset')" />
      
      <AppExportMenu
        filename="marcos-metas"
        document-label="Marcos e Metas"
        :dataCount="dataCount"
        :data="exportData"
        :fileContext="fileContext"
        :detailParts="detailParts"
      />
    </div>
  </div>
</template>

<script setup>
// Combobox reutilizável para todos os filtros.
import AppCombobox from '@/componentes/app/SeletorApp.vue'
// Menu de exportação configurado pela página pai.
import AppExportMenu from '@/componentes/app/MenuExportacaoApp.vue'
// Botão comum para repor filtros.
import AppResetFilters from '@/componentes/app/ReporFiltrosApp.vue'
// Propriedades recebidas da página de marcos e metas.
defineProps({
  // Valor selecionado no filtro de país.
  filterCountry: { type: String, default: null },
  // Valor selecionado no filtro de pilar.
  filterPillar: { type: String, default: null },
  // Valor selecionado no filtro de estado.
  filterStatus: { type: String, default: null },
  // Valor selecionado no filtro de tipo.
  filterType: { type: String, default: null },
  // Opções disponíveis em cada seletor.
  countryOptions: { type: Array, default: () => [] },
  pillarOptions: { type: Array, default: () => [] },
  statusOptions: { type: Array, default: () => [] },
  typeOptions: { type: Array, default: () => [] },
  // Número de resultados usado na exportação.
  dataCount: { type: Number, default: 0 },
  // Lista de marcos/metas filtrados que será escrita no ficheiro.
  exportData: { type: Array, default: () => [] },
  // Partes usadas no nome do ficheiro exportado.
  fileContext: { type: Array, default: () => [] },
  // Detalhes apresentados na notificação de exportação.
  detailParts: { type: Array, default: () => [] },
})
// Eventos que mantêm o estado dos filtros na página pai.
defineEmits([
  'update:filterCountry',
  'update:filterPillar',
  'update:filterStatus',
  'update:filterType',
  'reset',
])
</script>

<style scoped>
/* Barra horizontal com filtros e ações. */
.mm__filter-bar {
  
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  
  background: var(--color-bg-white);
  
  border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md);
  
  padding: 16px;
  margin: 20px 32px 0;
  position: relative;
  z-index: 50;
}
/* Grupo vertical com label e combobox. */
.mm__filter-group {
  
  display: flex;
  
  flex-direction: column;
  gap: 5px;
}
.mm__filter-label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
/* Área das ações do lado direito. */
.mm__filter-export {
  margin-left: auto;
  align-self: flex-end;
  
  display: flex;
  gap: 8px;
  align-items: center;
}
[data-theme="dark"] .mm__filter-bar {
  
  background: var(--color-bg-white);
  
  border-color: var(--color-border);
}

/* Em ecrãs pequenos, evita uma barra horizontal demasiado apertada. */
@media (max-width: 900px) {
  .mm__filter-bar {
    align-items: stretch;
    flex-direction: column;
  }

  .mm__filter-export {
    margin-left: 0;
    justify-content: flex-end;
  }
}

/* No telemóvel, remove a margem lateral fixa para alinhar com o contentor. */
@media (max-width: 640px) {
  .mm__filter-bar {
    margin: 20px 0 0;
  }

  .mm__filter-export {
    flex-wrap: wrap;
    justify-content: stretch;
  }
}
</style>
