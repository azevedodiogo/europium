<!-- Conjunto de cartões KPI usado no topo da página de disbursements. -->
<template>
  <!-- Grelha de KPIs resumidos da página de disbursements. -->
  <div class="des-kpis" v-scroll-animate.stagger>
    <!-- Total pago pela UE no contexto ativo. -->
    <div class="des-kpi">
      <div class="des-kpi__top">
        <span class="des-kpi__label">Total Desembolsado</span>

        <div class="des-kpi__icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M13 4.5C11 2.5 8 2.5 6 4.5M4 7.5H11M4 9.5H11M3 11.5C5 13.5 8 13.5 10 11.5"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <p class="des-kpi__value">{{ activeKpis.total }}</p>

      <p class="des-kpi__sub">{{ activeKpis.totalSub }}</p>
    </div>
    <!-- Montante de subvenções. -->
    <div class="des-kpi">
      <div class="des-kpi__top">
        <span class="des-kpi__label">Subvenções</span>

        <div class="des-kpi__icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="2" y="4" width="12" height="9" rx="1" stroke="currentColor" stroke-width="1.2" />

            <path
              d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <p class="des-kpi__value">{{ activeKpis.subv }}</p>

      <p class="des-kpi__sub">{{ activeKpis.subvSub }}</p>
    </div>
    <!-- Montante de empréstimos. -->
    <div class="des-kpi">
      <div class="des-kpi__top">
        <span class="des-kpi__label">Empréstimos</span>

        <div class="des-kpi__icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="2" y="4" width="12" height="9" rx="1" stroke="currentColor" stroke-width="1.2" />

            <path d="M2 8h12" stroke="currentColor" stroke-width="1.2" />
          </svg>
        </div>
      </div>

      <p class="des-kpi__value">{{ activeKpis.empr }}</p>

      <p class="des-kpi__sub">{{ activeKpis.emprSub }}</p>
    </div>
    <!-- Número de pagamentos efetuados. -->
    <div class="des-kpi">
      <div class="des-kpi__top">
        <span class="des-kpi__label">Número de Pagamentos</span>

        <div class="des-kpi__icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="12" height="13" rx="1" stroke="currentColor" stroke-width="1.2" />

            <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          </svg>
        </div>
      </div>

      <p class="des-kpi__value">{{ activeKpis.pagamentos }}</p>

      <p class="des-kpi__sub">{{ activeKpis.pagamentosSub }}</p>
    </div>
  </div>
</template>

<script setup>
// O componente recebe KPIs já calculados pela página pai.
defineProps({
  // Objeto com valores e subtítulos de todos os cartões.
  activeKpis: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
/* Grelha dos quatro KPIs. */
.des-kpis {
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin: 8px 32px 0;
  min-width: 0;
}
/* Cartão individual de KPI. */
.des-kpi {
  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);
  padding: 20px;
  min-width: 0;
}
/* Linha superior com etiqueta e ícone. */
.des-kpi__top {
  display: flex;
  align-items: flex-start;

  justify-content: space-between;
  margin-bottom: 12px;
}
.des-kpi__label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);

  text-transform: uppercase;
  letter-spacing: 0.3px;
}
/* Ícone decorativo do KPI. */
.des-kpi__icon {
  width: 32px;
  height: 32px;

  background: var(--color-brand-blue-10);

  border-radius: var(--radius-sm);

  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-blue);
  flex-shrink: 0;
}
.des-kpi__value {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.6px;
  margin-bottom: 6px;
}
.des-kpi__sub {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

@media (max-width: 1200px) {
  .des-kpis {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .des-kpis {
    grid-template-columns: 1fr;
    margin: 8px 0 0;
  }
}
</style>
