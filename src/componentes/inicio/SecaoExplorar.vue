
<!-- Secção da homepage com atalhos para explorar o resto do site. -->
<template>
  
  <!-- Secção de atalhos para as principais áreas de análise. -->
  <section class="explore" aria-labelledby="explore-title">
    
    <!-- Cabeçalho curto da secção. -->
    <header class="explore__header">
      
      <h2 id="explore-title" class="explore__title">Explorar Dados</h2>
      
      <p class="explore__subtitle">
        
        Navegue pelas diferentes áreas de informação do Europium.
      </p>
    </header>

    
    <!-- Grelha de links internos, apresentada como lista acessível. -->
    <div class="explore__grid" role="list">
      
      <!-- Cada cartão navega para uma página funcional do projeto. -->
      <RouterLink
        v-for="link in exploreLinks"
        :key="link.id"
        :to="link.route"
        class="explore__card"
        role="listitem"
      >
        
        <div class="explore__card-icon" aria-hidden="true">
          
          <AppIcon :name="link.icon" :size="20" />
        </div>

        
        <div class="explore__card-body">
          
          <div class="explore__card-title">
            {{ link.title }}
            
            <IconArrowRight :size="14" class="explore__card-arrow" aria-hidden="true" />
          </div>
          
          <p class="explore__card-desc">{{ link.description }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
// Store principal com a lista de atalhos da homepage.
import { useDashboardStore } from '@/estado/painel'
import { storeToRefs } from 'pinia'
// Ícone genérico usado para cada link.
import AppIcon from '@/componentes/app/IconeApp.vue'
const store = useDashboardStore()
// Links reativos para permitir futura substituição por dados da API.
const { exploreLinks } = storeToRefs(store)
</script>

<style scoped>
/* Secção de exploração abaixo dos cartões e gráficos principais. */
.explore {
  
  padding: 48px 0 4px;
}
/* Cabeçalho da secção. */
.explore__header {
  margin-bottom: 16px;
  max-width: 480px;
}
.explore__title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.56;
  margin-bottom: 4px;
}
.explore__subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.43;
}
/* Grelha dos atalhos. */
.explore__grid {
  display: grid;
  
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
/* Cartão-link individual. */
.explore__card {
  
  display: flex;
  align-items: flex-start;
  gap: 16px;
  
  background: var(--color-bg-white);
  
  border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md);
  min-height: 85px;
  
  padding: 19px 20px;
  
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
}
.explore__card:hover {
  
  box-shadow: var(--shadow-md);
  
  border-color: rgba(29, 69, 135, 0.2);
}
/* Ícone do cartão. */
.explore__card-icon {
  width: 40px;
  height: 40px;
  
  background: var(--color-brand-blue-10);
  
  border-radius: var(--radius-md);
  
  display: flex;
  align-items: center;
  
  justify-content: center;
  color: var(--color-brand-blue);
  flex-shrink: 0;
}
.explore__card-body {
  flex: 1;
  min-width: 0;
}
.explore__card-title {
  
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-primary);
  
  display: flex;
  
  align-items: center;
  gap: 6px;
  line-height: 1.43;
  margin-bottom: 4px;
}
.explore__card-arrow {
  color: var(--color-text-secondary);
  
  transition: transform 0.15s ease;
}


.explore__card:hover .explore__card-arrow {
  
  transform: translateX(2px);
}
.explore__card-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.625;
}
[data-theme="dark"] .explore__card {
  
  background: var(--color-bg-white);
  
  border-color: var(--color-border);
}
[data-theme="dark"] .explore__card:hover {
  
  box-shadow: 0 12px 24px rgba(9,14,24,0.14);
  
  border-color: rgba(119, 167, 234, 0.24);
}
[data-theme="dark"] .explore__card-icon {
  
  background: rgba(119, 167, 234, 0.12);
  color: #9dc0f4;
}
[data-theme="dark"] .explore__card-arrow {
  color: #afbdd0;
}


@media (max-width: 640px) {
  
  .explore__grid { grid-template-columns: 1fr; }
  
  .explore { padding-top: 40px; }
}
</style>
