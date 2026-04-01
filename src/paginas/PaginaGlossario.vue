
<!-- Página do glossário com pesquisa, agrupamento e detalhe dos termos. -->
<template>
  
  <div class="gl-page">
    
    <div class="gl-container">

      
      <!-- Cabeçalho da página: introduz o objetivo do glossário antes dos filtros. -->
      <div class="page-hero">
        
        <h1 class="page-hero__title">Glossário PRR</h1>
        
        <p class="page-hero__desc">
          
          Definições de todos os termos técnicos relativos ao Plano de Recuperação e Resiliência
          
          e ao Mecanismo de Recuperação e Resiliência da União Europeia.
        </p>
      </div>

      
      <!-- Controlos de pesquisa e categoria; a página mantém o estado localmente. -->
      <GlossaryControls
        :query="query"
        :activeCategory="activeCategory"
        :categories="CATEGORIES"
        @update:query="query = $event"
        @update:activeCategory="activeCategory = $event"
      />

      
      <!-- Linha de meta-informação: mostra quantos termos estão visíveis e permite limpar filtros. -->
      <div class="gl-meta">
        
        <span class="gl-meta__count">{{ filtered.length }} termos</span>
        
        <span v-if="query || activeCategory !== 'Todos'" class="gl-meta__clear" @click="reset">
          Limpar filtros
        </span>
      </div>

      
      <!-- Índice alfabético gerado apenas com as letras que existem nos resultados atuais. -->
      <div class="gl-alpha" aria-label="Índice alfabético">
        
        <a
          v-for="letter in availableLetters"
          :key="letter"
          :href="`#letter-${letter}`"
          class="gl-alpha__letter"
        >{{ letter }}</a>
      </div>

      
      <!-- Corpo do glossário: agrupa os cartões por letra inicial para facilitar a leitura. -->
      <div class="gl-body" v-scroll-animate>
        
        <template v-for="group in groupedFiltered" :key="group.letter">
          
          <h2 :id="`letter-${group.letter}`" class="gl-letter">{{ group.letter }}</h2>
          
          <div class="gl-cards">
            
            <!-- Cada cartão começa fechado e expande para mostrar definição, exemplo e relações. -->
            <article
              v-for="term in group.terms"
              :key="term.term"
              class="gl-card"
              :class="{ 'gl-card--open': openTerm === term.term }"
            >
              
              <!-- Cabeçalho clicável do termo, usado como controlo acessível de expansão. -->
              <button
                type="button"
                class="gl-card__head"
                @click="toggle(term.term)"
                :aria-expanded="openTerm === term.term"
              >
                
                <div class="gl-card__left">
                  
                  <span class="gl-card__cat" :data-cat="catKey(term.category)">{{ term.category }}</span>
                  
                  <h3 class="gl-card__term">{{ term.term }}</h3>
                  
                  <p class="gl-card__short">{{ term.short }}</p>
                </div>
                
                <IconChevronDown :size="16" class="gl-card__chevron" :style="{ transform: openTerm === term.term ? 'rotate(180deg)' : 'rotate(0)' }" />
              </button>

              
              <!-- Conteúdo detalhado só é renderizado quando o termo está aberto. -->
              <div v-if="openTerm === term.term" class="gl-card__body">
                
                <p class="gl-card__def">{{ term.definition }}</p>

                
                <div v-if="term.example" class="gl-card__example">
                  
                  <span class="gl-card__example-label">Exemplo</span>
                  <p>{{ term.example }}</p>
                </div>

                
                <div v-if="term.related?.length" class="gl-card__related">
                  
                  <span class="gl-card__related-label">Relacionados:</span>
                  
                  <div class="gl-card__related-tags">
                    
                    <button
                      v-for="r in term.related"
                      :key="r"
                      type="button"
                      class="gl-card__rel-tag"
                      @click="query = r"
                    >{{ r }}</button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </template>

        
        <!-- Estado vazio para pesquisas sem resultados. -->
        <div v-if="filtered.length === 0" class="gl-empty">
          
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            
            <path d="M10 6h24l10 10v30a3 3 0 01-3 3H13a3 3 0 01-3-3V9a3 3 0 013-3z" class="gl-empty__stroke" stroke-width="2" stroke-linejoin="round" fill="none"/>
            
            <path d="M34 6v11h10" class="gl-empty__stroke" stroke-width="1.8" stroke-linejoin="round"/>
            
            <path d="M19 24h18M19 30h12" class="gl-empty__stroke" stroke-width="1.8" stroke-linecap="round"/>
            
            <circle cx="36" cy="42" r="7" class="gl-empty__stroke" stroke-width="2"/>
            <path d="M41.5 47.5l5 5" class="gl-empty__stroke" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <p>Nenhum termo encontrado para <strong>«{{ query }}»</strong></p>
          <button type="button" class="gl-empty__btn" @click="reset">Limpar pesquisa</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// Estado reativo e cálculos derivados usados pela página.
import { ref, computed } from 'vue'
// Componente separado para manter a zona de filtros mais simples de ler.
import GlossaryControls from '@/componentes/glossario/ControlosGlossario.vue'
// Composable que carrega o recurso pelo json-server com fallback centralizado.
import { usarRecursoApi } from '@/composicoes/usarRecursoApi'
// Texto livre introduzido na pesquisa.
const query         = ref('')
// Categoria selecionada na pill de filtros.
const activeCategory = ref('Todos')
// Termo atualmente expandido no acordeão.
const openTerm      = ref(null)
// Recurso principal da página.
const resource = usarRecursoApi('glossary')
function toggle(term) {
  // Alterna entre abrir o termo clicado e fechar o termo que já estava aberto.
  openTerm.value = openTerm.value === term ? null : term
}
function reset() {
  // Limpa pesquisa e categoria para regressar à lista completa.
  query.value = ''
  activeCategory.value = 'Todos'
}
function catKey(cat) {
  // Normaliza a categoria para ser usada em data-attributes de CSS.
  return cat.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
// Lista completa de termos disponível no recurso ativo.
const TERMS = computed(() => resource.value.terms)
// Ordem das categorias lida do recurso ativo.
const CATEGORY_ORDER = computed(() => resource.value.categoryOrder ?? [])
// Categorias visíveis; só aparecem as que têm pelo menos um termo associado.
const CATEGORIES = computed(() => ['Todos', ...CATEGORY_ORDER.value.filter((category) =>
  TERMS.value.some((term) => term.category === category)
)])
// Filtro combinado por categoria e texto pesquisado.
const filtered = computed(() => {
  const q = query.value.toLowerCase().trim()
  return TERMS.value.filter((t) => {
    const matchCat  = activeCategory.value === 'Todos' || t.category === activeCategory.value
    const matchText = !q ||
      t.term.toLowerCase().includes(q) ||
      t.short.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q)
    return matchCat && matchText
  })
})
// Agrupa os termos filtrados pela primeira letra para construir o índice alfabético.
const groupedFiltered = computed(() => {
  const groups = {}
  filtered.value.forEach(t => {
    const letter = t.term[0].toUpperCase()
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(t)
  })
  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b, 'pt'))
    .map(([letter, terms]) => ({ letter, terms }))
})
// Letras que aparecem no índice superior.
const availableLetters = computed(() =>
  groupedFiltered.value.map(g => g.letter)
)
</script>

<style scoped>

/* Estrutura base da página. */
.gl-page      { background: var(--color-bg-page); min-height: 100vh; padding-bottom: 80px; }

.gl-container { max-width: 1520px; margin: 0 auto; padding: 0 var(--container-padding); }
/* Layout dos controlos de pesquisa e categoria. */
.gl-controls {
  
  display: flex; flex-direction: column; gap: 12px;
  margin: 0 32px 12px;
}
.gl-search {
  
  display: flex; align-items: center; gap: 8px;
  
  background: var(--color-bg-white); border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md); padding: 11px 12px;
  
  transition: border-color .15s, box-shadow .15s;
}
.gl-search--focus {
  
  border-color: var(--color-brand-blue);
  
  box-shadow: 0 0 0 3px rgba(29,69,135,.06);
}

.gl-search__icon  { flex-shrink: 0; color: var(--color-text-secondary); }
.gl-search__input {
  
  flex: 1; border: none; outline: none; background: transparent;
  
  font-family: var(--font-family); font-size: var(--text-base); color: var(--color-text-primary);
}

.gl-search__input::placeholder { color: var(--color-text-secondary); }
.gl-search__clear {
  
  background: none; border: none; cursor: pointer; color: var(--color-text-secondary);
  
  padding: 0; display: flex; align-items: center;
}

.gl-search__clear:hover { color: var(--color-text-primary); }


.gl-cats { display: flex; gap: 6px; flex-wrap: wrap; }
.gl-cat {
  height: 30px; padding: 0 12px;
  
  border: 1px solid var(--color-border); border-radius: var(--radius-full);
  
  background: var(--color-bg-white);
  
  font-family: var(--font-family); font-size: var(--text-sm); font-weight: 500;
  
  color: var(--color-text-secondary); cursor: pointer; white-space: nowrap;
  transition: all .15s;
}

.gl-cat:hover { border-color: rgba(29,69,135,.35); color: var(--color-brand-blue); }
.gl-cat--active {
  
  background: var(--color-brand-blue); border-color: var(--color-brand-blue);
  color: white;
}
/* Informação de contagem e botão textual para limpar filtros ativos. */
.gl-meta {
  
  display: flex; align-items: center; gap: 12px;
  
  margin: 0 32px 12px; font-size: var(--text-sm); color: var(--color-text-secondary);
}

.gl-meta__count { font-weight: 500; color: var(--color-text-primary); }

.gl-meta__clear { cursor: pointer; color: var(--color-brand-blue); text-decoration: underline; text-underline-offset: 2px; }
/* Índice alfabético compacto. */
.gl-alpha {
  
  display: flex; flex-wrap: wrap; gap: 4px;
  margin: 0 32px 24px;
}
.gl-alpha__letter {
  
  width: 28px; height: 28px; border-radius: var(--radius-sm);
  
  background: var(--color-bg-white); border: 1px solid var(--color-border);
  
  display: inline-flex; align-items: center; justify-content: center;
  
  font-size: var(--text-sm); font-weight: 600; color: var(--color-text-secondary);
  
  text-decoration: none; transition: all .15s;
}
.gl-alpha__letter:hover {
  
  background: var(--color-brand-blue); color: white; border-color: var(--color-brand-blue);
}


/* Lista principal de grupos e cartões. */
.gl-body { margin: 0 32px; }
.gl-letter {
  
  font-size: 22px; font-weight: 700; color: var(--color-brand-blue);
  
  border-bottom: 2px solid var(--color-brand-blue-10);
  
  padding-bottom: 6px; margin-top: 32px; margin-bottom: 12px;
  scroll-margin-top: 80px;
}


.gl-cards { display: flex; flex-direction: column; gap: 6px; }
/* Cartão individual de termo. */
.gl-card {
  
  background: var(--color-bg-white);
  
  border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md);
  overflow: hidden;
  
  transition: border-color .15s, box-shadow .15s;
}
.gl-card--open,

.gl-card:hover { border-color: rgba(29,69,135,.2); }

.gl-card--open { box-shadow: 0 2px 12px rgba(29,69,135,.06); }
.gl-card__head {
  
  width: 100%; display: flex; align-items: flex-start; gap: 12px;
  
  padding: 16px 20px; background: none; border: none; cursor: pointer;
  
  text-align: left; font-family: var(--font-family);
}

.gl-card--open .gl-card__head { background: rgba(29,69,135,.03); }

.gl-card__head:hover { background: rgba(29,69,135,.03); }


.gl-card__left { flex: 1; min-width: 0; }
/* Pill da categoria do termo. */
.gl-card__cat {
  
  display: inline-flex; align-items: center; justify-content: center;
  
  height: 22px; padding: 0 10px;
  
  border-radius: var(--radius-full); border: 1px solid;
  
  font-size: 11px; font-weight: 600; line-height: 1;
  
  margin-bottom: 6px; white-space: nowrap;
}

.gl-card__cat[data-cat="estrutura"]    { background: rgba(29,69,135,.08); border-color: rgba(29,69,135,.2); color: #1d4587; }

.gl-card__cat[data-cat="execucao"]     { background: rgba(0,142,62,.08);  border-color: rgba(0,142,62,.2);  color: #008e3e; }

.gl-card__cat[data-cat="financiamento"]{ background: rgba(180,90,0,.08);  border-color: rgba(180,90,0,.2);  color: #b45a00; }

.gl-card__cat[data-cat="avaliacao"]    { background: rgba(91,33,182,.08); border-color: rgba(91,33,182,.2); color: #5b21b6; }

.gl-card__cat[data-cat="governacao"]   { background: rgba(71,85,105,.08); border-color: rgba(71,85,105,.2); color: #475569; }

.gl-card__cat[data-cat="indicadores"]  { background: rgba(6,182,212,.08); border-color: rgba(6,182,212,.2); color: #0891b2; }
[data-theme="dark"] .gl-card__cat {
  
  font-weight: 700;
  
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
}
[data-theme="dark"] .gl-card__cat[data-cat="estrutura"] {
  
  background: rgba(119,167,234,.16);
  
  border-color: rgba(157,192,244,.26);
  
  color: #cfe1fb;
}
[data-theme="dark"] .gl-card__cat[data-cat="execucao"] {
  
  background: rgba(34,197,94,.16);
  
  border-color: rgba(106,218,129,.24);
  
  color: #97ebb2;
}
[data-theme="dark"] .gl-card__cat[data-cat="financiamento"] {
  
  background: rgba(245,158,11,.16);
  
  border-color: rgba(251,191,36,.24);
  
  color: #ffd98f;
}
[data-theme="dark"] .gl-card__cat[data-cat="avaliacao"] {
  
  background: rgba(167,139,250,.18);
  
  border-color: rgba(196,181,253,.24);
  
  color: #e2d7ff;
}
[data-theme="dark"] .gl-card__cat[data-cat="governacao"] {
  
  background: rgba(148,163,184,.18);
  
  border-color: rgba(176,189,207,.22);
  
  color: #dde6f1;
}
[data-theme="dark"] .gl-card__cat[data-cat="indicadores"] {
  
  background: rgba(34,211,238,.16);
  
  border-color: rgba(103,232,249,.24);
  
  color: #bbf4ff;
}


.gl-card__term  { font-size: var(--text-base); font-weight: 600; color: var(--color-text-primary); margin-bottom: 3px; }

.gl-card__short { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.4; }


.gl-card__chevron { flex-shrink: 0; color: var(--color-text-secondary); margin-top: 2px; transition: transform .2s ease; }
.gl-card__body {
  
  padding: 0 20px 20px;
  
  border-top: 1px solid var(--color-border);
}

.gl-card__def { font-size: var(--text-base); color: var(--color-text-primary); line-height: 1.65; margin-top: 14px; }
.gl-card__example {
  
  margin-top: 14px; padding: 12px 14px;
  
  background: rgba(29,69,135,.04); border-left: 3px solid var(--color-brand-blue);
  
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}
.gl-card__example-label {
  
  display: block; font-size: 11px; font-weight: 700; color: var(--color-brand-blue);
  
  text-transform: uppercase; letter-spacing: .6px; margin-bottom: 5px;
}

.gl-card__example p { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.5; margin: 0; }


.gl-card__related { margin-top: 14px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

.gl-card__related-label { font-size: var(--text-sm); color: var(--color-text-secondary); white-space: nowrap; }

.gl-card__related-tags  { display: flex; gap: 6px; flex-wrap: wrap; }
.gl-card__rel-tag {
  
  height: 24px; padding: 0 10px;
  
  background: var(--color-bg-page); border: 1px solid var(--color-border);
  
  border-radius: var(--radius-full); font-family: var(--font-family);
  
  font-size: var(--text-sm); color: var(--color-brand-blue); cursor: pointer;
  transition: all .15s;
}

.gl-card__rel-tag:hover { background: var(--color-brand-blue-10); border-color: rgba(29,69,135,.3); }
.gl-empty {
  
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  
  padding: 64px 24px; text-align: center;
  
  color: var(--color-text-secondary); font-size: var(--text-base);
}

.gl-empty strong { color: var(--color-text-primary); }

.gl-empty__stroke { stroke: var(--color-border); }
.gl-empty__btn {
  
  height: 32px; padding: 0 16px;
  
  background: none; border: 1px solid var(--color-border); border-radius: var(--radius-sm);
  
  font-family: var(--font-family); font-size: var(--text-sm); font-weight: 500;
  
  color: var(--color-brand-blue); cursor: pointer; transition: background .15s;
}

.gl-empty__btn:hover { background: var(--color-brand-blue-10); }


@media (max-width: 640px) {
  
  .gl-controls, .gl-meta, .gl-alpha, .gl-body { margin-left: 0; margin-right: 0; }
  
  .gl-container { padding: 0 20px; }
}
</style>
