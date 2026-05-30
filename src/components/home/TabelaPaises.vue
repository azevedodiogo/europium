<!-- Tabela da homepage com o ranking de países por alocação. -->
<template>
  <!-- Moldura da tabela de países da homepage. -->
  <div class="table-wrapper">
    <table class="countries-table" aria-label="Países por alocação de fundos">
      <thead>
        <tr>
          <!-- Cabeçalhos clicáveis quando a coluna é ordenável. -->
          <th
            v-for="col in columns"
            :key="col.key"
            :class="['countries-table__th', col.align && `countries-table__th--${col.align}`]"
            scope="col"
            :aria-sort="sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined"
          >
            <button
              v-if="col.sortable"
              type="button"
              class="countries-table__sort-button"
              :aria-label="sortButtonLabel(col)"
              @click="sort(col.key)"
            >
              {{ col.label }}

              <span v-if="sortKey === col.key" aria-hidden="true">
                {{ sortDir === 'asc' ? ' ↑' : ' ↓' }}
              </span>
            </button>

            <span v-else>{{ col.label }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Cada linha representa um país e os seus valores principais. -->
        <tr v-for="country in sortedCountries" :key="country.name" class="countries-table__row">
          <td class="countries-table__td countries-table__td--name">
            {{ country.name }}
          </td>

          <td class="countries-table__td countries-table__td--right">
            {{ country.total.toFixed(1) }}
          </td>

          <td class="countries-table__td countries-table__td--right countries-table__td--secondary">
            {{ country.disbursed.toFixed(1) }}
          </td>

          <td class="countries-table__td">
            <!-- Barra visual do progresso nacional. -->
            <div class="progress-cell">
              <div
                class="progress-cell__bar"
                role="progressbar"
                :aria-valuenow="country.progress"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div class="progress-cell__fill" :style="{ width: `${country.progress}%` }" />
              </div>

              <span class="progress-cell__value">{{ country.progress }}%</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Estado local da ordenação e lista calculada de países.
import { ref, computed } from 'vue'
// Store principal que contém a tabela de países.
import { useDashboardStore } from '@/stores/painel'
import { storeToRefs } from 'pinia'
const store = useDashboardStore()
const { countries } = storeToRefs(store)
// Definição das colunas, incluindo alinhamento e ordenação.
const columns = [
  { key: 'name', label: 'País', sortable: true },
  { key: 'total', label: 'Total (mil M)', sortable: true, align: 'right' },
  { key: 'disbursed', label: 'Desembolsado', sortable: true, align: 'right' },
  { key: 'progress', label: 'Progresso', sortable: true },
]
// Ordenação inicial por maior alocação total.
const sortKey = ref('total')
const sortDir = ref('desc')
function sort(key) {
  // Clicar na mesma coluna inverte a direção; coluna nova começa descendente.
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'desc'
  }
}
function sortButtonLabel(col) {
  const nextDirection = sortKey.value === col.key && sortDir.value === 'asc' ? 'descendente' : 'ascendente'
  return `Ordenar por ${col.label} em ordem ${nextDirection}`
}
// Lista ordenada sem alterar a lista original da store.
const sortedCountries = computed(() => {
  return [...countries.value].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]
    const dir = sortDir.value === 'asc' ? 1 : -1
    return typeof aVal === 'string' ? aVal.localeCompare(bVal, 'pt') * dir : (aVal - bVal) * dir
  })
})
</script>

<style scoped>
/* Moldura da tabela. */
.table-wrapper {
  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);
  overflow: hidden;
}
/* Tabela principal. */
.countries-table {
  width: 100%;

  border-collapse: collapse;
  font-size: var(--text-base);
}
/* Cabeçalho da tabela. */
.countries-table__th {
  background: rgba(234, 239, 245, 0.5);

  border-bottom: 0.8px solid var(--color-border);

  padding: 10px 8px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  text-align: left;

  white-space: nowrap;
}
.countries-table__th--right {
  text-align: right;
}
.countries-table__th:hover {
  background: rgba(234, 239, 245, 0.8);
}
.countries-table__sort-button {
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
.countries-table__th--right .countries-table__sort-button {
  justify-content: flex-end;
}
/* Linha da tabela. */
.countries-table__row {
  border-bottom: 0.8px solid var(--color-border);

  transition: background-color 0.1s ease;
}
.countries-table__row:last-child {
  border-bottom: none;
}
.countries-table__row:hover {
  background: rgba(249, 250, 251, 0.8);
}
/* Célula base. */
.countries-table__td {
  padding: 9px 8px;
  color: var(--color-text-primary);
  font-weight: 400;

  vertical-align: middle;
}
.countries-table__td--name {
  font-weight: 500;
}
.countries-table__td--right {
  text-align: right;
}
.countries-table__td--secondary {
  color: var(--color-text-secondary);
}
/* Célula com barra de progresso. */
.progress-cell {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.progress-cell__bar {
  width: 80px;
  height: 6px;

  background: var(--color-brand-blue-20);

  border-radius: var(--radius-full);
  overflow: hidden;
  flex-shrink: 0;
}
.progress-cell__fill {
  height: 100%;

  background: var(--color-navy);

  border-radius: var(--radius-full);
}
.progress-cell__value {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  min-width: 28px;
}
[data-theme='dark'] .table-wrapper {
  background: var(--color-bg-white);

  border-color: var(--color-border);
}
[data-theme='dark'] .countries-table__th {
  background: rgba(232, 240, 252, 0.06);
}
[data-theme='dark'] .countries-table__th:hover {
  background: rgba(232, 240, 252, 0.1);
}
[data-theme='dark'] .countries-table__row:hover {
  background: rgba(119, 167, 234, 0.08);
}
[data-theme='dark'] .progress-cell__bar {
  background: rgba(232, 240, 252, 0.09);
}
[data-theme='dark'] .progress-cell__fill {
  background: #77a7ea;
}
</style>
