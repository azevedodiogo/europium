<!--
  Notificação global das exportações.
  Lê o estado da store e mostra progresso, sucesso ou erro.
-->
<template>
  <!-- Usa Teleport, recurso do Vue que move este bloco para fora da árvore normal, para aparecer por cima da página. -->
  <Teleport to="body">
    <!-- Animação de entrada e saída da notificação. -->
    <Transition name="notif">
      <!-- O cartão só existe quando a store o marca como visível. -->
      <div
        v-if="store.visible"
        class="notif"
        :class="{
          'notif--error': store.isError,
          'notif--done': !store.isError && store.done,
          'notif--progress': !store.isError && !store.done,
        }"
        role="status"
        aria-live="polite"
      >
        <!-- Ícone visual do estado atual. -->
        <NotificationStatusIcon :is-error="store.isError" :done="store.done" />
        <!-- Zona textual central. -->
        <div class="notif__body">
          <!-- Linha principal da notificação. -->
          <p class="notif__label">
            <span v-if="store.isError">{{ store.title || 'Erro na exportação' }}</span>
            <span v-else-if="store.done">{{ store.title || 'Download concluído' }}</span>
            <span v-else
              >A exportar <strong>{{ store.title || 'documento' }}</strong></span
            >
          </p>
          <!-- Nome do ficheiro quando existir. -->
          <p v-if="!store.isError && store.filename" class="notif__file">{{ store.filename }}</p>
          <!-- Barra de progresso enquanto a exportação está ativa. -->
          <div v-if="!store.isError && !store.done" class="notif__track">
            <div class="notif__fill" :style="{ width: store.progress + '%' }" />
          </div>
          <!-- Mensagem secundária: erro, detalhe ou percentagem. -->
          <p v-if="store.isError" class="notif__sub">{{ store.errorMsg }}</p>
          <p v-else-if="store.subtitle" class="notif__sub">{{ store.subtitle }}</p>
          <p v-else-if="!store.done" class="notif__pct">{{ store.progress }}%</p>
        </div>
        <!-- Botão para fechar manualmente. -->
        <button type="button" class="notif__close" @click="store.dismiss" aria-label="Fechar">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
// Ícone que muda com o estado da notificação.
import NotificationStatusIcon from '@/componentes/app/IconeEstadoNotificacao.vue'
// Store que centraliza todo o comportamento da notificação.
import { useNotificationStore } from '@/estado/notificacao'

// O componente apenas lê e mostra este estado.
const store = useNotificationStore()
</script>

<style scoped>
/* Cartão flutuante que fica no canto inferior direito. */
.notif {
  /* Fixa a notificação sobre a página, independentemente do scroll. */
  position: fixed;
  /* Afasta a notificação da base da janela. */
  bottom: 24px;
  /* Afasta a notificação da direita da janela. */
  right: 24px;
  /* Garante que aparece por cima de menus, tabelas e gráficos. */
  z-index: 9999;

  /* Organiza ícone, texto e botão de fechar na horizontal. */
  display: flex;
  /* Alinha os elementos pelo centro vertical. */
  align-items: center;
  /* Cria espaço entre ícone, corpo e botão. */
  gap: 10px;
  /* Evita que a notificação fique demasiado estreita. */
  min-width: 268px;
  /* Impede que nomes longos de ficheiro alarguem demasiado o cartão. */
  max-width: 380px;
  /* Define o espaço interno do cartão. */
  padding: 10px 12px 10px 12px;
  /* Arredonda o cartão para ficar com aspeto de toast moderno. */
  border-radius: 12px;

  /* Usa a variável quando existe e mantém fallback translúcido em modo claro. */
  background: var(--notif-bg, rgba(255, 255, 255, 0.88));
  /* Aplica efeito de vidro desfocado atrás da notificação. */
  backdrop-filter: blur(24px) saturate(180%);
  /* Versão WebKit do mesmo efeito para compatibilidade. */
  -webkit-backdrop-filter: blur(24px) saturate(180%);

  /* Rebordo subtil para separar a notificação do conteúdo. */
  border: 1px solid var(--notif-border, rgba(0, 0, 0, 0.08));
  /* Sombras exteriores e brilho interior para criar profundidade. */
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.1),
    0 1px 4px rgba(0, 0, 0, 0.06),
    inset 0 0.5px 0 rgba(255, 255, 255, 0.08);
}
.notif--error {
  /* Fundo claro avermelhado para exportações com erro. */
  background: rgba(255, 245, 245, 0.92);
  /* Rebordo no tom do erro. */
  border-color: rgba(220, 38, 38, 0.12);
  /* Sombra afinada para o estado de erro. */
  box-shadow:
    0 4px 20px rgba(220, 38, 38, 0.1),
    0 1px 4px rgba(0, 0, 0, 0.05),
    inset 0 0.5px 0 rgba(255, 255, 255, 0.7);
}
.notif--done {
  /* Rebordo verde suave quando a exportação termina. */
  border-color: rgba(52, 199, 89, 0.18);
}
.notif__body {
  /* Ocupa o espaço entre ícone e botão de fechar. */
  flex: 1;
  /* Permite ellipsis nos textos internos. */
  min-width: 0;
}
.notif__label {
  /* Usa uma fonte próxima do sistema para parecer uma notificação nativa. */
  font-family: -apple-system, 'SF Pro Text', 'Inter', sans-serif;
  /* Tamanho compacto da linha principal. */
  font-size: 13px;
  /* Dá destaque ao estado da exportação. */
  font-weight: 500;
  /* Cor principal do texto. */
  color: var(--color-text-primary);
  /* Ajusta ligeiramente o espaçamento das letras. */
  letter-spacing: -0.1px;
  /* Mantém a altura da linha controlada. */
  line-height: 1.3;
  /* Deixa espaço até ao nome do ficheiro ou à barra. */
  margin: 0 0 5px;
  /* Mantém a mensagem principal numa linha. */
  white-space: nowrap;
  /* Esconde texto que não couber. */
  overflow: hidden;
  /* Mostra reticências em textos longos. */
  text-overflow: ellipsis;
}
.notif__label strong {
  /* Destaca o documento em exportação. */
  font-weight: 600;
  /* Garante a mesma cor do texto principal. */
  color: var(--color-text-primary);
}

.notif--error .notif__label {
  color: #b91c1c;
}

.notif--done .notif__label {
  color: rgba(0, 0, 0, 0.75);
}
.notif__file {
  /* Nome do ficheiro exportado, apresentado abaixo do título. */
  font-family: -apple-system, 'SF Pro Text', 'Inter', sans-serif;
  /* Tamanho menor para informação secundária. */
  font-size: 11px;
  /* Cor secundária para não competir com o estado principal. */
  color: var(--color-text-secondary);
  /* Espaço antes da barra de progresso. */
  margin: 0 0 6px;
  /* Melhora a leitura em nomes de ficheiros. */
  line-height: 1.4;
  /* Mantém o nome numa linha. */
  white-space: nowrap;
  /* Evita overflow lateral. */
  overflow: hidden;
  /* Mostra reticências quando o nome é longo. */
  text-overflow: ellipsis;
}
.notif__sub {
  /* Texto auxiliar com detalhes da exportação ou erro. */
  font-family: -apple-system, 'SF Pro Text', 'Inter', sans-serif;
  /* Tamanho ligeiramente maior do que o nome do ficheiro. */
  font-size: 12px;
  /* Cor secundária da interface. */
  color: var(--color-text-secondary);
  /* Remove margens externas inesperadas. */
  margin: 0;
  /* Mantém o texto respirável. */
  line-height: 1.4;
}
.notif__pct {
  /* Percentagem mostrada quando não há subtítulo específico. */
  font-family: -apple-system, 'SF Pro Text', 'Inter', sans-serif;
  /* Tamanho discreto para informação de progresso. */
  font-size: 11px;
  /* Cor secundária. */
  color: var(--color-text-secondary);
  /* Pequeno afastamento da barra. */
  margin: 4px 0 0;
  /* Ajuste visual fino da percentagem. */
  letter-spacing: 0.1px;
}
.notif__track {
  /* Altura fina para a barra de progresso. */
  height: 3px;
  /* Fundo da barra ainda por preencher. */
  background: rgba(0, 0, 0, 0.07);
  /* Arredondamento da barra. */
  border-radius: 2px;
  /* Esconde a parte preenchida quando passa o raio. */
  overflow: hidden;
  /* Aumenta o espaço até ao texto inferior, como pedido no ajuste visual. */
  margin: 2px 0 12px;
}
.notif__fill {
  /* A barra preenchida acompanha `store.progress`. */
  height: 100%;
  /* Azul institucional usado no progresso. */
  background: #1d4587;
  /* Mantém o raio igual ao fundo da barra. */
  border-radius: 2px;
  /* Suaviza alterações de percentagem. */
  transition: width 0.22s ease;
}
.notif__close {
  /* Impede o botão de encolher quando o texto é comprido. */
  flex-shrink: 0;
  /* Tamanho compacto do botão circular. */
  width: 20px;
  height: 20px;
  /* Remove estilos nativos do botão. */
  border: none;
  /* Fundo discreto, visível apenas no hover, quando o rato passa por cima da notificação. */
  background: rgba(0, 0, 0, 0.06);
  /* Forma circular do botão. */
  border-radius: 50%;
  /* Cursor de ação. */
  cursor: pointer;
  /* Cor subtil do ícone de fechar. */
  color: rgba(0, 0, 0, 0.4);
  /* Centra o SVG, o desenho vetorial do ícone, dentro do círculo. */
  display: flex;
  align-items: center;
  justify-content: center;
  /* Remove padding nativo. */
  padding: 0;
  /* Esconde o botão até o utilizador passar o rato na notificação. */
  opacity: 0;
  /* Suaviza a entrada do botão e a mudança de fundo. */
  transition:
    opacity 0.15s,
    background 0.15s;
  /* Alinha o botão ao topo do cartão. */
  align-self: flex-start;
  /* Corrige ligeiramente a posição vertical. */
  margin-top: 1px;
}

.notif:hover .notif__close {
  opacity: 1;
}

.notif__close:hover {
  background: rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.6);
}
[data-theme='dark'] .notif {
  background: rgba(33, 45, 64, 0.95);

  border-color: rgba(208, 224, 246, 0.1);
  box-shadow:
    0 12px 28px rgba(9, 14, 24, 0.28),
    0 1px 4px rgba(9, 14, 24, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
[data-theme='dark'] .notif--error {
  background: rgba(58, 25, 28, 0.96);

  border-color: rgba(220, 38, 38, 0.2);
}
[data-theme='dark'] .notif__label,
[data-theme='dark'] .notif__label strong,
[data-theme='dark'] .notif--done .notif__label {
  color: var(--color-text-primary);
}
[data-theme='dark'] .notif__file,
[data-theme='dark'] .notif__sub,
[data-theme='dark'] .notif__pct {
  color: var(--color-text-secondary);
}
[data-theme='dark'] .notif__close {
  background: rgba(255, 255, 255, 0.08);

  color: rgba(255, 255, 255, 0.52);
}
[data-theme='dark'] .notif__close:hover {
  background: rgba(255, 255, 255, 0.14);

  color: rgba(255, 255, 255, 0.82);
}
.notif-enter-active {
  transition:
    opacity 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.38s cubic-bezier(0.34, 1.4, 0.64, 1);
}
.notif-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}
.notif-enter-from {
  opacity: 0;

  transform: translateY(12px) scale(0.94);
}
.notif-leave-to {
  opacity: 0;

  transform: translateY(6px) scale(0.97);
}
</style>
