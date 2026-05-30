// Funções comuns para calcular totais do MRR a partir dos países disponíveis.

// Soma uma métrica numérica em todos os países recebidos.
function sumMetric(countries, key) {
  return countries.reduce((total, country) => total + Number(country[key] ?? 0), 0)
}

// Calcula a média arredondada de uma métrica numérica.
function averageMetric(countries, key) {
  if (!countries.length) return 0
  return Math.round(sumMetric(countries, key) / countries.length)
}

// Formata valores financeiros no mesmo estilo visual usado no mapa.
function formatBillions(value) {
  return `${Math.round(value)} mil M€`
}

// Calcula os totais globais a partir dos metadados dos países.
export function calculateRrfSummary(countryMeta = {}) {
  const countries = Object.values(countryMeta)
  const funds = sumMetric(countries, 'funds')
  const disbursed = sumMetric(countries, 'disbursed')

  return {
    memberStates: countries.length,
    funds,
    disbursed,
    disbursedPct: funds ? Math.round((disbursed / funds) * 100) : 0,
    progress: averageMetric(countries, 'progress'),
    climate: averageMetric(countries, 'climate'),
    digital: averageMetric(countries, 'digital'),
  }
}

// Atualiza os cartões principais do dashboard para ficarem alinhados com o mapa.
export function alignDashboardWithRrfSummary(dashboard, countryMeta) {
  const summary = calculateRrfSummary(countryMeta)

  return {
    ...dashboard,
    kpis: dashboard.kpis.map((kpi) => {
      if (kpi.id === 'fundos-alocados') {
        return {
          ...kpi,
          value: formatBillions(summary.funds),
          description: 'Total agregado dos Estados-Membros no mapa',
        }
      }

      if (kpi.id === 'total-desembolsado') {
        return {
          ...kpi,
          value: formatBillions(summary.disbursed),
          badge: { text: `${summary.disbursedPct}% do total`, color: 'green' },
        }
      }

      if (kpi.id === 'progresso-global') {
        return { ...kpi, value: `${summary.progress}%`, description: 'Progresso médio dos Estados-Membros' }
      }

      return kpi
    }),
    heroStats: [
      { label: 'Fundos totais do MRR', value: formatBillions(summary.funds) },
      { label: 'Estados-Membros', value: String(summary.memberStates) },
      { label: 'Obj. Climático Médio', value: `${summary.climate}%` },
      { label: 'Obj. Digital Médio', value: `${summary.digital}%` },
    ],
  }
}
