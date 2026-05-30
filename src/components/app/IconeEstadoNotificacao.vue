<!--
  Ícone que muda conforme o estado da notificação.
  Pode mostrar erro, sucesso ou progresso.
-->
<template>
  <!-- Zona fixa do ícone à esquerda da notificação. -->
  <div class="notif__icon-wrap" aria-hidden="true">
    <Transition name="notif-icon">
      <!-- Estado de erro. -->
      <div v-if="isError" key="err" class="notif__icon-inner">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6.5" stroke="#dc2626" stroke-width="1.3" />
          <path d="M7 4.5v3M7 9.5v.01" stroke="#dc2626" stroke-width="1.4" stroke-linecap="round" />
        </svg>
      </div>
      <!-- Estado concluído com sucesso. -->
      <div v-else-if="done" key="done" class="notif__icon-inner notif__icon-inner--done">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6.5" stroke="#34c759" stroke-width="1.3" />
          <path
            d="M4.5 7l2 2 3.5-3.5"
            stroke="#34c759"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <!-- Estado intermédio de carregamento. -->
      <div v-else key="loading" class="notif__icon-inner notif__icon-inner--spin">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="rgba(0,0,0,0.12)" stroke-width="1.5" fill="none" />
          <path
            d="M7 1.5A5.5 5.5 0 0 1 12.5 7"
            stroke="#1d4587"
            stroke-width="1.5"
            stroke-linecap="round"
            fill="none"
          />
        </svg>
      </div>
    </Transition>
  </div>
</template>

<script setup>
// Flags simples que dizem que desenho deve aparecer.
defineProps({
  isError: {
    type: Boolean,
    default: false,
  },
  done: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
/* Caixa exterior do ícone. */
.notif__icon-wrap {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Centra o SVG, o desenho vetorial do ícone, dentro da caixa. */
.notif__icon-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Roda o spinner enquanto a exportação decorre. */
.notif__icon-inner--spin svg {
  animation: notifSpin 0.9s linear infinite;
}

/* Dá um pequeno "pop" ao ícone de sucesso. */
.notif__icon-inner--done svg {
  animation: notifPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Rotação contínua do estado de carregamento. */
@keyframes notifSpin {
  to {
    transform: rotate(360deg);
  }
}

/* Entrada do visto de sucesso. */
@keyframes notifPop {
  from {
    transform: scale(0.6);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Animação entre estados do ícone. */
.notif-icon-enter-active,
.notif-icon-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  position: absolute;
}

/* O novo estado entra more pequeno e invisível. */
.notif-icon-enter-from {
  opacity: 0;
  transform: scale(0.7);
}

/* O estado antigo sai a ampliar ligeiramente. */
.notif-icon-leave-to {
  opacity: 0;
  transform: scale(1.2);
}
</style>
