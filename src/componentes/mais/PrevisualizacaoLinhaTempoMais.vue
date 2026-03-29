
<!-- Linha temporal compacta usada apenas como preview decorativa. -->
<template>
  
  <!-- Elemento meramente decorativo, por isso fica escondido de leitores de ecrã. -->
  <div class="mais-tl-strip" aria-hidden="true">
    
    <!-- Linha horizontal base da mini timeline. -->
    <div class="mais-tl-strip__line" />

    
    <!-- Pontos posicionados por percentagem, recebida nos dados. -->
    <div
      v-for="event in events"
      :key="event.year + event.type"
      class="mais-tl-strip__node"
      :style="{ left: event.left, background: event.color }"
    >
      
      <span class="mais-tl-strip__yr">{{ event.year }}</span>
    </div>
  </div>
</template>

<script setup>
// Recebe eventos compactos para desenhar a miniatura.
defineProps({
  // Cada evento tem posição, ano e cor.
  events: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
/* Contentor relativo para posicionar linha e pontos. */
.mais-tl-strip {
  position: relative;
  height: 40px;
}
/* Linha horizontal da pré-visualização. */
.mais-tl-strip__line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  
  background: var(--color-border);
  
  transform: translateY(-50%);
}
/* Ponto de evento. */
.mais-tl-strip__node {
  position: absolute;
  top: 50%;
  
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  
  border-radius: 50%;
  
  border: 1.5px solid white;
  
  box-shadow: 0 0 0 1.5px currentColor;
}
/* Ano apresentado junto ao ponto. */
.mais-tl-strip__yr {
  position: absolute;
  top: 10px;
  left: 50%;
  
  transform: translateX(-50%);
  font-size: 9px;
  font-weight: 500;
  color: var(--color-text-secondary);
  white-space: nowrap;
}
[data-theme="dark"] .mais-tl-strip__line {
  
  background: rgba(232, 240, 252, .14);
}
[data-theme="dark"] .mais-tl-strip__yr {
  color: #afbdd0;
}


@media (max-width: 900px) {
  .mais-tl-strip {
    display: none;
  }
}
</style>
