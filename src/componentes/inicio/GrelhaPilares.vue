
<!-- Grelha dos seis pilares do mecanismo europeu. -->
<template>
  
  <!-- Secção autónoma para apresentar os seis pilares do MRR. -->
  <section class="pillars" aria-labelledby="pillars-title">
    
    <div class="pillars__container">
      
      <!-- Cabeçalho da secção com título e explicação curta. -->
      <header class="pillars__header">
        
        <h2 id="pillars-title" class="pillars__title">
          
          Seis Pilares do Mecanismo de Recuperação e Resiliência
        </h2>
        
        <p class="pillars__subtitle">
          
          O Mecanismo de Recuperação e Resiliência estrutura-se em seis pilares políticos de relevância europeia.
        </p>
      </header>

      
      <!-- Grelha semântica de cartões, lida como lista por tecnologias de apoio. -->
      <div class="pillars__grid" role="list">
        
        <!-- Cada artigo representa um pilar político do mecanismo. -->
        <article
          v-for="pillar in pillars"
          :key="pillar.id"
          class="pillars__card"
          role="listitem"
        >
          
          <div class="pillars__icon" aria-hidden="true">
            
            <AppIcon :name="pillar.icon" :size="20" />
          </div>

          
          <div class="pillars__content">
            
            <h3 class="pillars__name">{{ pillar.name }}</h3>
            
            <p class="pillars__desc">{{ pillar.description }}</p>

            
            <!-- Barra de progresso com aria-label para comunicar o valor. -->
            <div class="pillars__progress-row" :aria-label="`${pillar.progress}% concluído`">
              
              <div
                class="pillars__bar"
                role="progressbar"
                :aria-valuenow="pillar.progress"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                
                <div class="pillars__fill" :style="{ width: `${pillar.progress}%` }" />
              </div>
              
              <span class="pillars__pct">{{ pillar.progress }}%</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// Store principal com os dados dos pilares.
import { useDashboardStore } from '@/estado/painel'
import { storeToRefs } from 'pinia'
// Ícone genérico que converte o nome do dado no SVG certo.
import AppIcon from '@/componentes/app/IconeApp.vue'
const store = useDashboardStore()
// Mantém a lista reativa caso os dados venham a ser substituídos pelo json-server.
const { pillars } = storeToRefs(store)
</script>

<style scoped>

/* Espaçamento da secção na homepage. */
.pillars { padding: 40px 0 0; }
.pillars__container {
}


/* Cabeçalho da secção. */
.pillars__header { margin-bottom: 20px; }
.pillars__title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 8px;
  line-height: 1.56;
}
.pillars__subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.43;
}
/* Grelha de três colunas em desktop. */
.pillars__grid {
  display: grid;
  
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 0;
}
/* Cartão individual de cada pilar. */
.pillars__card {
  
  background: var(--color-bg-white);
  
  border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md);
  
  padding: 16px 16px 20px;
  
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  transition: box-shadow 0.15s;
}

.pillars__card:hover { box-shadow: var(--shadow-md); }
/* Ícone destacado do pilar. */
.pillars__icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  
  background: var(--color-brand-blue-10);
  
  border-radius: var(--radius-md);
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-blue);
}
.pillars__content {
  flex: 1;
  min-width: 0;
  
  display: flex;
  
  flex-direction: column;
  gap: 4px;
}
.pillars__name {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-primary);
  line-height: 1.43;
}
.pillars__desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.33;
}
/* Barra de progresso do pilar. */
.pillars__progress-row {
  
  display: flex;
  
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}
.pillars__bar {
  flex: 1;
  height: 6px;
  
  background: var(--color-progress-bg);
  
  border-radius: var(--radius-full);
  overflow: hidden;
}
.pillars__fill {
  height: 100%;
  
  background: var(--color-navy);
  
  border-radius: var(--radius-full);
  transition: width 0.6s ease;
}
.pillars__pct {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  min-width: 38px;
  text-align: right;
  white-space: nowrap;
}
[data-theme="dark"] .pillars__card {
  
  background: var(--color-bg-white);
  
  border-color: var(--color-border);
}
[data-theme="dark"] .pillars__card:hover {
  
  box-shadow: 0 12px 24px rgba(9,14,24,0.14);
}
[data-theme="dark"] .pillars__icon {
  
  background: rgba(119, 167, 234, 0.12);
  color: #9dc0f4;
}
[data-theme="dark"] .pillars__bar {
  
  background: rgba(232, 240, 252, 0.09);
}
[data-theme="dark"] .pillars__fill {
  
  background: #77a7ea;
}


@media (max-width: 1100px) {
  
  .pillars__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  
  .pillars__grid { grid-template-columns: 1fr; }
}
</style>
