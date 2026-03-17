
<!--
  Cabeçalho visual usado nas páginas internas.
  Mostra o título, uma descrição opcional e um fundo decorativo.
-->
<template>
  <!-- Bloco principal do cabeçalho. -->
  <div class="ph" :class="`ph--${color}`" aria-hidden="false">
    <!-- Blobs decorativos no fundo. -->
    <div class="ph__blobs" aria-hidden="true">
      <div class="ph__blob ph__blob--1" />
      <div class="ph__blob ph__blob--2" />
      <div class="ph__blob ph__blob--3" />
    </div>

    <!-- Camada translúcida para o efeito de vidro. -->
    <div class="ph__glass" aria-hidden="true" />

    <!-- Conteúdo textual visível. -->
    <div class="ph__content">
      <h1 class="ph__title">{{ title }}</h1>
      <p v-if="desc" class="ph__desc">{{ desc }}</p>
    </div>

    <!-- Gradiente inferior para ligar ao fundo da página. -->
    <div class="ph__fade" aria-hidden="true" />
  </div>
</template>

<script setup>
// Props simples para configurar o texto e a cor do cabeçalho.
defineProps({
  title: { type: String, required: true },
  desc:  { type: String, default: '' },
  color: { type: String, default: 'blue' },
})
</script>

<style scoped>
/* Bloco exterior do cabeçalho. */
.ph {
  position: relative;
  overflow: hidden;
  padding: 36px 0 28px;
}

/* Camada que segura os blobs decorativos. */
.ph__blobs {
  position: absolute;
  inset: -40px;
  z-index: 0;
  pointer-events: none;
}

/* Estilo base de cada blob. */
.ph__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(48px);
  opacity: 0.35;
  will-change: transform;
}

/* Cor dos blobs consoante a variante pedida. */
.ph--blue  .ph__blob { background: #1d4587; }
.ph--green .ph__blob { background: #008e3e; }
.ph--purple .ph__blob { background: #5b21b6; }

/* Blob maior à esquerda. */
.ph__blob--1 {
  width: 420px; height: 320px;
  top: -60px; left: -60px;
  animation: blob1 14s ease-in-out infinite alternate;
}

/* Blob intermédio à direita. */
.ph__blob--2 {
  width: 300px; height: 260px;
  top: -40px; right: -20px;
  animation: blob2 10s ease-in-out infinite alternate;
  opacity: 0.22;
}

/* Blob pequeno mais ao centro. */
.ph__blob--3 {
  width: 200px; height: 160px;
  top: 0; left: 40%;
  animation: blob3 12s ease-in-out infinite alternate;
  opacity: 0.18;
}

/* Movimento do blob maior. */
@keyframes blob1 {
  0%   { transform: translate(0, 0)   scale(1);    }
  33%  { transform: translate(24px, 12px) scale(1.06); }
  66%  { transform: translate(-12px, 20px) scale(0.96); }
  100% { transform: translate(16px, -8px) scale(1.03); }
}

/* Movimento do blob da direita. */
@keyframes blob2 {
  0%   { transform: translate(0, 0)   scale(1);    }
  50%  { transform: translate(-30px, 10px) scale(1.1); }
  100% { transform: translate(10px, -16px) scale(0.92); }
}

/* Movimento do blob central. */
@keyframes blob3 {
  0%   { transform: translate(0, 0)   scale(1);    }
  50%  { transform: translate(20px, 8px) scale(1.15); }
  100% { transform: translate(-16px, 4px) scale(0.9); }
}

/* Camada translúcida que fica por cima dos blobs. */
.ph__glass {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(28px) saturate(160%) brightness(1.08);
  -webkit-backdrop-filter: blur(28px) saturate(160%) brightness(1.08);
  border-bottom: 0.8px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 1px 24px rgba(29, 69, 135, 0.06);
}

/* Contentor alinhado com a largura do resto do site. */
.ph__content {
  position: relative;
  z-index: 2;
  max-width: 1520px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* Título principal. */
.ph__title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.33;
  margin-bottom: 0;
}

/* Descrição secundária. */
.ph__desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.625;
  max-width: 760px;
  margin-top: 10px;
}

/* Gradiente final do cabeçalho. */
.ph__fade {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 28px;
  z-index: 2;
  background: linear-gradient(to bottom, transparent, var(--color-bg-page));
  pointer-events: none;
}

/* Ajusta a sombra do vidro conforme a cor escolhida. */
.ph--blue   .ph__glass { box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 1px 24px rgba(29,69,135,.08); }
.ph--green  .ph__glass { box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 1px 24px rgba(0,142,62,.08); }
.ph--purple .ph__glass { box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 1px 24px rgba(91,33,182,.08); }
</style>
