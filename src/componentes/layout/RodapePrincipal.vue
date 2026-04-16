<!--
  Rodapé comum a toda a aplicação.
  Reúne a descrição do projeto e ligações úteis.
-->
<template>
  <!-- Bloco principal do rodapé. -->
  <footer class="footer">
    <!-- Grelha superior com marca e navegação. -->
    <div class="footer__inner">
      <!-- Coluna da marca e da descrição. -->
      <div class="footer__brand">
        <RouterLink to="/" class="footer__logo" aria-label="Europium — Início">
          <img src="/eu-flag.webp" alt="" class="footer__logo-flag" width="46" height="31" />
          <div class="footer__logo-text">
            <span class="footer__logo-name">Europium</span>
            <span class="footer__logo-tagline">Recuperação e Resiliência</span>
          </div>
        </RouterLink>
        <!-- Pequena descrição do objetivo da plataforma. -->
        <p class="footer__description">
          Plataforma de visualização de dados do Mecanismo de Recuperação e Resiliência da União Europeia. Dados
          baseados no <em>EU Recovery and Resilience Scoreboard</em>.
        </p>
        <!-- Ligação para a fonte oficial dos dados. -->
        <a
          href="https://ec.europa.eu/economy_finance/recovery-and-resilience-scoreboard/"
          target="_blank"
          rel="noopener"
          class="footer__source-link"
          >EU Recovery and Resilience Scoreboard →</a
        >
      </div>
      <!-- Coluna com páginas principais da plataforma. -->
      <div class="footer__col">
        <h3 class="footer__section-title">Plataforma</h3>
        <nav class="footer__nav">
          <RouterLink to="/" class="footer__nav-link">Início</RouterLink>
          <RouterLink to="/marcos-metas" class="footer__nav-link">Marcos e Metas</RouterLink>
          <RouterLink to="/indicadores" class="footer__nav-link">Indicadores Comuns</RouterLink>
          <RouterLink to="/desembolsos" class="footer__nav-link">Desembolsos</RouterLink>
          <RouterLink to="/comparar-paises" class="footer__nav-link">Comparar Países</RouterLink>
        </nav>
      </div>
      <!-- Coluna com recursos adicionais. -->
      <div class="footer__col">
        <h3 class="footer__section-title">Recursos</h3>
        <nav class="footer__nav">
          <RouterLink to="/mapa" class="footer__nav-link">Mapa UE</RouterLink>
          <RouterLink to="/glossario" class="footer__nav-link">Glossário MRR</RouterLink>
          <RouterLink to="/linha-tempo" class="footer__nav-link">Linha do Tempo</RouterLink>
          <RouterLink to="/mais" class="footer__nav-link">Ver mais</RouterLink>
        </nav>
      </div>
    </div>
    <!-- Faixa inferior com os créditos. -->
    <div class="footer__bottom">
      <div class="footer__bottom-inner">
        <span class="footer__credits">Europium by Bruno, Diogo &amp; Vera</span>
        <span class="footer__sep" aria-hidden="true">·</span>
        <span class="footer__credits footer__credits--muted">UC Interface Pessoa-Máquina</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Este componente não precisa de lógica JavaScript.
// O conteúdo do rodapé é estático e está definido diretamente no template, a parte visual do componente.
</script>

<style scoped>
/* Bloco exterior do rodapé comum. */
.footer {
  /* Usa o mesmo fundo dos cartões para separar o rodapé da página. */
  background: var(--color-bg-white);
  /* Linha superior que marca o início do rodapé. */
  border-top: 0.8px solid var(--color-border);
  /* Afasta o rodapé do conteúdo anterior. */
  margin-top: 60px;
}
.footer__inner {
  /* Mantém a largura alinhada com o resto da aplicação. */
  max-width: 1520px;
  /* Centra o conteúdo do rodapé. */
  margin: 0 auto;
  /* Espaçamento interno superior e inferior. */
  padding: 52px var(--container-padding) 44px;
  /* Organiza marca e navegação em colunas. */
  display: grid;
  /* Dá mais largura à coluna descritiva. */
  grid-template-columns: 2fr 1fr 1fr;
  /* Espaço horizontal entre colunas. */
  gap: 64px;
  /* Alinha as colunas pelo topo. */
  align-items: start;
}
.footer__brand {
  /* Organiza logótipo, descrição e fonte oficial em coluna. */
  display: flex;
  /* Direção vertical do conteúdo da marca. */
  flex-direction: column;
  /* Espaçamento entre elementos da coluna. */
  gap: 16px;
}
.footer__logo {
  /* Permite alinhar bandeira e texto do logótipo. */
  display: inline-flex;
  /* Centra verticalmente bandeira e texto. */
  align-items: center;
  /* Espaço entre bandeira e nome. */
  gap: 10px;
  /* Remove sublinhado do RouterLink. */
  text-decoration: none;
}

.footer__logo-flag {
  border-radius: 5px;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
}

.footer__logo-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footer__logo-name {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1;
}

.footer__logo-tagline {
  font-size: 11px;
  color: var(--color-text-secondary);
  line-height: 1;
}
.footer__description {
  /* Texto explicativo do objetivo do projeto. */
  font-size: var(--text-base);
  /* Usa cor secundária por ser texto de apoio. */
  color: var(--color-text-secondary);
  /* Aumenta a leitura em linhas longas. */
  line-height: 1.65;
  /* Limita largura para não formar linhas demasiado compridas. */
  max-width: 340px;
}

.footer__description em {
  font-style: italic;
}
.footer__source-link {
  /* Link para a fonte oficial dos dados. */
  display: inline-block;
  /* Tamanho menor do que o texto principal. */
  font-size: var(--text-sm);
  /* Azul de marca para indicar ação. */
  color: var(--color-brand-blue);
  /* Sublinhado explícito por ser link externo importante. */
  text-decoration: underline;
  /* Afasta o sublinhado do texto. */
  text-underline-offset: 2px;
  /* Suaviza o hover, o estado ao passar o rato. */
  transition: opacity 0.15s;
}

.footer__source-link:hover {
  opacity: 0.7;
}
.footer__section-title {
  /* Título das colunas de navegação. */
  font-size: var(--text-base);
  /* Dá peso visual ao cabeçalho. */
  font-weight: 600;
  /* Usa cor principal por ser título. */
  color: var(--color-text-primary);
  /* Separa o título dos links. */
  margin-bottom: 18px;
}
.footer__nav {
  /* Navegação vertical. */
  display: flex;
  /* Coloca um link por linha. */
  flex-direction: column;
  /* Espaço entre links. */
  gap: 12px;
}
.footer__nav-link {
  /* Tamanho dos links do rodapé. */
  font-size: var(--text-base);
  /* Cor secundária para não competir com o conteúdo principal. */
  color: var(--color-text-secondary);
  /* Remove sublinhado visual por defeito. */
  text-decoration: none;
  /* Suaviza a mudança de cor no hover, o estado ao passar o rato. */
  transition: color 0.15s;
  /* Altura confortável para leitura. */
  line-height: 1.4;
}

.footer__nav-link:hover {
  color: var(--color-brand-blue);
}
.footer__bottom {
  /* Linha separadora entre conteúdo do rodapé e créditos. */
  border-top: 0.8px solid var(--color-border);
}
.footer__bottom-inner {
  /* Alinha a faixa inferior com a largura geral do site. */
  max-width: 1520px;
  /* Centra horizontalmente. */
  margin: 0 auto;
  /* Mantém o mesmo padding lateral do layout. */
  padding: 0 var(--container-padding);
  /* Altura fixa da faixa inferior em desktop. */
  height: 48px;
  /* Organiza créditos na horizontal. */
  display: flex;
  /* Centra verticalmente os créditos. */
  align-items: center;
  /* Centra horizontalmente a faixa de créditos. */
  justify-content: center;
  /* Espaço entre textos e separador. */
  gap: 8px;
}

.footer__credits {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.footer__credits--muted {
  color: #b0b0b0;
}

.footer__sep {
  color: var(--color-border);
  font-size: var(--text-sm);
}

@media (max-width: 1024px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    padding: 40px 40px 36px;
  }

  .footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 20px 28px;
  }

  .footer__bottom-inner {
    padding: 0 20px;
    flex-wrap: wrap;
    height: auto;
    padding: 14px 20px;
  }
}
</style>
