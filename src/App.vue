<!--
  Componente raiz da aplicação.
  Junta o cabeçalho, a página ativa, o rodapé e a notificação global.
-->
<template>
  <!-- Cabeçalho sempre visível no topo. -->
  <CabecalhoPrincipal />
  <!-- Zona central onde o router troca as páginas. -->
  <main>
    <!-- A página atual entra aqui. -->
    <RouterView />
  </main>
  <!-- Rodapé comum a toda a aplicação. -->
  <RodapePrincipal />
  <!-- Notificação global usada nas exportações. -->
  <NotificacaoApp />
</template>

<script setup>
// Hook usado para carregar dados logo no arranque da app.
import { onMounted } from 'vue'
// Cabeçalho principal do site.
import CabecalhoPrincipal from '@/components/layout/CabecalhoPrincipal.vue'
// Rodapé principal do site.
import RodapePrincipal from '@/components/layout/RodapePrincipal.vue'
// Notificação usada para mostrar progresso, sucesso e erro.
import NotificacaoApp from '@/components/app/NotificacaoApp.vue'
// Store principal com os dados usados na página inicial e noutras secções.
import { useDashboardStore as usePainelStore } from '@/stores/painel'

// Instância local da store.
const painelStore = usePainelStore()

// Quando a aplicação monta, tenta carregar os dados pela camada API.
onMounted(() => {
  painelStore.loadFromApi()
})
</script>

<style>
/* Faz com que a aplicação ocupe sempre a altura total do ecrã. */
#app {
  min-height: 100vh;

  /* Usa layout vertical: cabeçalho, conteúdo e rodapé. */
  display: flex;
  flex-direction: column;
}

/* O conteúdo central cresce para empurrar o rodapé para baixo. */
main {
  flex: 1;
}
</style>
