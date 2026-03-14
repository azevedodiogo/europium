
<!--
  Pequeno adaptador de ícones.
  Recebe um nome lógico e devolve o componente Tabler correspondente.
-->
<template>
  <!-- Renderiza dinamicamente o ícone escolhido. -->
  <component :is="iconComponent" :size="size" />
</template>

<script setup>
// `computed` escolhe o componente certo a partir do nome recebido.
import { computed } from 'vue'
import {
  IconCurrencyEuro, IconTrendingDown, IconTarget, IconChartBar,
  IconLeaf, IconDeviceDesktop, IconTrendingUp, IconUsers,
  IconHeart, IconShield, IconBook, IconFlag,
  IconCreditCard, IconArrowsExchange, IconArrowRight,
} from '@tabler/icons-vue'

// Props mínimas: nome do ícone e tamanho.
const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
})

// Mapa entre o nome usado no projeto e o ícone real.
const MAP = {
  'euro':         IconCurrencyEuro,
  'arrow-down':   IconTrendingDown,
  'target':       IconTarget,
  'chart':        IconChartBar,
  'bar-chart':    IconChartBar,
  'credit-card':  IconCreditCard,
  'globe':        IconArrowsExchange,
  'leaf':         IconLeaf,
  'monitor':      IconDeviceDesktop,
  'trending-up':  IconTrendingUp,
  'users':        IconUsers,
  'heart':        IconHeart,
  'shield':       IconShield,
  'book':         IconBook,
  'flag':         IconFlag,
  'arrow-right':  IconArrowRight,
}

// Se o nome não existir no mapa, usa `IconTarget` como fallback.
const iconComponent = computed(() => MAP[props.name] || IconTarget)
</script>
