
<!-- Cartão reutilizável da página "Mais recursos". -->
<template>
  
  <!-- O cartão é um link completo para tornar toda a área clicável. -->
  <RouterLink :to="to" class="mais-card" :class="{ 'mais-card--full': full }">

    
    <!-- Linha superior com ícone, título e seta de navegação. -->
    <div class="mais-card__header">
      
      <div class="mais-card__icon" :class="iconClass">
        
        <slot name="icon" />
      </div>

      
      <h2 class="mais-card__title">{{ title }}</h2>

      
      <IconArrowNarrowRight :size="16" class="mais-card__arrow" />
    </div>

    
    <!-- Variante com conteúdo extra, usada por cartões que mostram pré-visualizações. -->
    <div v-if="hasExtra" class="mais-card__content-row">
      
      <p class="mais-card__desc mais-card__desc--split">{{ description }}</p>
      
      <div class="mais-card__extra">
        
        <slot name="extra" />
      </div>
    </div>

    
    <!-- Variante simples quando não existe slot extra. -->
    <p v-else class="mais-card__desc">
      {{ description }}
    </p>

    
    <!-- Chips de meta-informação apresentados no rodapé do cartão. -->
    <div class="mais-card__meta">
      
      <span
        v-for="chip in normalizedChips"
        :key="chip.label"
        class="mais-card__chip"
        :class="chip.className"
      >
        {{ chip.label }}
      </span>
    </div>
  </RouterLink>
</template>

<script setup>
// Computed permite normalizar props sem alterar os dados recebidos.
import { computed, useSlots } from 'vue'
// Props genéricas para o cartão poder ser reutilizado com diferentes recursos.
const props = defineProps({
  // Rota interna para onde o cartão navega.
  to: {
    type: String,
    required: true,
  },
  // Título principal do cartão.
  title: {
    type: String,
    required: true,
  },
  // Texto descritivo do recurso.
  description: {
    type: String,
    required: true,
  },
  // Tom visual do ícone, convertido numa classe CSS.
  iconTone: {
    type: String,
    default: 'blue',
  },
  // Lista de chips, que pode vir como strings ou objetos com tom.
  chips: {
    type: Array,
    default: () => [],
  },
  // Quando true, o cartão ocupa a largura total da grelha.
  full: {
    type: Boolean,
    default: false,
  },
})
// Slots permitem saber se foi passada uma zona extra.
const slots = useSlots()
// Classe de cor do ícone.
const iconClass = computed(() => `mais-card__icon--${props.iconTone}`)
// Indica se o layout deve reservar coluna para conteúdo extra.
const hasExtra = computed(() => Boolean(slots.extra))
// Uniformiza chips recebidos em formatos diferentes.
const normalizedChips = computed(() =>
  props.chips.map((chip) => {
    if (typeof chip === 'string') {
      return { label: chip, className: '' }
    }
    return {
      label: chip.label,
      className: chip.tone ? `mais-card__chip--${chip.tone}` : '',
    }
  }),
)
</script>

<style scoped>
/* Estrutura visual base do cartão. */
.mais-card {
  
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
  
  background: var(--color-bg-white);
  
  border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  
  transition: box-shadow .18s ease, border-color .18s ease, transform .18s ease;
}
/* Interação de hover para dar sensação de navegação. */
.mais-card:hover {
  
  box-shadow: 0 6px 24px rgba(29, 69, 135, .09), 0 1px 4px rgba(0, 0, 0, .05);
  
  border-color: rgba(29, 69, 135, .2);
  
  transform: translateY(-2px);
}
.mais-card--full {
  grid-column: 1 / -1;
}
/* Linha superior do cartão. */
.mais-card__header {
  
  display: flex;
  align-items: center;
  gap: 12px;
}
/* Ícone com tom definido por prop. */
.mais-card__icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  
  display: flex;
  align-items: center;
  
  justify-content: center;
  flex-shrink: 0;
}
.mais-card__icon--blue {
  
  background: rgba(29, 69, 135, .08);
  color: #1d4587;
}
.mais-card__icon--slate {
  
  background: rgba(100, 116, 139, .1);
  color: #475569;
}
.mais-card__icon--amber {
  
  background: rgba(217, 119, 6, .08);
  color: #d97706;
}
.mais-card__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
  flex: 1;
  line-height: 1.3;
}
.mais-card__arrow {
  color: var(--color-text-secondary);
  flex-shrink: 0;
  
  transition: transform .18s ease, color .18s ease;
}
.mais-card:hover .mais-card__arrow {
  
  transform: translateX(3px);
  
  color: var(--color-brand-blue);
}
.mais-card__desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin: 0;
}
/* Layout com texto e conteúdo extra lado a lado. */
.mais-card__content-row {
  display: grid;
  
  grid-template-columns: 1fr 220px;
  gap: 24px;
  
  align-items: center;
}
.mais-card__desc--split {
  margin: 0;
}
.mais-card__extra {
  min-width: 0;
}
/* Chips de metadados no rodapé. */
.mais-card__meta {
  
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}
.mais-card__chip {
  height: 22px;
  
  padding: 0 9px;
  
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 500;
  
  background: rgba(29, 69, 135, .06);
  
  border: 1px solid rgba(29, 69, 135, .12);
  color: #1d4587;
  
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}
.mais-card__chip--leg {
  color: #6366f1;
  
  background: rgba(99, 102, 241, .07);
  
  border-color: rgba(99, 102, 241, .18);
}
.mais-card__chip--exec {
  color: #1d4587;
  
  background: rgba(29, 69, 135, .07);
  
  border-color: rgba(29, 69, 135, .18);
}
.mais-card__chip--pay {
  color: #b45309;
  
  background: rgba(217, 119, 6, .07);
  
  border-color: rgba(217, 119, 6, .2);
}
.mais-card__chip--alert {
  color: #dc2626;
  
  background: rgba(220, 38, 38, .06);
  
  border-color: rgba(220, 38, 38, .15);
}
[data-theme="dark"] .mais-card {
  
  background: var(--color-bg-white);
  
  border-color: var(--color-border);
}
[data-theme="dark"] .mais-card:hover {
  
  box-shadow: 0 14px 28px rgba(9, 14, 24, .16);
  
  border-color: rgba(119, 167, 234, .22);
}


[data-theme="dark"] .mais-card__icon--blue,
[data-theme="dark"] .mais-card__icon--slate {
  
  background: rgba(119, 167, 234, .12);
  color: #9dc0f4;
}
[data-theme="dark"] .mais-card__icon--amber {
  
  background: rgba(217, 119, 6, .12);
  color: #f1b15b;
}
[data-theme="dark"] .mais-card__arrow {
  color: #afbdd0;
}
[data-theme="dark"] .mais-card__chip {
  
  background: rgba(119, 167, 234, .08);
  
  border-color: rgba(119, 167, 234, .16);
  color: #9dc0f4;
}
[data-theme="dark"] .mais-card__chip--leg {
  color: #a5a8ff;
  
  background: rgba(99, 102, 241, .12);
  
  border-color: rgba(129, 140, 248, .2);
}
[data-theme="dark"] .mais-card__chip--exec {
  color: #9dc0f4;
  
  background: rgba(119, 167, 234, .1);
  
  border-color: rgba(119, 167, 234, .18);
}
[data-theme="dark"] .mais-card__chip--pay {
  color: #f1b15b;
  
  background: rgba(217, 119, 6, .12);
  
  border-color: rgba(241, 177, 91, .18);
}
[data-theme="dark"] .mais-card__chip--alert {
  color: #ff8f8f;
  
  background: rgba(220, 38, 38, .12);
  
  border-color: rgba(248, 113, 113, .18);
}


@media (max-width: 900px) {
  .mais-card__content-row {
    
    grid-template-columns: 1fr;
  }
}
</style>
