
<!-- Página dos desembolsos com pagamentos e beneficiários. -->
<template>
  
  <div class="des-page">
    
    <div class="des-container">

      
      <!-- Cabeçalho da página com a descrição do tipo de dados apresentado. -->
      <div class="page-hero">
        
        <h1 class="page-hero__title">Desembolsos</h1>
        
        <p class="page-hero__desc des-desc-width">Pagamentos efetuados pela União Europeia a cada Estado-Membro no âmbito do MRR, discriminado por data, montante e tipologia (subvenção, empréstimo ou pré-financiamento).</p>
      </div>

      
      <!-- Filtro de país e menu de exportação dos pagamentos. -->
      <DisbursementsFilterBar
        v-model="selectedCountry"
        :countryOptions="countryOptions"
        :paymentsCount="payments.length"
        :exportData="payments"
        :fileContext="paymentsExportContext"
        :detailParts="paymentsExportDetails"
      />

      
      <!-- Indicadores rápidos recalculados sempre que muda o país. -->
      <DisbursementsKpiCards :activeKpis="activeKpis" />

      
      <!-- Alternância entre pagamentos e beneficiários. -->
      <div class="des-tablist" role="tablist">
        
        <button role="tab" class="des-tab" :class="{'des-tab--active': activeTab==='pagamentos'}" @click="activeTab='pagamentos'">
          
          <IconFileText :size="16" />
          Pagamentos
        </button>
        
        <button role="tab" class="des-tab" :class="{'des-tab--active': activeTab==='beneficiarios'}" @click="activeTab='beneficiarios'">
          
          <IconCircleCheckFilled :size="16" />
          Top 100 Beneficiários
        </button>
      </div>

      
      <!-- Painel de pagamentos com gráfico, cronologia e tabela ordenável. -->
      <DisbursementsPaymentsPanel
        v-if="activeTab==='pagamentos'"
        :raw="raw"
        :timeline="timeline"
        :showCountryColumn="showCountryColumn"
        :sortedPayments="sortedPayments"
        :paymentSortKey="paymentSortKey"
        :paymentSortDir="paymentSortDir"
        @sort="sortPaymentsTable"
      />

      
      <!-- Painel de beneficiários com pesquisa, paginação e exportação própria. -->
      <DisbursementsBeneficiariesPanel
        v-else
        :beneficiariesSubtitle="beneficiariesSubtitle"
        :filteredBen="filteredBen"
        :paginatedBen="paginatedBen"
        :filteredTotal="filteredTotal"
        :showCountryColumn="showCountryColumn"
        :beneficiariesColspan="beneficiariesColspan"
        :totalPages="totalPages"
        :currentPage="currentPage"
        :searchQuery="searchQuery"
        :exportContext="beneficiariesExportContext"
        :exportDetails="beneficiariesExportDetails"
        :exportData="filteredBen"
        @update:searchQuery="searchQuery = $event"
        @update:currentPage="currentPage = $event"
      />
    </div>
  </div>
</template>

<script setup>
// Estado reativo, dados calculados e observadores usados na página.
import { ref, computed, watch } from 'vue'
import DisbursementsFilterBar from '@/componentes/desembolsos/BarraFiltrosDesembolsos.vue'
import DisbursementsKpiCards from '@/componentes/desembolsos/CartoesKpiDesembolsos.vue'
import DisbursementsPaymentsPanel from '@/componentes/desembolsos/PainelPagamentosDesembolsos.vue'
import DisbursementsBeneficiariesPanel from '@/componentes/desembolsos/PainelBeneficiariosDesembolsos.vue'
// Composição que carrega o recurso pelo json-server com fallback centralizado.
import { usarRecursoApi } from '@/composicoes/usarRecursoApi'
// País selecionado; null significa vista agregada de todos os países.
const selectedCountry = ref(null)
// Separador ativo dentro da página.
const activeTab = ref('pagamentos')
// Campo e direção usados pela tabela de pagamentos.
const paymentSortKey = ref('dateValue')
const paymentSortDir = ref('asc')
// Pesquisa e paginação da tabela de beneficiários.
const searchQuery = ref('')
const currentPage = ref(1)
const perPage = 20
// Etiquetas legíveis para tipos de pagamento quando os dados só trazem chaves técnicas.
const TYPE_LABELS = {
  pre: 'Pré-financiamento',
  subvencao: 'Subvenção',
  emprestimo: 'Empréstimo',
}
// Formatadores reutilizados para valores em milhões e milhares de milhões.
const BILLION_FORMATTER = new Intl.NumberFormat('pt-PT', { minimumFractionDigits: 0, maximumFractionDigits: 1 })
const TOTAL_FORMATTER = new Intl.NumberFormat('pt-PT', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
// Recurso ativo da página, vindo da camada centralizada de dados.
const resource = usarRecursoApi('disbursements')
// Opções de país usadas nos filtros.
const countryOptions = computed(() => resource.value.countryOptions)
// Metadados por código de país para evitar procurar a opção várias vezes.
const countryMeta = computed(() => Object.fromEntries(countryOptions.value.map((option) => [option.value, option])))
// Dados brutos dos países.
const countryData = computed(() => resource.value.countryData)
// Lista de códigos com dados de pagamentos/beneficiários mockados.
const countriesWithData = computed(() =>
  Object.keys(countryData.value ?? {})
    .filter((countryCode) => countryMeta.value[countryCode])
    .sort((a, b) => countryMeta.value[a].label.localeCompare(countryMeta.value[b].label, 'pt-PT'))
)
// Períodos do gráfico vindos do recurso ativo.
const paymentPeriods = computed(() => {
  if (resource.value.paymentPeriods?.length) return resource.value.paymentPeriods
  const periods = countriesWithData.value.flatMap(countryCode =>
    (countryData.value[countryCode]?.payments ?? []).map((paymentItem) => paymentItem.chartDate)
  )
  return [...new Set(periods)]
})
// Ordem auxiliar para ordenar pagamentos pela cronologia do gráfico.
const paymentPeriodOrder = computed(() =>
  Object.fromEntries(paymentPeriods.value.map((period, index) => [period, index]))
)
// Ordem dos tipos de pagamento usada na tabela.
const paymentTypeOrder = computed(() => resource.value.paymentTypeOrder ?? {})
function withCountryMeta(countryCode, item) {
  // Junta dados do pagamento/beneficiário com nome e bandeira do país.
  const country = countryMeta.value[countryCode]
  return {
    ...item,
    countryCode,
    countryLabel: country.label,
    countryFlag: country.flag,
  }
}
function formatBillionAmount(value) {
  // Formata valores em milhares de milhões para os KPIs e pagamentos.
  return `${BILLION_FORMATTER.format(value)} mil M`
}
function formatMillionAmount(value) {
  // Formata valores em milhões para os beneficiários.
  return `${BILLION_FORMATTER.format(value)} M`
}
function pluralize(value, singular, plural = `${singular}s`) {
  // Pequena ajuda para textos de resumo no singular/plural.
  return value === 1 ? singular : plural
}
function roundToOne(value) {
  // Evita ruído decimal nos acumulados do gráfico.
  return Math.round(value * 10) / 10
}
function parseDateValue(dateString) {
  // Converte dd/mm/aaaa para timestamp, permitindo ordenação real por data.
  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day).getTime()
}
function buildSeries(paymentsList) {
  // Constrói uma série cumulativa para o gráfico de linha.
  let cumulative = 0
  return paymentsList.map(item => {
    cumulative = roundToOne(cumulative + item.amount)
    return { d: item.chartDate, v: cumulative }
  })
}
function sortPaymentsByTimeline(a, b) {
  // Ordenação estável usada quando a vista mostra todos os países.
  const periodDiff = paymentPeriodOrder.value[a.chartDate] - paymentPeriodOrder.value[b.chartDate]
  if (periodDiff !== 0) return periodDiff
  return a.countryLabel.localeCompare(b.countryLabel, 'pt-PT')
}
function getCountryPayments(countryCode) {
  // Pagamentos de um país já enriquecidos com metadados visuais.
  return (countryData.value[countryCode]?.payments ?? []).map((item) => withCountryMeta(countryCode, item))
}
function getCountryBeneficiaries(countryCode) {
  // Beneficiários de um país já enriquecidos com metadados visuais.
  return (countryData.value[countryCode]?.beneficiaries ?? []).map((item) => withCountryMeta(countryCode, item))
}
// Base de pagamentos ativa para país único ou agregação total.
const activePaymentsBase = computed(() => {
  if (selectedCountry.value) {
    return getCountryPayments(selectedCountry.value)
  }
  return countriesWithData.value
    .flatMap(countryCode => getCountryPayments(countryCode))
    .sort(sortPaymentsByTimeline)
})
// Base de beneficiários ativa, sempre ordenada pelo montante recebido.
const activeBeneficiariesBase = computed(() => {
  const baseList = selectedCountry.value
    ? getCountryBeneficiaries(selectedCountry.value)
    : countriesWithData.value.flatMap(countryCode => getCountryBeneficiaries(countryCode))
  const sortedList = [...baseList].sort((a, b) => b.amount - a.amount)
  return selectedCountry.value ? sortedList : sortedList.slice(0, 100)
})
// Total do plano usado para calcular percentagem de execução.
const activePlanTotal = computed(() => {
  if (selectedCountry.value) {
    return countryMeta.value[selectedCountry.value]?.planTotal ?? 0
  }
  return countriesWithData.value.reduce((sum, countryCode) => sum + (countryMeta.value[countryCode]?.planTotal ?? 0), 0)
})
// Informação do país selecionado, quando existe.
const selectedCountryInfo = computed(() =>
  selectedCountry.value ? countryMeta.value[selectedCountry.value] : null
)
// KPIs superiores da página.
const activeKpis = computed(() => {
  const summary = activePaymentsBase.value.reduce((acc, item) => {
    acc.total += item.amount
    acc.pagamentos += 1
    if (item.type === 'pre') acc.pre += item.amount
    if (item.type === 'subvencao') {
      acc.subv += item.amount
      acc.subvCount += 1
    }
    if (item.type === 'emprestimo') {
      acc.empr += item.amount
      acc.emprCount += 1
    }
    return acc
  }, { total: 0, pre: 0, subv: 0, empr: 0, pagamentos: 0, subvCount: 0, emprCount: 0 })
  const progressPct = activePlanTotal.value ? Math.round((summary.total / activePlanTotal.value) * 100) : 0
  return {
    total: formatBillionAmount(summary.total),
    totalSub: `${progressPct}% do plano de ${formatBillionAmount(activePlanTotal.value)}`,
    subv: formatBillionAmount(summary.subv),
    subvSub: summary.subvCount
      ? `${summary.subvCount} ${pluralize(summary.subvCount, 'pagamento')}`
      : 'Sem pagamentos',
    empr: formatBillionAmount(summary.empr),
    emprSub: summary.emprCount
      ? `${summary.emprCount} ${pluralize(summary.emprCount, 'pagamento')}`
      : 'Sem empréstimos',
    pagamentos: String(summary.pagamentos),
    pagamentosSub: summary.pre
      ? `Pré-financiamento: ${formatBillionAmount(summary.pre)}`
      : 'Sem pré-financiamento',
  }
})
// Série usada no gráfico de pagamentos.
const raw = computed(() => {
  if (selectedCountry.value) {
    return buildSeries(activePaymentsBase.value)
  }
  let cumulative = 0
  return paymentPeriods.value.map(period => {
    const periodTotal = countriesWithData.value.reduce((sum, countryCode) => {
      const paymentItem = countryData.value[countryCode]?.payments?.find((item) => item.chartDate === period)
      return sum + (paymentItem?.amount ?? 0)
    }, 0)
    cumulative = roundToOne(cumulative + periodTotal)
    return { d: period, v: cumulative }
  })
})
// Linhas normalizadas para a tabela de pagamentos.
const payments = computed(() => activePaymentsBase.value.map(item => ({
  id: item.id,
  date: item.date,
  dateValue: parseDateValue(item.date),
  parcel: item.parcel,
  amount: formatBillionAmount(item.amount),
  amountValue: item.amount,
  type: item.type,
  typeLabel: item.typeLabel,
  typeSortValue: paymentTypeOrder.value[item.type] ?? 99,
  countryLabel: item.countryLabel,
  countryFlag: item.countryFlag,
})))
// Ordenação da tabela de pagamentos, controlada pelo componente filho.
const sortedPayments = computed(() => {
  return [...payments.value].sort((a, b) => {
    const dir = paymentSortDir.value === 'asc' ? 1 : -1
    const key = paymentSortKey.value
    const aVal = a[key]
    const bVal = b[key]
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const primary = aVal.localeCompare(bVal, 'pt-PT') * dir
      if (primary !== 0) return primary
    } else {
      const primary = (aVal - bVal) * dir
      if (primary !== 0) return primary
    }
    return a.dateValue - b.dateValue
  })
})
// Dados da cronologia, derivados da mesma base que a tabela.
const timeline = computed(() => activePaymentsBase.value.map(item => ({
  id: item.id,
  amount: formatBillionAmount(item.amount),
  type: item.type,
  typeLabel: item.typeLabel,
  dateLabel: item.dateLabel,
  description: item.parcel,
  countryLabel: item.countryLabel,
  countryFlag: item.countryFlag,
})))
// Contexto e detalhes da exportação dos pagamentos.
const paymentsExportContext = computed(() =>
  selectedCountryInfo.value ? [selectedCountryInfo.value.label] : []
)
const paymentsExportDetails = computed(() => {
  const parts = [selectedCountryInfo.value ? `País: ${selectedCountryInfo.value.label}` : 'Todos os países']
  parts.push('Pagamentos')
  return parts
})
// Lista de beneficiários com ranking e pesquisa aplicada.
const filteredBen = computed(() => {
  const rankedList = activeBeneficiariesBase.value.map((item, index) => ({
    ...item,
    rank: index + 1,
    amountValue: item.amount,
    amount: formatMillionAmount(item.amount),
  }))
  if (!searchQuery.value.trim()) return rankedList
  const query = searchQuery.value.toLowerCase()
  return rankedList.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.project.toLowerCase().includes(query) ||
    item.sector.toLowerCase().includes(query) ||
    item.countryLabel.toLowerCase().includes(query)
  )
})
// Contexto e detalhes da exportação dos beneficiários.
const beneficiariesExportContext = computed(() =>
  selectedCountryInfo.value ? [selectedCountryInfo.value.label] : []
)
const beneficiariesExportDetails = computed(() => {
  const parts = [selectedCountryInfo.value ? `País: ${selectedCountryInfo.value.label}` : 'Todos os países']
  parts.push('Top beneficiários')
  if (searchQuery.value.trim()) {
    parts.push(`Pesquisa: ${searchQuery.value.trim()}`)
  }
  return parts
})
// Paginação da tabela de beneficiários.
const totalPages = computed(() => Math.max(1, Math.ceil(filteredBen.value.length / perPage)))
const paginatedBen = computed(() => filteredBen.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage))
// Total financeiro dos beneficiários visíveis.
const filteredTotal = computed(() => {
  const numericTotal = filteredBen.value.reduce((sum, item) => sum + item.amountValue, 0)
  if (numericTotal >= 1000) {
    return `${TOTAL_FORMATTER.format(numericTotal / 1000)} mil M EUR`
  }
  return `${TOTAL_FORMATTER.format(numericTotal)} M EUR`
})
// Subtítulo muda conforme a página está agregada ou filtrada por país.
const beneficiariesSubtitle = computed(() => {
  if (selectedCountry.value) {
    return `Principais entidades que receberam fundos do MRR em ${countryMeta.value[selectedCountry.value]?.label ?? 'este país'}`
  }
  return 'Principais entidades que receberam fundos do MRR nos países em análise'
})
// Na vista agregada é necessário mostrar coluna de país.
const showCountryColumn = computed(() => !selectedCountry.value)
// Colspan do estado vazio acompanha a presença da coluna de país.
const beneficiariesColspan = computed(() => showCountryColumn.value ? 6 : 5)
watch(selectedCountry, () => {
  // Mudar de país volta ao início da paginação para evitar páginas vazias.
  currentPage.value = 1
})
watch(totalPages, value => {
  // Se uma pesquisa reduzir o total de páginas, corrige a página atual.
  if (currentPage.value > value) {
    currentPage.value = value
  }
})
function sortPaymentsTable(key) {
  // Repete a coluna para inverter direção; coluna nova recebe direção inicial adequada.
  if (paymentSortKey.value === key) {
    paymentSortDir.value = paymentSortDir.value === 'asc' ? 'desc' : 'asc'
    return
  }
  paymentSortKey.value = key
  paymentSortDir.value = key === 'amountValue' ? 'desc' : 'asc'
}
</script>

<style scoped>

/* Estrutura base da página. */
.des-page      { background: var(--color-bg-page); min-height: 100vh; padding-bottom: 60px; }

.des-container { max-width: 1520px; margin: 0 auto; padding: 0 var(--container-padding); }


/* Separadores entre pagamentos e beneficiários. */
.des-tablist { display: flex; gap: 2px; background: #ebeff4; border-radius: var(--radius-md); padding: 3px; width: fit-content; margin: 20px 32px 0; }

.des-tab { display: inline-flex; align-items: center; gap: 6px; height: 29px; padding: 0 16px; border-radius: var(--radius-sm); font-family: var(--font-family); font-size: var(--text-base); font-weight: 500; color: var(--color-text-primary); background: transparent; border: 1px solid transparent; cursor: pointer; min-width: 140px; justify-content: center; transition: background .12s; }

.des-tab--active { background: #f9fafb; box-shadow: 0 1px 3px rgba(0,0,0,.10); }
[data-theme="dark"] .des-tablist {
  
  background: rgba(232,240,252,0.06);
}
[data-theme="dark"] .des-tab--active {
  
  background: var(--color-bg-white);
  
  color: var(--color-text-primary);
}
</style>
