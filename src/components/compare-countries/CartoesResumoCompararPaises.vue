<!-- Cartões com os indicators resumidos dos dois países escolhidos. -->
<template>
  <!-- Só renderiza os cartões quando os dois países são válidos. -->
  <div class="cp-cards" v-if="dataA && dataB">
    <!-- Primeiro cartão: país A. -->
    <div class="cp-card">
      <div class="cp-card__header">
        <h2 class="cp-card__name">{{ dataA.name }}</h2>

        <span class="cp-card__code">{{ dataA.code }}</span>
      </div>
      <!-- Primeira linha de métricas financeiras. -->
      <div class="cp-card__metrics">
        <div class="cp-card__metric">
          <p class="cp-card__metric-label">Fundos totais</p>

          <p class="cp-card__metric-value">{{ dataA.total }} mil M</p>
        </div>

        <div class="cp-card__metric">
          <p class="cp-card__metric-label">Desembolsado</p>

          <p class="cp-card__metric-value">{{ dataA.disbursed }} mil M</p>
        </div>
      </div>
      <!-- Segunda linha de métricas macro e progresso. -->
      <div class="cp-card__metrics">
        <div class="cp-card__metric">
          <p class="cp-card__metric-label">% PIB</p>

          <p class="cp-card__metric-value">{{ dataA.pib }}%</p>
        </div>

        <div class="cp-card__metric">
          <p class="cp-card__metric-label">Progresso</p>

          <div class="cp-progress-wrap">
            <div class="cp-progress-track">
              <div class="cp-progress-fill" :style="{ width: dataA.progress + '%' }" />
            </div>

            <span class="cp-progress-pct">{{ dataA.progress }}%</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Segundo cartão: país B, com a mesma estrutura para comparação direta. -->
    <div class="cp-card">
      <div class="cp-card__header">
        <h2 class="cp-card__name">{{ dataB.name }}</h2>

        <span class="cp-card__code">{{ dataB.code }}</span>
      </div>

      <div class="cp-card__metrics">
        <div class="cp-card__metric">
          <p class="cp-card__metric-label">Fundos totais</p>

          <p class="cp-card__metric-value">{{ dataB.total }} mil M</p>
        </div>

        <div class="cp-card__metric">
          <p class="cp-card__metric-label">Desembolsado</p>

          <p class="cp-card__metric-value">{{ dataB.disbursed }} mil M</p>
        </div>
      </div>

      <div class="cp-card__metrics">
        <div class="cp-card__metric">
          <p class="cp-card__metric-label">% PIB</p>

          <p class="cp-card__metric-value">{{ dataB.pib }}%</p>
        </div>

        <div class="cp-card__metric">
          <p class="cp-card__metric-label">Progresso</p>

          <div class="cp-progress-wrap">
            <div class="cp-progress-track">
              <div class="cp-progress-fill" :style="{ width: dataB.progress + '%' }" />
            </div>

            <span class="cp-progress-pct">{{ dataB.progress }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// O componente é apresentacional: recebe os dois países já escolhidos pela página.
defineProps({
  // Dados do primeiro país.
  dataA: { type: Object, default: null },
  // Dados do segundo país.
  dataB: { type: Object, default: null },
})
</script>

<style scoped>
/* Grelha dos dois cartões de resumo. */
.cp-cards {
  display: grid;

  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 12px 32px 0;
}
/* Cartão individual. */
.cp-card {
  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);
  padding: 20px;
}
/* Linha com nome do país e código. */
.cp-card__header {
  display: flex;
  align-items: center;

  justify-content: space-between;
  margin-bottom: 20px;
}
.cp-card__name {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}
.cp-card__code {
  border: 1px solid var(--color-border);

  border-radius: var(--radius-sm);

  padding: 3px 9px;
  font-size: var(--text-sm);
  font-weight: 500;
}
/* Grelha interna das métricas. */
.cp-card__metrics {
  display: grid;

  grid-template-columns: 1fr 1fr;
  gap: 12px 20px;
  margin-bottom: 16px;
}

.cp-card__metrics:last-child {
  margin-bottom: 0;
}

.cp-card__metric-label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: 4px;
}

.cp-card__metric-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* Barra de progresso visual. */
.cp-progress-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}
.cp-progress-track {
  flex: 1;
  height: 6px;

  background: rgba(29, 69, 135, 0.2);

  border-radius: 999px;
  overflow: hidden;
}
.cp-progress-fill {
  height: 100%;
  background: #1d4587;
  border-radius: 999px;
  transition: width 0.6s;
}

.cp-progress-pct {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
}

@media (max-width: 1100px) {
  .cp-cards {
    grid-template-columns: 1fr;
  }
}
[data-theme='dark'] .cp-card {
  background: var(--color-bg-white);

  border-color: var(--color-border);
}
[data-theme='dark'] .cp-progress-track {
  background: rgba(232, 240, 252, 0.1);
}
[data-theme='dark'] .cp-progress-fill {
  background: #77a7ea;
}
</style>
