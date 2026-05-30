<!-- Mensagem apresentada quando não há marcos para mostrar. -->
<template>
  <!-- Estado acessível que informa quando os filtros não têm resultados. -->
  <div class="mm__empty" role="status" aria-live="polite">
    <!-- Ícone decorativo do estado vazio. -->
    <div class="mm__empty-icon" aria-hidden="true">
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="24" class="mm__empty-stroke" stroke-width="1.8" />

        <path d="M16 20h20M19 26h14M22 32h8" class="mm__empty-stroke" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>

    <p class="mm__empty-title">Sem resultados</p>

    <p class="mm__empty-sub">
      Nenhum marco ou meta corresponde aos filtros selecionados.
      <!-- O botão delega a reposição dos filtros para a página pai. -->
      <button type="button" class="mm__empty-reset" @click="$emit('reset')">Limpar filtros</button>
    </p>
  </div>
</template>

<script setup>
// Emite apenas o pedido de reposição de filtros.
defineEmits(['reset'])
</script>

<style scoped>
/* Caixa centralizada do estado vazio. */
.mm__empty {
  margin: 0 32px;

  padding: 56px 24px;

  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.mm__empty-icon {
  color: var(--color-border);
}

.mm__empty-stroke {
  stroke: currentColor;
}
.mm__empty-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
}
.mm__empty-sub {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.5;
  max-width: 380px;
}
/* Botão textual para repor filtros. */
.mm__empty-reset {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-brand-blue);

  font-family: var(--font-family);
  font-size: var(--text-base);
  font-weight: 500;

  padding: 0;

  text-decoration: underline;

  text-underline-offset: 2px;
}
.mm__empty-reset:hover {
  opacity: 0.75;
}
</style>
