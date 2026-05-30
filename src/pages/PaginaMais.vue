<!-- Página que agrega recursos extra do projeto. -->
<template>
  <div class="more-page">
    <div class="more-container">
      <!-- Cabeçalho comum da página. -->
      <div class="page-hero">
        <h1 class="page-hero__title">Mais recursos</h1>

        <p class="page-hero__desc">
          Ferramentas adicionais do Europium para aprofundar a análise do Mecanismo de Recuperação e Resiliência.
        </p>
      </div>
      <!-- Grelha dos recursos extra disponíveis no projeto. -->
      <div class="more-grid" v-scroll-animate.stagger>
        <!-- Cartões carregados do recurso `more`, vindo do json-server, a API local usada para simular dados. -->
        <MaisResourceCard
          v-for="resourceItem in resources"
          :key="resourceItem.id"
          :to="resourceItem.to"
          :title="resourceItem.title"
          :description="resourceItem.description"
          :icon-tone="resourceItem.iconTone"
          :chips="resourceItem.chips"
          :full="resourceItem.full"
        >
          <template #icon>
            <svg
              v-if="resourceItem.icon === 'globe'"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="1.4" />

              <ellipse cx="10" cy="10" rx="3" ry="7.5" stroke="currentColor" stroke-width="1.2" />

              <path
                d="M2.5 10h15M3.5 6.5h13M3.5 13.5h13"
                stroke="currentColor"
                stroke-width="1.1"
                stroke-linecap="round"
              />
            </svg>
            <svg
              v-else-if="resourceItem.icon === 'document'"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <rect x="3" y="2" width="14" height="16" rx="1.5" stroke="currentColor" stroke-width="1.4" />

              <path d="M6 7h8M6 10h8M6 13h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
            <svg
              v-else-if="resourceItem.icon === 'timeline'"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path d="M10 2v16" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".35" />

              <circle cx="10" cy="4" r="2" fill="currentColor" />

              <circle cx="10" cy="9" r="2" fill="currentColor" opacity=".65" />

              <circle cx="10" cy="14" r="2" fill="currentColor" opacity=".35" />

              <path
                d="M10 4.5h5a1.5 1.5 0 0 1 0 3h-5M10 9.5H5a1.5 1.5 0 0 0 0 3h5"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </svg>
          </template>

          <template v-if="resourceItem.previewEvents?.length" #extra>
            <MaisTimelinePreview :events="resourceItem.previewEvents" />
          </template>
        </MaisResourceCard>
      </div>
    </div>
  </div>
</template>

<script setup>
// Estado reativo e ciclo de vida usados para carregar o recurso externo.
import { computed } from 'vue'
// Cartão reutilizável da página "Mais recursos".
import MaisResourceCard from '@/components/more/CartaoRecursoMais.vue'
// Pré-visualização decorativa da linha do tempo.
import MaisTimelinePreview from '@/components/more/PrevisualizacaoLinhaTempoMais.vue'
// Composable, função reutilizável do Vue, que carrega o recurso pelo json-server, a API local usada para simular dados.
import { usarRecursoApi } from '@/composables/usarRecursoApi'
// Recurso principal da página.
const resource = usarRecursoApi('more')
// Lista de recursos apresentada na grelha.
const resources = computed(() => resource.value.resources)
</script>

<style scoped>
/* Estrutura geral da página. */
.more-page {
  background: var(--color-bg-page);
  min-height: 100vh;
  padding-bottom: 80px;
}

.more-container {
  max-width: 1520px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
/* Grelha de recursos em duas colunas. */
.more-grid {
  display: grid;

  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 0 32px;
}

@media (max-width: 900px) {
  .more-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .more-grid {
    margin: 0;
  }

  .more-container {
    padding: 0 20px;
  }
}
</style>
