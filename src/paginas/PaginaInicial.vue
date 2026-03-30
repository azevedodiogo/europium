
<!-- Página inicial com hero, KPIs, pilares, tabela e gráfico. -->
<template>
  
  <div class="home">
    
    <!-- Hero visual da homepage. -->
    <SecaoHero />

    
    <!-- KPIs principais, com entrada animada em sequência. -->
    <div v-scroll-animate.stagger>
      
      <CartoesKpi />
    </div>

    
    <div class="home__body">
      
      <div class="home__container">

        
        <div v-scroll-animate.stagger>
          
          <!-- Grelha dos seis pilares políticos do mecanismo. -->
          <GrelhaPilares />
        </div>

        
        <!-- Linha com tabela de países e gráfico climático/digital. -->
        <div class="home__data-row">
          
          <!-- Ranking de países por alocação. -->
          <section aria-labelledby="countries-title" v-scroll-animate="'fade-left'">
            
            <header class="home__section-header">
              
              <h2 id="countries-title" class="home__section-title">Países por Alocação</h2>
              
              <p class="home__section-subtitle">Fundos alocados e progresso na execução dos marcos e metas.</p>
            </header>
            
            <TabelaPaises />
          </section>

          
          <!-- Gráfico comparativo dos objetivos obrigatórios. -->
          <section aria-labelledby="climate-title" v-scroll-animate="'fade-right'">
            
            <header class="home__section-header">
              
              <h2 id="climate-title" class="home__section-title">Objetivos Climáticos e Digitais</h2>
              
              <p class="home__section-subtitle">Percentagem da despesa dedicada a cada objetivo por país.</p>
            </header>
            
            <div class="home__chart-card">
              
              <GraficoClimaticoDigital />
            </div>
          </section>
        </div>

        
        <div v-scroll-animate>
          
          <!-- Atalhos para explorar páginas mais específicas. -->
          <SecaoExplorar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Componentes que formam as secções da homepage.
import SecaoHero from '@/componentes/inicio/SecaoHero.vue'
import CartoesKpi from '@/componentes/inicio/CartoesKpi.vue'
import GrelhaPilares from '@/componentes/inicio/GrelhaPilares.vue'
import TabelaPaises from '@/componentes/inicio/TabelaPaises.vue'
import GraficoClimaticoDigital from '@/componentes/inicio/GraficoClimaticoDigital.vue'
import SecaoExplorar from '@/componentes/inicio/SecaoExplorar.vue'
</script>

<style scoped>

/* Fundo geral da página inicial. */
.home { background: var(--color-bg-page); }

.home__body { padding-bottom: 60px; }
/* Contentor central com a largura usada no resto do site. */
.home__container {
  max-width: 1520px;
  margin: 0 auto;
  
  padding: 0 var(--container-padding);
}
/* Duas colunas principais: tabela e gráfico. */
.home__data-row {
  display: grid;
  
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 32px;
  align-items: start;
}

/* Cabeçalhos das secções internas. */
.home__section-header { margin-bottom: 16px; }
.home__section-title {
  
  font-size: 18px; font-weight: 600;
  color: var(--color-text-primary);
  
  margin-bottom: 6px; line-height: 1.56;
}
.home__section-subtitle {
  
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  
  line-height: 1.43;
}
/* Cartão que envolve o gráfico do Chart.js. */
.home__chart-card {
  
  background: var(--color-bg-white);
  
  border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md);
  
  padding: 16px; height: 390px;
  
  display: flex; flex-direction: column;
}
[data-theme="dark"] .home__chart-card {
  
  background: var(--color-bg-white);
  
  border-color: var(--color-border);
  
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
}

@media (max-width: 1200px) {
  
  .home__data-row { grid-template-columns: 1fr; }
  
  .home__container { padding: 0 40px; }
}

@media (max-width: 640px) { .home__container { padding: 0 20px; } }
</style>
