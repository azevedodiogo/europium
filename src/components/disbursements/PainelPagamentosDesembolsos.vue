<!-- Painel de pagamentos com gráfico, cronologia e tabela ordenável. -->
<template>
  <!-- Tabpanel acessível: representa o separador ativo de pagamentos. -->
  <div class="des-tabpanel" role="tabpanel" :id="panelId" :aria-labelledby="labelledBy">
    <!-- Cartão superior com a evolução acumulada dos disbursements. -->
    <div class="des-chart-card">
      <h2 class="des-chart-title">Evolução dos Desembolsos</h2>
      <!-- O gráfico recebe pontos já calculados pela página pai. -->
      <div class="des-chart-wrap">
        <DisbursementsLineChart :points="raw" />
      </div>
    </div>
    <!-- Zona inferior dividida entre cronologia textual e tabela ordenável. -->
    <div class="des-bottom-row">
      <div>
        <h2 class="des-section-title">Cronologia</h2>
        <!-- Cronologia vertical dos pagamentos na ordem temporal ativa. -->
        <div class="des-timeline">
          <!-- Cada item mostra montante, tipo, data e parcela/pedido associado. -->
          <div v-for="(item, index) in timeline" :key="item.id" class="des-tl-item">
            <div class="des-tl-spine">
              <!-- A cor do ponto depende do tipo de pagamento. -->
              <div class="des-tl-dot" :data-type="item.type" />

              <div v-if="index < timeline.length - 1" class="des-tl-line" />
            </div>

            <div class="des-tl-body">
              <div class="des-tl-top">
                <span class="des-tl-amount">{{ item.amount }} EUR</span>

                <span class="des-tl-badge">{{ item.typeLabel }}</span>

                <span v-if="showCountryColumn" class="des-tl-country"
                  >{{ item.countryFlag }} {{ item.countryLabel }}</span
                >
              </div>

              <p class="des-tl-date">{{ item.dateLabel }}</p>

              <p class="des-tl-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="des-section-title">Tabela de Pagamentos</h2>
        <!-- Tabela com os mesmos pagamentos; os cabeçalhos emitem a chave de ordenação. -->
        <div class="des-table-wrap">
          <table class="des-table" aria-label="Tabela de pagamentos">
            <thead>
              <tr>
                <!-- Data ordena pelo timestamp preparado pela página pai. -->
                <th
                  class="des-th des-th--sortable"
                  scope="col"
                  :aria-sort="
                    paymentSortKey === 'dateValue' ? (paymentSortDir === 'asc' ? 'ascending' : 'descending') : undefined
                  "
                >
                  <button
                    type="button"
                    class="des-th__sort-button"
                    :aria-label="sortButtonLabel('Data', 'dateValue')"
                    @click="$emit('sort', 'dateValue')"
                  >
                    Data

                    <span v-if="paymentSortKey === 'dateValue'" aria-hidden="true">{{
                      paymentSortDir === 'asc' ? ' ↑' : ' ↓'
                    }}</span>
                  </button>
                </th>
                <!-- País só aparece quando a vista está agregada. -->
                <th
                  v-if="showCountryColumn"
                  class="des-th des-th--country des-th--sortable"
                  scope="col"
                  :aria-sort="
                    paymentSortKey === 'countryLabel'
                      ? paymentSortDir === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  "
                >
                  <button
                    type="button"
                    class="des-th__sort-button"
                    :aria-label="sortButtonLabel('País', 'countryLabel')"
                    @click="$emit('sort', 'countryLabel')"
                  >
                    País

                    <span v-if="paymentSortKey === 'countryLabel'" aria-hidden="true">{{
                      paymentSortDir === 'asc' ? ' ↑' : ' ↓'
                    }}</span>
                  </button>
                </th>
                <!-- Parcela ordena alfabeticamente pelo nome do pedido/pagamento. -->
                <th
                  class="des-th des-th--sortable"
                  scope="col"
                  :aria-sort="
                    paymentSortKey === 'parcel' ? (paymentSortDir === 'asc' ? 'ascending' : 'descending') : undefined
                  "
                >
                  <button
                    type="button"
                    class="des-th__sort-button"
                    :aria-label="sortButtonLabel('Parcela', 'parcel')"
                    @click="$emit('sort', 'parcel')"
                  >
                    Parcela

                    <span v-if="paymentSortKey === 'parcel'" aria-hidden="true">{{
                      paymentSortDir === 'asc' ? ' ↑' : ' ↓'
                    }}</span>
                  </button>
                </th>
                <!-- Montante ordena pelo valor numérico, não pelo texto formatado. -->
                <th
                  class="des-th des-th--r des-th--sortable"
                  scope="col"
                  :aria-sort="
                    paymentSortKey === 'amountValue'
                      ? paymentSortDir === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  "
                >
                  <button
                    type="button"
                    class="des-th__sort-button"
                    :aria-label="sortButtonLabel('Montante', 'amountValue')"
                    @click="$emit('sort', 'amountValue')"
                  >
                    Montante

                    <span v-if="paymentSortKey === 'amountValue'" aria-hidden="true">{{
                      paymentSortDir === 'asc' ? ' ↑' : ' ↓'
                    }}</span>
                  </button>
                </th>
                <!-- Tipo ordena por uma ordem definida no script da página pai. -->
                <th
                  class="des-th des-th--sortable"
                  scope="col"
                  :aria-sort="
                    paymentSortKey === 'typeSortValue'
                      ? paymentSortDir === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  "
                >
                  <button
                    type="button"
                    class="des-th__sort-button"
                    :aria-label="sortButtonLabel('Tipo', 'typeSortValue')"
                    @click="$emit('sort', 'typeSortValue')"
                  >
                    Tipo

                    <span v-if="paymentSortKey === 'typeSortValue'" aria-hidden="true">{{
                      paymentSortDir === 'asc' ? ' ↑' : ' ↓'
                    }}</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Linhas já chegam ordenadas para este componente ser apenas apresentacional. -->
              <tr v-for="row in sortedPayments" :key="row.id" class="des-tr">
                <td class="des-td des-td--date">{{ row.date }}</td>

                <td v-if="showCountryColumn" class="des-td des-td--country">
                  {{ row.countryFlag }} {{ row.countryLabel }}
                </td>

                <td class="des-td des-td--parcel">{{ row.parcel }}</td>

                <td class="des-td des-td--amount">{{ row.amount }}</td>

                <td class="des-td">
                  <span class="des-badge" :data-type="row.type">{{ row.typeLabel }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Gráfico de linha reutilizado no topo do painel.
import DisbursementsLineChart from '@/components/disbursements/GraficoLinhaDesembolsos.vue'
// Propriedades recebidas da página de disbursements.
const props = defineProps({
  // Pontos acumulados do gráfico.
  raw: {
    type: Array,
    default: () => [],
  },
  // Entradas da cronologia textual.
  timeline: {
    type: Array,
    default: () => [],
  },
  // Linhas da tabela já ordenadas pela página pai.
  sortedPayments: {
    type: Array,
    default: () => [],
  },
  // Quando está ativo, mostra a coluna de país na cronologia e tabela.
  showCountryColumn: {
    type: Boolean,
    default: false,
  },
  // Chave da coluna atualmente ordenada.
  paymentSortKey: {
    type: String,
    default: 'dateValue',
  },
  // Direção atual da ordenação.
  paymentSortDir: {
    type: String,
    default: 'asc',
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
// Evento emitido quando o utilizador clica num cabeçalho ordenável.
defineEmits(['sort'])
function sortButtonLabel(label, key) {
  const nextDirection = props.paymentSortKey === key && props.paymentSortDir === 'asc' ? 'descendente' : 'ascendente'
  return `Ordenar por ${label} em ordem ${nextDirection}`
}
</script>

<style scoped>
/* Estrutura principal do painel. */
.des-tabpanel {
  margin: 8px 32px 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}
/* Cartão do gráfico superior. */
.des-chart-card {
  background: var(--color-bg-white);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);

  padding: 24px;
  min-width: 0;
}
.des-chart-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}
.des-chart-wrap {
  width: 100%;
  min-width: 0;
}
/* Grelha inferior: cronologia à esquerda e tabela à direita. */
.des-bottom-row {
  display: grid;

  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
  min-width: 0;
}
.des-bottom-row > * {
  min-width: 0;
}
.des-section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 20px;
}
/* Cronologia vertical dos pagamentos. */
.des-timeline {
  display: flex;
  flex-direction: column;
}
.des-tl-item {
  display: flex;
  gap: 16px;
  min-height: 68px;
}
.des-tl-spine {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 12px;
}
/* Ponto da cronologia, com cor dependente do tipo de pagamento. */
.des-tl-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
}
.des-tl-dot[data-type='pre'] {
  background: #008e3e;
}
.des-tl-dot[data-type='subvencao'] {
  background: #1d4587;
}
.des-tl-dot[data-type='emprestimo'] {
  background: #d86d38;
}
.des-tl-line {
  flex: 1;
  width: 1px;

  background: var(--color-border);
  margin: 4px 0;
  min-height: 40px;
}
/* Corpo textual de cada evento da cronologia. */
.des-tl-body {
  padding-bottom: 16px;
  flex: 1;
}
.des-tl-top {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 4px;
}
.des-tl-amount {
  font-size: var(--text-base);
  font-weight: 500;
}
.des-tl-badge {
  display: inline-flex;
  height: 20px;

  padding: 0 6px;
  border-radius: 4px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  background: #eaeff5;
}
.des-tl-country {
  display: inline-flex;
  align-items: center;
  height: 20px;

  padding: 0 8px;

  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);

  background: rgba(234, 239, 245, 0.75);
  white-space: nowrap;
}
.des-tl-date {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: 2px;
}
.des-tl-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
.des-table-wrap {
  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
}
.des-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-base);
}
.des-th {
  background: rgba(234, 239, 245, 0.5);

  border-bottom: 0.8px solid var(--color-border);
  padding: 10px 8px;
  font-size: var(--text-sm);
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
}
.des-th--country {
  width: 120px;
}
.des-th--r {
  text-align: right;
}
.des-th--sortable {
  cursor: pointer;
  user-select: none;
}
.des-th--sortable:hover {
  background: rgba(234, 239, 245, 0.78);
}
.des-th__sort-button {
  width: calc(100% + 16px);
  margin: -10px -8px;
  padding: 10px 8px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  font: inherit;
  font-weight: inherit;
  color: inherit;
  text-align: inherit;
  white-space: inherit;
  user-select: none;
}
.des-th--r .des-th__sort-button {
  justify-content: flex-end;
}
.des-tr {
  border-bottom: 0.8px solid var(--color-border);
  transition: background 0.1s;
}
.des-tr:last-child {
  border-bottom: none;
}
.des-tr:hover {
  background: rgba(249, 250, 251, 0.8);
}
.des-td {
  padding: 10px 8px;
  vertical-align: middle;
  color: var(--color-text-primary);
}
.des-td--date {
  white-space: nowrap;
}
.des-td--country {
  white-space: nowrap;
  color: var(--color-text-secondary);
}
.des-td--parcel {
  color: var(--color-text-secondary);
}
.des-td--amount {
  text-align: right;
  font-weight: 500;
  white-space: nowrap;
}
.des-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 0 9px;

  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: 500;
  border: 1px solid;
  white-space: nowrap;
}
.des-badge[data-type='pre'] {
  background: rgba(0, 142, 62, 0.1);

  border-color: rgba(0, 142, 62, 0.2);
  color: #008e3e;
}
.des-badge[data-type='subvencao'] {
  background: rgba(29, 69, 135, 0.1);

  border-color: rgba(29, 69, 135, 0.2);
  color: #1d4587;
}
.des-badge[data-type='emprestimo'] {
  background: rgba(216, 109, 55, 0.1);

  border-color: rgba(216, 109, 55, 0.2);
  color: #d86d38;
}

@media (max-width: 1200px) {
  .des-bottom-row {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 640px) {
  .des-tabpanel {
    margin: 8px 0 0;
  }

  .des-chart-card {
    padding: 16px;
  }
}
[data-theme='dark'] .des-th {
  background: rgba(232, 240, 252, 0.06);

  color: var(--color-text-primary);
}
[data-theme='dark'] .des-th--sortable:hover {
  background: rgba(232, 240, 252, 0.12);
}
[data-theme='dark'] .des-tr:hover {
  background: rgba(119, 167, 234, 0.08);
}
[data-theme='dark'] .des-td--country,
[data-theme='dark'] .des-td--parcel {
  color: #c8d5e5;
}
[data-theme='dark'] .des-badge {
  font-weight: 600;

  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
[data-theme='dark'] .des-badge[data-type='pre'] {
  background: rgba(34, 197, 94, 0.16);

  border-color: rgba(106, 218, 129, 0.24);

  color: #97ebb2;
}
[data-theme='dark'] .des-badge[data-type='subvencao'] {
  background: rgba(119, 167, 234, 0.16);

  border-color: rgba(157, 192, 244, 0.26);

  color: #cfe1fb;
}
[data-theme='dark'] .des-badge[data-type='emprestimo'] {
  background: rgba(241, 177, 91, 0.16);

  border-color: rgba(241, 177, 91, 0.24);

  color: #ffd2a3;
}
[data-theme='dark'] .des-tl-badge {
  background: rgba(232, 240, 252, 0.08);

  color: var(--color-text-secondary);
}
[data-theme='dark'] .des-tl-country {
  background: rgba(232, 240, 252, 0.12);
  color: #edf4fc;

  border: 1px solid rgba(208, 224, 246, 0.12);
}
</style>
