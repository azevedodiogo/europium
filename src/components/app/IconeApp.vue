<!--
  Pequeno adaptador de ícones.
  Recebe um nome lógico e devolve o componente Tabler correspondente.
-->
<template>
  <!-- Mostra o ícone escolhido pelas props, os dados enviados para o componente. -->
  <IconePublico :src="iconSrc" :size="size" />
</template>

<script setup>
// `computed`, cálculo reativo do Vue, escolhe o componente certo a partir do nome recebido.
import { computed } from 'vue'
import IconePublico from '@/components/app/IconePublico.vue'

// Props mínimas: nome do ícone e tamanho.
const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
})

// Mapa entre o nome usado no projeto e o ícone real.
const MAP = {
  euro: 'currency-euro',
  'arrow-down': 'trending-down',
  target: 'target',
  chart: 'chart-bar',
  'bar-chart': 'chart-bar',
  'credit-card': 'credit-card',
  globe: 'arrows-exchange',
  leaf: 'leaf',
  monitor: 'device-desktop',
  'trending-up': 'trending-up',
  users: 'users',
  heart: 'heart',
  shield: 'shield',
  book: 'book',
  flag: 'flag',
  'arrow-right': 'arrow-right',
}

// Se o nome não existir no mapa, usa `IconTarget` como fallback.
const iconSrc = computed(() => `/icons/${MAP[props.name] || 'target'}.svg`)
</script>
