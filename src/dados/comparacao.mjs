// Dados locais da página de comparação.
import { mapData } from './mapa.mjs'

// Percentagem estimada de empréstimos dentro do envelope financeiro, quando aplicável.
const loanShareByCountry = {
  PT: 0.16,
  ES: 0.52,
  IT: 0.36,
  PL: 0.32,
  GR: 0.39,
  RO: 0.45,
  SI: 0.28,
  CY: 0.18,
}

// Peso aproximado do plano face ao PIB nacional, usado apenas na tabela comparativa.
const gdpShareByCountry = {
  AT: 0.8, BE: 0.9, BG: 9.1, CY: 4.1, CZ: 2.6, DE: 0.6, DK: 0.2, EE: 3.0, ES: 11.5,
  FI: 0.9, FR: 1.4, GR: 13.2, HR: 10.0, HU: 3.4, IE: 0.2, IT: 9.8, LT: 3.5, LU: 0.2,
  LV: 5.1, MT: 2.5, NL: 0.5, PL: 5.8, PT: 6.8, RO: 9.0, SE: 0.6, SI: 4.5, SK: 5.7,
}

// Converte os metadados do mapa no formato completo usado pela página de comparação.
function buildComparisonCountries(countryMeta) {
  return Object.entries(countryMeta).map(([code, country]) => {
    const loanShare = loanShareByCountry[code] ?? 0
    const loans = +(country.funds * loanShare).toFixed(1)
    const grants = +(country.funds - loans).toFixed(1)

    return {
      value: code,
      name: country.name,
      code,
      flag: country.flag,
      total: country.funds,
      disbursed: country.disbursed,
      pib: gdpShareByCountry[code] ?? 1,
      progress: country.progress,
      grants,
      loans,
      marcos: country.marcos,
      marcosCumpridos: Math.round(country.marcos * country.progress / 100),
      clima: country.climate,
      digital: country.digital,
      radar: [
        country.climate / 60,
        country.digital / 35,
        country.progress / 80,
        Math.min((country.disbursed / Math.max(country.funds, 0.1)) / 0.8, 1),
        Math.min(country.marcos / 30, 1),
        Math.min((country.progress + country.digital) / 110, 1),
      ],
    }
  })
}

export const compareData = {
  // Limite superior usado no gráfico de barras financeiro.
  barMax: 200,
  // Marcas do eixo vertical no gráfico de barras.
  barTicks: [{ val: 0 }, { val: 50 }, { val: 100 }, { val: 150 }, { val: 200 }],
  // Métricas usadas nas barras comparativas.
  barMetrics: [
    { label: 'Total', key: 'total' },
    { label: 'Subvenções', key: 'grants' },
    { label: 'Empréstimos', key: 'loans' },
    { label: 'Desembolsado', key: 'disbursed' },
  ],
  // Eixos temáticos usados no radar.
  radarAxes: [
    { label: 'Ecologia', angle: -90 },
    { label: 'Digital', angle: -30 },
    { label: 'Crescimento', angle: 30 },
    { label: 'Coesão', angle: 90 },
    { label: 'Saúde', angle: 150 },
    { label: 'Próxima geração', angle: 210 },
  ],
  // Linhas que compõem a tabela comparativa final.
  tableMetrics: [
    { label: 'Fundos totais (mil M€)', key: 'total', precision: 1 },
    { label: 'Subvenções (mil M€)', key: 'grants', precision: 1 },
    { label: 'Empréstimos (mil M€)', key: 'loans', precision: 1 },
    { label: 'Desembolsado (mil M€)', key: 'disbursed', precision: 1 },
    { label: '% PIB', key: 'pib', precision: 1 },
    { label: 'Marcos totais', key: 'marcos', precision: 0 },
    { label: 'Marcos cumpridos', key: 'marcosCumpridos', precision: 0 },
    { label: 'Objetivo climático (%)', key: 'clima', precision: 0 },
    { label: 'Objetivo digital (%)', key: 'digital', precision: 0 },
  ],
  // Cada país contém métricas financeiras, execução e valores normalizados para radar.
  countries: buildComparisonCountries(mapData.countryMeta),
}
