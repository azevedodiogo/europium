
<!-- Faixa com os quatro valores rápidos da hero inicial. -->
<template>
  
  <!-- Lista visual dos valores rápidos do hero. -->
  <div class="hero__stats" role="list">
    
    <!-- Cada bloco mostra uma etiqueta e o valor correspondente. -->
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="hero__stat"
      role="listitem"
    >
      
      <span class="hero__stat-label">{{ stat.label }}</span>
      
      <span class="hero__stat-value">{{ stat.value }}</span>
    </div>
  </div>
</template>

<script setup>
// Recebe a lista de estatísticas já preparada pela store.
defineProps({
  // Array de objetos com label e value.
  stats: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
/* Grelha dos quatro valores rápidos. */
.hero__stats {
  display: grid;
  
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
  max-width: 1100px;
}
/* Cartão translúcido sobre o fundo azul do hero. */
.hero__stat {
  
  background: rgba(255, 255, 255, .07);
  
  border: 1px solid rgba(255, 255, 255, .12);
  
  border-radius: var(--radius-md);
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  gap: 6px;
  backdrop-filter: blur(8px);
  
  transition: background .2s ease, border-color .2s ease;
}
.hero__stat:hover {
  
  background: rgba(255, 255, 255, .11);
  
  border-color: rgba(255, 255, 255, .22);
}
/* Etiqueta pequena em maiúsculas. */
.hero__stat-label {
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: .3px;
  
  text-transform: uppercase;
  color: rgba(255, 255, 255, .55);
}
.hero__stat-value {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -.4px;
  color: white;
  line-height: 1.1;
}


@media (max-width: 900px) {
  .hero__stats {
    
    grid-template-columns: repeat(2, 1fr);
  }
}


@media (max-width: 480px) {
  .hero__stats {
    
    grid-template-columns: 1fr 1fr;
  }
}
</style>
