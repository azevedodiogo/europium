<!-- Painel dos beneficiários com pesquisa, paginação e exportação. -->
<template>
  <!-- Tabpanel dos beneficiários; fica ativo quando o separador correspondente está selecionado. -->
  <div class="des-tabpanel des-tabpanel--ben" role="tabpanel" :id="panelId" :aria-labelledby="labelledBy">
    <!-- Cabeçalho com título, subtítulo contextual e exportação dos resultados filtrados. -->
    <div class="ben-heading-row">
      <div>
        <h2 class="ben-title">
          <IconCircleCheckFilled :size="20" class="ben-title__icon" />
          Top 100 Maiores Beneficiários
        </h2>

        <p class="ben-subtitle">{{ beneficiariesSubtitle }}</p>
      </div>
      <!-- Exporta apenas os beneficiários atualmente filtrados/pesquisados. -->
      <AppExportMenu
        filename="beneficiarios-mrr"
        document-label="Top Beneficiários"
        :dataCount="filteredBen.length"
        :data="exportData"
        :fileContext="exportContext"
        :detailParts="exportDetails"
      />
    </div>
    <!-- Pesquisa local por nome, projeto, setor ou país. -->
    <div class="ben-search-wrap">
      <div class="ben-search" :class="{ 'ben-search--focus': searchFocused }">
        <IconSearch :size="16" class="ben-search__icon" />
        <!-- O valor é controlado pela página pai através de v-model manual. -->
        <input
          :value="searchQuery"
          type="text"
          class="ben-search__input"
          placeholder="Pesquisar beneficiário ou projeto..."
          aria-label="Pesquisar beneficiário ou projeto"
          @focus="searchFocused = true"
          @blur="searchFocused = false"
          @input="handleSearchInput"
        />
        <!-- Botão de limpeza só aparece quando há texto pesquisado. -->
        <button
          v-if="searchQuery"
          type="button"
          class="ben-search__clear"
          aria-label="Limpar pesquisa"
          @click="clearSearch"
        >
          <IconX :size="14" />
        </button>
      </div>
    </div>
    <!-- Resumo dos resultados visíveis e do total financeiro filtrado. -->
    <div class="ben-summary">
      <span class="ben-summary__count">A mostrar {{ paginatedBen.length }} beneficiários</span>

      <span class="ben-summary__sep" aria-hidden="true">·</span>

      <span class="ben-summary__total">Total: {{ filteredTotal }}</span>
    </div>
    <!-- Tabela principal dos beneficiários. -->
    <div class="ben-table-wrap">
      <table class="ben-table" aria-label="Top 100 maiores beneficiários">
        <thead>
          <tr>
            <th class="ben-th ben-th--num" scope="col">#</th>

            <th class="ben-th ben-th--name" scope="col">Beneficiário</th>

            <th v-if="showCountryColumn" class="ben-th ben-th--country" scope="col">País</th>

            <th class="ben-th ben-th--sec" scope="col">Setor</th>

            <th class="ben-th ben-th--amt" scope="col">Montante</th>

            <th class="ben-th ben-th--proj" scope="col">Projeto</th>
          </tr>
        </thead>
        <tbody>
          <!-- A tabela recebe apenas a página atual, já filtrada e paginada. -->
          <tr v-for="row in paginatedBen" :key="row.id" class="ben-tr">
            <td class="ben-td ben-td--num">
              <div class="ben-num">{{ row.rank }}</div>
            </td>

            <td class="ben-td ben-td--name">
              <span class="ben-name">{{ row.name }}</span>
            </td>

            <td v-if="showCountryColumn" class="ben-td ben-td--country">
              {{ row.countryFlag }} {{ row.countryLabel }}
            </td>

            <td class="ben-td ben-td--sec">
              <span class="ben-pill" :data-sector="sectorKey(row.sector)">{{ row.sector }}</span>
            </td>

            <td class="ben-td ben-td--amt">{{ row.amount }}</td>

            <td class="ben-td ben-td--proj">{{ row.project }}</td>
          </tr>
          <!-- Estado vazio usado quando a pesquisa não encontra beneficiários. -->
          <tr v-if="paginatedBen.length === 0">
            <td :colspan="beneficiariesColspan" class="ben-empty-cell">
              <div class="ben-empty">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="5" class="ben-empty__stroke" stroke-width="1.5" />

                  <path
                    d="M3 24v-2a7 7 0 0114 0v2"
                    class="ben-empty__stroke"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />

                  <circle cx="22" cy="18" r="4" class="ben-empty__stroke" stroke-width="1.4" />

                  <path d="M25 21l2.5 2.5" class="ben-empty__stroke" stroke-width="1.4" stroke-linecap="round" />
                </svg>

                Nenhum beneficiário encontrado para "{{ searchQuery }}"
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Paginação controlada pela página pai para manter os cálculos centralizados. -->
    <div class="ben-pagination">
      <span class="ben-page-info">Página {{ currentPage }} de {{ totalPages }}</span>

      <div class="ben-page-btns">
        <button
          type="button"
          class="ben-page-btn"
          :disabled="currentPage === 1"
          @click="$emit('update:currentPage', currentPage - 1)"
        >
          <IconChevronLeft :size="16" />
          Anterior
        </button>

        <button
          type="button"
          class="ben-page-btn"
          :disabled="currentPage === totalPages || totalPages === 0"
          @click="$emit('update:currentPage', currentPage + 1)"
        >
          Seguinte

          <IconChevronRight :size="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Estado local simples para destacar o foco visual da pesquisa.
import { ref } from 'vue'
// Menu de exportação reutilizável da aplicação.
import AppExportMenu from '@/components/app/MenuExportacaoApp.vue'
// Controla a classe visual de foco no campo de pesquisa.
const searchFocused = ref(false)
// Propriedades recebidas da página de disbursements.
defineProps({
  // Texto que explica se a lista é agregada ou de um país específico.
  beneficiariesSubtitle: {
    type: String,
    default: '',
  },
  // Lista completa filtrada, usada para contagem e exportação.
  filteredBen: {
    type: Array,
    default: () => [],
  },
  // Subconjunto da página atual.
  paginatedBen: {
    type: Array,
    default: () => [],
  },
  // Total financeiro dos beneficiários filtrados.
  filteredTotal: {
    type: String,
    default: '',
  },
  // Indica se a tabela precisa da coluna de país.
  showCountryColumn: {
    type: Boolean,
    default: false,
  },
  // Número de colunas usado no estado vazio.
  beneficiariesColspan: {
    type: Number,
    default: 5,
  },
  // Total de páginas calculado na página pai.
  totalPages: {
    type: Number,
    default: 1,
  },
  // Página atualmente selecionada.
  currentPage: {
    type: Number,
    default: 1,
  },
  // Texto de pesquisa controlado de fora.
  searchQuery: {
    type: String,
    default: '',
  },
  // Partes usadas para compor o nome do ficheiro exportado.
  exportContext: {
    type: Array,
    default: () => [],
  },
  // Detalhes apresentados na notificação de exportação.
  exportDetails: {
    type: Array,
    default: () => [],
  },
  // Dados completos dos beneficiários filtrados para descarregar em ficheiro.
  exportData: {
    type: Array,
    default: () => [],
  },
  panelId: {
    type: String,
    default: undefined,
  },
  labelledBy: {
    type: String,
    default: undefined,
  },
})
// Eventos que atualizam pesquisa e página no componente pai.
const emit = defineEmits(['update:searchQuery', 'update:currentPage'])
function handleSearchInput(event) {
  // Qualquer nova pesquisa regressa à primeira página.
  emit('update:searchQuery', event.target.value)
  emit('update:currentPage', 1)
}
function clearSearch() {
  // Limpa o texto e evita que o utilizador fique numa página sem resultados.
  emit('update:searchQuery', '')
  emit('update:currentPage', 1)
}
function sectorKey(sector) {
  // Traduz o nome do setor para uma chave curta usada nos estilos das pills.
  const mapping = {
    Transportes: 'transport',
    Infraestruturas: 'infra',
    Habitação: 'housing',
    'Administração Pública': 'admin',
    'Administração Local': 'local',
    Educação: 'edu',
    Energia: 'energy',
    Ambiente: 'env',
    Saúde: 'health',
    Emprego: 'employ',
    Ciência: 'science',
    Economia: 'econ',
    Desporto: 'sport',
    Financeiro: 'fin',
    Serviços: 'srv',
    Tecnologia: 'tech',
  }
  return mapping[sector] ?? 'default'
}
</script>

<style scoped>
/* Estrutura geral do painel dos beneficiários. */
.des-tabpanel {
  margin: 8px 32px 0;

  display: flex;
  flex-direction: column;
}
.des-tabpanel--ben {
  gap: 16px;
}
/* Cabeçalho com título e exportação. */
.ben-heading-row {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;
  gap: 16px;
}
.ben-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}
.ben-title__icon {
  color: var(--color-brand-blue);
}
.ben-subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}
/* Campo de pesquisa. */
.ben-search {
  display: flex;
  align-items: center;

  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);
  padding: 12px;

  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
.ben-search--focus {
  border-color: var(--color-brand-blue);

  box-shadow: 0 0 0 3px rgba(29, 69, 135, 0.06);
}
.ben-search__icon {
  color: var(--color-text-secondary);
  flex-shrink: 0;
  margin-right: 8px;
}
/* Input transparente para acompanhar o fundo da pesquisa. */
.ben-search__input {
  flex: 1;
  border: none;
  outline: none;

  background: transparent;

  font-family: var(--font-family);
  font-size: var(--text-base);
  color: var(--color-text-primary);
}
.ben-search__input::placeholder {
  color: var(--color-text-secondary);
}
.ben-search__clear {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);

  padding: 0;

  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.ben-search__clear:hover {
  color: var(--color-text-primary);
}
.ben-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}
.ben-summary__count {
  color: var(--color-text-primary);
  font-weight: 500;
}
.ben-summary__sep {
  color: var(--color-border);
}
.ben-table-wrap {
  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);
  overflow-x: auto;
  overflow-y: hidden;
}
.ben-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-base);
}
.ben-th {
  background: rgba(234, 239, 245, 0.5);

  border-bottom: 0.8px solid var(--color-border);
  padding: 11px 8px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  text-align: left;
  white-space: nowrap;
}
.ben-th--num {
  width: 56px;

  padding-left: 18px;
}
.ben-th--country {
  width: 110px;
}
.ben-th--amt {
  width: 110px;
  text-align: right;

  padding-right: 16px;
}
.ben-th--sec {
  width: 180px;
}
.ben-tr {
  border-bottom: 0.8px solid var(--color-border);
  transition: background 0.1s;
}
.ben-tr:last-child {
  border-bottom: none;
}
.ben-tr:hover {
  background: rgba(249, 250, 251, 0.9);
}
.ben-td {
  padding: 0 8px;
  height: 44.8px;
  vertical-align: middle;
  color: var(--color-text-primary);
}
.ben-td--num {
  padding-left: 18px;
}
.ben-td--country {
  white-space: nowrap;
  color: var(--color-text-secondary);
}
.ben-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;

  background: rgba(29, 69, 135, 0.07);

  border: 1px solid var(--color-border);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  font-weight: 500;
}
.ben-name {
  display: inline-flex;
  align-items: center;
  min-height: 44.8px;
  font-weight: 500;
}
.ben-td--amt {
  text-align: right;
  font-weight: 500;

  padding-right: 16px;
  white-space: nowrap;
}
.ben-td--proj {
  color: var(--color-text-secondary);
}
.ben-pill {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 9px;

  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: 500;
  border: 1px solid;
  white-space: nowrap;
}

.ben-pill[data-sector='transport'] {
  background: rgba(29, 69, 135, 0.08);
  border-color: rgba(29, 69, 135, 0.2);
  color: #1d4587;
}

.ben-pill[data-sector='infra'] {
  background: rgba(100, 100, 200, 0.08);
  border-color: rgba(100, 100, 200, 0.2);
  color: #4040aa;
}

.ben-pill[data-sector='housing'] {
  background: rgba(14, 116, 144, 0.08);
  border-color: rgba(14, 116, 144, 0.2);
  color: #0e7490;
}

.ben-pill[data-sector='admin'] {
  background: rgba(71, 85, 105, 0.08);
  border-color: rgba(71, 85, 105, 0.2);
  color: #475569;
}

.ben-pill[data-sector='local'] {
  background: rgba(71, 85, 105, 0.08);
  border-color: rgba(71, 85, 105, 0.2);
  color: #475569;
}

.ben-pill[data-sector='edu'] {
  background: rgba(124, 58, 237, 0.08);
  border-color: rgba(124, 58, 237, 0.2);
  color: #7c3aed;
}

.ben-pill[data-sector='energy'] {
  background: rgba(234, 179, 8, 0.1);
  border-color: rgba(234, 179, 8, 0.3);
  color: #a16207;
}

.ben-pill[data-sector='env'] {
  background: rgba(0, 142, 62, 0.08);
  border-color: rgba(0, 142, 62, 0.2);
  color: #008e3e;
}

.ben-pill[data-sector='health'] {
  background: rgba(220, 38, 38, 0.08);
  border-color: rgba(220, 38, 38, 0.2);
  color: #dc2626;
}

.ben-pill[data-sector='employ'] {
  background: rgba(20, 184, 166, 0.08);
  border-color: rgba(20, 184, 166, 0.2);
  color: #0d9488;
}

.ben-pill[data-sector='science'] {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
  color: #2563eb;
}

.ben-pill[data-sector='econ'] {
  background: rgba(180, 90, 0, 0.08);
  border-color: rgba(180, 90, 0, 0.2);
  color: #b45a00;
}

.ben-pill[data-sector='sport'] {
  background: rgba(249, 115, 22, 0.08);
  border-color: rgba(249, 115, 22, 0.2);
  color: #ea580c;
}

.ben-pill[data-sector='fin'] {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.2);
  color: #059669;
}

.ben-pill[data-sector='srv'] {
  background: rgba(99, 102, 241, 0.08);
  border-color: rgba(99, 102, 241, 0.2);
  color: #4f46e5;
}

.ben-pill[data-sector='tech'] {
  background: rgba(6, 182, 212, 0.08);
  border-color: rgba(6, 182, 212, 0.2);
  color: #0891b2;
}

.ben-pill[data-sector='default'] {
  background: rgba(100, 116, 139, 0.08);
  border-color: rgba(100, 116, 139, 0.2);
  color: #64748b;
}
.ben-empty-cell {
  padding: 40px 16px;
}
.ben-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--color-text-secondary);
  font-size: var(--text-base);
}
.ben-empty__stroke {
  stroke: var(--color-border);
}
.ben-pagination {
  display: flex;
  align-items: center;

  justify-content: space-between;

  padding-top: 4px;
}
.ben-page-info {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}
.ben-page-btns {
  display: flex;
  gap: 8px;
}
.ben-page-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;

  padding: 0 12px;

  border: 1px solid var(--color-border);

  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-primary);

  background: var(--color-bg-white);
  cursor: pointer;
  transition: background 0.15s;
}
.ben-page-btn:hover:not(:disabled) {
  background: var(--color-progress-bg);
}
.ben-page-btn:disabled {
  opacity: 0.4;

  cursor: not-allowed;
}
[data-theme='dark'] .ben-tr:hover {
  background: rgba(119, 167, 234, 0.08);
}
[data-theme='dark'] .ben-th {
  background: rgba(232, 240, 252, 0.06);

  color: var(--color-text-primary);
}
[data-theme='dark'] .ben-num {
  background: rgba(119, 167, 234, 0.12);

  border-color: var(--color-border);
}
[data-theme='dark'] .ben-td--country,
[data-theme='dark'] .ben-td--proj {
  color: #c8d5e5;
}
[data-theme='dark'] .ben-pill {
  font-weight: 600;

  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

[data-theme='dark'] .ben-pill[data-sector='transport'] {
  background: rgba(119, 167, 234, 0.16);
  border-color: rgba(157, 192, 244, 0.26);
  color: #cfe1fb;
}

[data-theme='dark'] .ben-pill[data-sector='infra'] {
  background: rgba(140, 144, 255, 0.16);
  border-color: rgba(165, 170, 255, 0.24);
  color: #d4d6ff;
}

[data-theme='dark'] .ben-pill[data-sector='housing'] {
  background: rgba(52, 180, 203, 0.16);
  border-color: rgba(94, 214, 236, 0.22);
  color: #b9f0fb;
}

[data-theme='dark'] .ben-pill[data-sector='admin'] {
  background: rgba(148, 163, 184, 0.18);
  border-color: rgba(176, 189, 207, 0.22);
  color: #dde6f1;
}

[data-theme='dark'] .ben-pill[data-sector='local'] {
  background: rgba(148, 163, 184, 0.18);
  border-color: rgba(176, 189, 207, 0.22);
  color: #dde6f1;
}

[data-theme='dark'] .ben-pill[data-sector='edu'] {
  background: rgba(167, 139, 250, 0.18);
  border-color: rgba(196, 181, 253, 0.24);
  color: #e2d7ff;
}

[data-theme='dark'] .ben-pill[data-sector='energy'] {
  background: rgba(245, 158, 11, 0.16);
  border-color: rgba(251, 191, 36, 0.24);
  color: #ffd98f;
}

[data-theme='dark'] .ben-pill[data-sector='env'] {
  background: rgba(34, 197, 94, 0.16);
  border-color: rgba(106, 218, 129, 0.24);
  color: #97ebb2;
}

[data-theme='dark'] .ben-pill[data-sector='health'] {
  background: rgba(248, 113, 113, 0.16);
  border-color: rgba(252, 165, 165, 0.24);
  color: #ffc2c2;
}

[data-theme='dark'] .ben-pill[data-sector='employ'] {
  background: rgba(45, 212, 191, 0.16);
  border-color: rgba(94, 234, 212, 0.24);
  color: #adf5e9;
}

[data-theme='dark'] .ben-pill[data-sector='science'] {
  background: rgba(96, 165, 250, 0.16);
  border-color: rgba(147, 197, 253, 0.24);
  color: #d1e7ff;
}

[data-theme='dark'] .ben-pill[data-sector='econ'] {
  background: rgba(245, 158, 11, 0.16);
  border-color: rgba(251, 191, 36, 0.24);
  color: #ffd98f;
}

[data-theme='dark'] .ben-pill[data-sector='sport'] {
  background: rgba(251, 146, 60, 0.16);
  border-color: rgba(253, 186, 116, 0.24);
  color: #ffd2a7;
}

[data-theme='dark'] .ben-pill[data-sector='fin'] {
  background: rgba(52, 211, 153, 0.16);
  border-color: rgba(110, 231, 183, 0.24);
  color: #b7f5d7;
}

[data-theme='dark'] .ben-pill[data-sector='srv'] {
  background: rgba(129, 140, 248, 0.16);
  border-color: rgba(165, 180, 252, 0.24);
  color: #d7ddff;
}

[data-theme='dark'] .ben-pill[data-sector='tech'] {
  background: rgba(34, 211, 238, 0.16);
  border-color: rgba(103, 232, 249, 0.24);
  color: #bbf4ff;
}

[data-theme='dark'] .ben-pill[data-sector='default'] {
  background: rgba(148, 163, 184, 0.18);
  border-color: rgba(176, 189, 207, 0.22);
  color: #dde6f1;
}
[data-theme='dark'] .ben-search {
  background: var(--color-bg-white);

  border-color: var(--color-border);
}
[data-theme='dark'] .ben-page-btn {
  background: var(--color-bg-white);

  border-color: var(--color-border);

  color: var(--color-text-primary);
}
</style>
