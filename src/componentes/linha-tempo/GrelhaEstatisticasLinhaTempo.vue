
<!-- Cartões de estatísticas mostrados no final da linha do tempo. -->
<template>
  
  <!-- Grelha de estatísticas que fecha a página da linha do tempo. -->
  <div class="lt-stats" v-scroll-animate.stagger>
    
    <!-- Cada cartão mostra um valor histórico ou agregado do mecanismo. -->
    <div v-for="item in stats" :key="item.label" class="lt-stat">
      
      <span class="lt-stat__lbl">{{ item.label }}</span>
      
      <span class="lt-stat__val">{{ item.value }}</span>
    </div>
  </div>
</template>

<script setup>
// O componente recebe os dados já tratados pela página.
defineProps({
  // Lista de estatísticas a apresentar.
  stats: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
/* Grelha de cinco cartões em desktop. */
.lt-stats {
  display: grid;
  
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin: 0 32px;
}
/* Cartão individual de estatística. */
.lt-stat {
  
  background: var(--color-bg-white);
  
  border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md);
  
  padding: 18px 20px;
  
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 96px;
  justify-content: space-between;
  
  transition: box-shadow .18s ease, border-color .18s ease, transform .18s ease;
}
.lt-stat:hover {
  
  box-shadow: 0 6px 22px rgba(9, 14, 24, 0.06);
  
  border-color: rgba(29, 69, 135, .18);
  
  transform: translateY(-1px);
}
/* Etiqueta em maiúsculas. */
.lt-stat__lbl {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .35px;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}
.lt-stat__val {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -.5px;
  line-height: 1.2;
}


@media (max-width: 900px) {
  .lt-stats {
    
    grid-template-columns: repeat(3, 1fr);
  }
}


@media (max-width: 640px) {
  .lt-stats {
    
    grid-template-columns: repeat(2, 1fr);
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
