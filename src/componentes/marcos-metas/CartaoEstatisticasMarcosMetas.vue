
<!-- Cartão com os totais agregados dos marcos filtrados. -->
<template>
  
  <!-- Cartão agregado que resume o estado dos marcos/metas filtrados. -->
  <div class="mm__stats-card">
    
    <!-- Cabeçalho com país ativo e total de compromissos. -->
    <div class="mm__stats-header">
      
      <span class="mm__stats-country">{{ stats.flag }} {{ stats.country }}</span>
      
      <span class="mm__stats-total">{{ stats.total }} marcos/metas no total</span>
    </div>
    
    <!-- Três blocos: cumpridos, parciais e não cumpridos. -->
    <div class="mm__stats-bars">
      
      <div class="mm__stat-block">
        
        <p class="mm__stat-label">Cumpridos</p>
        
        <p class="mm__stat-count">{{ stats.cumpridos.count }}</p>
        
        <div class="mm__stat-bar"><div class="mm__stat-fill mm__stat-fill--green" :style="{ width: stats.cumpridos.pct + '%' }" /></div>
        
        <p class="mm__stat-pct">{{ stats.cumpridos.pct }}% do total</p>
      </div>
      
      <div class="mm__stat-block">
        
        <p class="mm__stat-label">Parciais</p>
        
        <p class="mm__stat-count">{{ stats.parciais.count }}</p>
        
        <div class="mm__stat-bar"><div class="mm__stat-fill mm__stat-fill--orange" :style="{ width: stats.parciais.pct + '%' }" /></div>
        
        <p class="mm__stat-pct">{{ stats.parciais.pct }}% do total</p>
      </div>
      
      <div class="mm__stat-block">
        
        <p class="mm__stat-label">Não cumpridos</p>
        
        <p class="mm__stat-count">{{ stats.naoCumpridos.count }}</p>
        
        <div class="mm__stat-bar"><div class="mm__stat-fill mm__stat-fill--red" :style="{ width: stats.naoCumpridos.pct + '%' }" /></div>
        
        <p class="mm__stat-pct">{{ stats.naoCumpridos.pct }}% do total</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// O cálculo das estatísticas fica na página pai; este componente apenas apresenta.
defineProps({
  // Objeto com país, bandeira, totais e percentagens por estado.
  stats: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
/* Cartão principal das estatísticas. */
.mm__stats-card {
  
  background: var(--color-bg-white);
  
  border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md);
  
  padding: 20px;
  margin: 12px 32px 0;
}
/* Cabeçalho do cartão. */
.mm__stats-header {
  
  display: flex;
  
  justify-content: space-between;
  margin-bottom: 20px;
}
.mm__stats-country {
  font-size: var(--text-base);
  font-weight: 600;
}
.mm__stats-total {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
/* Grelha das três barras. */
.mm__stats-bars {
  display: grid;
  
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
}
.mm__stat-block {
  
  padding: 0 16px;
}
.mm__stat-block:first-child {
  
  padding-left: 0;
}
.mm__stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: 4px;
}
.mm__stat-count {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}
/* Barra de percentagem comum a todos os estados. */
.mm__stat-bar {
  height: 6px;
  
  background: var(--color-progress-bg);
  
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 8px;
}
.mm__stat-fill {
  height: 100%;
  
  border-radius: var(--radius-full);
}


.mm__stat-fill--green { background: var(--color-green); }
.mm__stat-fill--orange {
  
  background: linear-gradient(90deg, #f4da31 0%, #f7e56f 100%);
  
  box-shadow: inset 0 0 0 1px rgba(252, 238, 101, 0.55);
}

.mm__stat-fill--red { background: #dc2626; }
.mm__stat-pct {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
[data-theme="dark"] .mm__stats-card {
  
  background: var(--color-bg-white);
  
  border-color: var(--color-border);
}
</style>
