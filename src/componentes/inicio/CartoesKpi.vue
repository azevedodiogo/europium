<!-- Cartões KPI apresentados no topo da página inicial. -->
<template>
  <!-- Secção dos principais indicadores apresentados logo após o hero. -->
  <section class="kpi" aria-label="Indicadores principais">
    <!-- Grelha de quatro cartões KPI. -->
    <div class="kpi__grid">
      <!-- Cada artigo representa um indicador resumido vindo da store. -->
      <article v-for="kpi in kpis" :key="kpi.id" class="kpi__card">
        <div class="kpi__top">
          <p class="kpi__label">{{ kpi.label }}</p>

          <div class="kpi__icon" aria-hidden="true">
            <AppIcon :name="kpi.icon" :size="16" />
          </div>
        </div>

        <div class="kpi__value-row">
          <strong class="kpi__value">{{ kpi.value }}</strong>

          <span v-if="kpi.badge" class="kpi__badge" :class="`kpi__badge--${kpi.badge.color}`">{{
            kpi.badge.text
          }}</span>
        </div>

        <p class="kpi__description">{{ kpi.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
// Store principal que disponibiliza os KPIs da homepage.
import { useDashboardStore } from '@/estado/painel'
import { storeToRefs } from 'pinia'
// Ícone genérico usado pelos cartões.
import AppIcon from '@/componentes/app/IconeApp.vue'
const store = useDashboardStore()
// KPIs reativos para acompanhar futuras alterações da fonte de dados.
const { kpis } = storeToRefs(store)
</script>

<style scoped>
/* Bloco dos KPIs. */
.kpi {
  background: var(--color-bg-page);
  padding: 40px 0 0;
}
/* Grelha responsiva dos cartões. */
.kpi__grid {
  max-width: 1520px;
  margin: 0 auto;

  padding: 0 var(--container-padding);
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
/* Cartão individual. */
.kpi__card {
  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);
  padding: 20px;

  display: flex;
  flex-direction: column;
  transition: box-shadow 0.15s ease;
}

.kpi__card:hover {
  box-shadow: var(--shadow-md);
}
/* Topo com etiqueta e ícone. */
.kpi__top {
  display: flex;
  align-items: flex-start;

  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
}
.kpi__label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  line-height: 1.33;
  flex: 1;
}
.kpi__icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;

  background: var(--color-brand-blue-10);

  border-radius: var(--radius-sm);

  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-blue);
}
/* Linha com valor principal e badge opcional. */
.kpi__value-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.kpi__value {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.6px;
  line-height: 1.33;
}

.kpi__badge {
  font-size: var(--text-sm);
  font-weight: 500;
}

.kpi__badge--green {
  color: var(--color-green);
}
.kpi__description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.33;
}
[data-theme='dark'] .kpi__card {
  background: var(--color-bg-white);

  border-color: var(--color-border);
}
[data-theme='dark'] .kpi__card:hover {
  box-shadow: 0 12px 24px rgba(9, 14, 24, 0.14);
}
[data-theme='dark'] .kpi__icon {
  background: rgba(119, 167, 234, 0.12);
  color: #9dc0f4;
}

@media (max-width: 1024px) {
  .kpi__grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 40px;
  }
}

@media (max-width: 640px) {
  .kpi__grid {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
}
</style>
