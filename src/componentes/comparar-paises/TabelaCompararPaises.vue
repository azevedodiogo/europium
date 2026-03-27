
<!-- Tabela comparativa final com os principais valores de cada país. -->
<template>
  
  <!-- A tabela só existe quando há dois países válidos. -->
  <div class="cp-table-wrap" v-if="dataA && dataB">
    
    <table class="cp-table" :aria-label="`Comparação: ${dataA.name} vs ${dataB.name}`">
      <thead>
        <tr>
          
          <th class="cp-th" scope="col">Métrica</th>
          
          <th class="cp-th cp-th--r" scope="col">{{ dataA.name }}</th>
          
          <th class="cp-th cp-th--r" scope="col">{{ dataB.name }}</th>
          
          <th class="cp-th cp-th--r" scope="col">Diferença</th>
        </tr>
      </thead>
      <tbody>
        
        <!-- Cada linha mostra métrica, valores e diferença calculada. -->
        <tr v-for="row in rows" :key="row.label" class="cp-tr">
          
          <td class="cp-td">{{ row.label }}</td>
          
          <td class="cp-td cp-td--r">{{ row.a }}</td>
          
          <td class="cp-td cp-td--r">{{ row.b }}</td>
          
          <td class="cp-td cp-td--r cp-td--diff" :class="row.diff > 0 ? 'pos' : row.diff < 0 ? 'neg' : ''">
            
            {{ row.diff > 0 ? '+' : '' }}{{ row.diff }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Componente apresentacional; recebe dados já calculados pela página.
defineProps({
  // Primeiro país da comparação.
  dataA: { type: Object, default: null },
  // Segundo país da comparação.
  dataB: { type: Object, default: null },
  // Linhas de métricas e diferenças.
  rows: { type: Array, default: () => [] },
})
</script>

<style scoped>
/* Moldura da tabela. */
.cp-table-wrap {
  
  border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: 12px 32px 0;
}


/* Tabela de comparação. */
.cp-table { width: 100%; min-width: 560px; border-collapse: collapse; font-size: var(--text-base); }
.cp-th {
  
  background: rgba(234,239,245,.5);
  
  border-bottom: .8px solid var(--color-border);
  padding: 10px 16px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  text-align: left;
  white-space: nowrap;
}

.cp-th--r { text-align: right; }


/* Linha da tabela. */
.cp-tr { border-top: .8px solid var(--color-border); transition: background .1s; }

.cp-tr:hover { background: rgba(249,250,251,.8); }
.cp-td {
  padding: 13px 16px;
  vertical-align: middle;
  color: var(--color-text-primary);
  font-size: var(--text-base);
}

.cp-td--r { text-align: right; color: var(--color-text-secondary); }

.cp-td--diff { font-weight: 500; color: var(--color-text-secondary) !important; }

.cp-td--diff.pos { color: var(--color-green) !important; }

.cp-td--diff.neg { color: var(--color-text-secondary) !important; }


[data-theme="dark"] .cp-th { background: rgba(232,240,252,0.06); }

[data-theme="dark"] .cp-tr:hover { background: rgba(119,167,234,0.08); }

/* Em telemóvel, alinha a tabela com as restantes secções da página. */
@media (max-width: 640px) {
  .cp-table-wrap {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
