<!-- Hero principal da página inicial. -->
<template>
  <!-- Secção de abertura com fundo institucional, texto principal e ações. -->
  <section class="hero" aria-labelledby="hero-title">
    <!-- Fundo decorativo com estrelas inspiradas na bandeira da União Europeia. -->
    <div class="hero__eu-bg" aria-hidden="true">
      <!-- Anel principal de estrelas. -->
      <svg class="hero__eu-stars hero__eu-stars--main" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <g v-for="i in 12" :key="i">
          <polygon
            :transform="`rotate(${(i - 1) * 30}, 200, 200) translate(200, 70)`"
            points="0,-14 3.3,-9.7 8.2,-8.5 5,-4.2 5.9,2.2 0,-0.8 -5.9,2.2 -5,-4.2 -8.2,-8.5 -3.3,-9.7"
            fill="rgba(255,209,0,0.22)"
          />
        </g>
      </svg>
      <!-- Anel secundário no canto inferior, usado apenas para profundidade visual. -->
      <svg class="hero__eu-stars hero__eu-stars--bl" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <g v-for="i in 12" :key="i">
          <polygon
            :transform="`rotate(${(i - 1) * 30}, 80, 80) translate(80, 30)`"
            points="0,-7 1.6,-4.8 4.1,-4.3 2.4,-2.1 2.9,1.1 0,-0.4 -2.9,1.1 -2.4,-2.1 -4.1,-4.3 -1.6,-4.8"
            fill="rgba(255,209,0,0.08)"
          />
        </g>
      </svg>
    </div>
    <!-- Vinheta escura para melhorar contraste do texto sobre o fundo. -->
    <div class="hero__vignette" aria-hidden="true" />
    <!-- Conteúdo textual e ações principais. -->
    <div class="hero__container">
      <!-- Badge institucional que enquadra o tema europeu. -->
      <div class="hero__badge">NextGenerationEU</div>

      <h1 id="hero-title" class="hero__title">Mecanismo de<br />Recuperação e Resiliência</h1>

      <p class="hero__subtitle">
        Explore o progresso dos planos europeus de recuperação e resiliência.<br />

        Visualize marcos, metas, indicadores e desembolsos de forma clara e acessível.
      </p>
      <!-- Ações principais para encaminhar o utilizador para análise detalhada. -->
      <div class="hero__actions">
        <RouterLink to="/marcos-metas" class="hero__btn hero__btn--primary">
          Explorar Marcos e Metas

          <IconArrowRight :size="16" />
        </RouterLink>

        <RouterLink to="/comparar-paises" class="hero__btn hero__btn--secondary"> Comparar Países </RouterLink>
      </div>
      <!-- Faixa de estatísticas rápidas por baixo das ações. -->
      <HeroStatsStrip :stats="heroStats" />
    </div>
    <!-- Indicação decorativa de scroll. -->
    <div class="hero__scroll" aria-hidden="true">
      <span class="hero__scroll-text">Desliza para ver mais</span>

      <IconChevronDown :size="24" class="hero__scroll-arrow" />
    </div>
  </section>
</template>

<script setup>
// Componente com a faixa dos valores rápidos do hero.
import HeroStatsStrip from '@/componentes/inicio/FaixaEstatisticasHero.vue'
// Store principal com os dados da homepage.
import { useDashboardStore } from '@/estado/painel'
import { storeToRefs } from 'pinia'
const store = useDashboardStore()
// Estatísticas reativas para permitir futura atualização pela API.
const { heroStats } = storeToRefs(store)
</script>

<style scoped>
/* Secção principal do hero. */
.hero {
  background: var(--color-bg-hero);
  color: var(--color-text-inverse);

  min-height: calc(100vh - var(--header-height));

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px;
  position: relative;
  overflow: hidden;
}
/* Camada de fundo com estrelas da UE. */
.hero__eu-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.hero__eu-stars {
  position: absolute;
  pointer-events: none;
}
/* Anel principal de estrelas, lento e desfocado. */
.hero__eu-stars--main {
  width: min(680px, 88vw);

  height: min(680px, 88vw);
  top: 50%;
  left: 50%;

  margin-top: calc(min(680px, 88vw) / -2 - 4%);

  margin-left: calc(min(680px, 88vw) / -2);
  filter: blur(2px);

  transform-origin: center center;

  animation: euRotate 100s linear infinite;
}
/* Anel secundário de estrelas. */
.hero__eu-stars--bl {
  width: 200px;
  height: 200px;
  bottom: 10%;
  left: 7%;
  filter: blur(3px);

  transform-origin: center center;

  animation: euRotate 130s linear infinite;
}
/* Animação circular das estrelas. */
@keyframes euRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
/* Vinheta para leitura do conteúdo. */
.hero__vignette {
  position: absolute;
  inset: 0;

  background: radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, rgba(13, 38, 128, 0.65) 100%);
  pointer-events: none;
  z-index: 1;
}
/* Bloco central do hero. */
.hero__container {
  max-width: 1520px;
  width: 100%;
  margin: 0 auto;

  padding: 80px var(--container-padding) 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0;
  position: relative;
  z-index: 2;
}
/* Badge superior. */
.hero__badge {
  display: inline-flex;
  align-items: center;
  height: 28px;

  padding: 0 12px;

  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 9999px;
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 24px;
  backdrop-filter: blur(8px);

  background: rgba(255, 255, 255, 0.06);
}
.hero__title {
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.8px;
  color: white;
  margin-bottom: 20px;
  max-width: 820px;
}
.hero__subtitle {
  font-size: clamp(14px, 1.5vw, 18px);
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.65;
  margin-bottom: 32px;
  max-width: 620px;
}
/* Grupo de botões principais. */
.hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 56px;
}
/* Botão base. */
.hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;

  padding: 0 22px;

  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: var(--text-base);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}
.hero__btn--primary {
  background: white;
  color: var(--color-brand-blue);
}
.hero__btn--primary:hover {
  transform: translateY(-2px);

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}
.hero__btn--secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;

  border: 1px solid rgba(255, 255, 255, 0.22);
}
.hero__btn--secondary:hover {
  background: rgba(255, 255, 255, 0.16);

  transform: translateY(-2px);
}
[data-theme='dark'] .hero__btn--primary {
  background: rgba(240, 247, 255, 0.14);
  color: #e6f0ff;

  border: 1px solid rgba(157, 192, 244, 0.26);

  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
[data-theme='dark'] .hero__btn--primary:hover {
  background: rgba(240, 247, 255, 0.18);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 8px 24px rgba(8, 13, 24, 0.18);
}
[data-theme='dark'] .hero__btn--secondary {
  background: rgba(119, 167, 234, 0.08);

  border-color: rgba(157, 192, 244, 0.18);
  color: #eef4ff;
}
[data-theme='dark'] .hero__btn--secondary:hover {
  background: rgba(119, 167, 234, 0.14);
}
/* Indicador inferior de scroll. */
.hero__scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  position: absolute;
  bottom: 28px;
  left: 0;
  right: 0;
  width: fit-content;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.45);
  font-size: var(--text-sm);
  z-index: 2;
  text-align: center;
  pointer-events: none;
}

.hero__scroll-text {
  letter-spacing: 0.3px;
}

.hero__scroll-arrow {
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(7px);
  }
}

@media (max-width: 900px) {
  .hero__container {
    padding: 60px 24px 40px;
  }
}
</style>
