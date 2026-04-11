const API_BASE_URL = 'http://localhost:3000'

const EMPTY_RESOURCES = {
  dashboard: {
    kpis: [],
    heroStats: [],
    pillars: [],
    countries: [],
    climateDigitalData: [],
    exploreLinks: [],
    countryStats: null,
    marcosStatusLabels: {},
    marcos: [],
    indicadores: [],
  },
  compare: {
    barMax: 200,
    barTicks: [],
    barMetrics: [],
    radarAxes: [],
    tableMetrics: [],
    countries: [],
  },
  disbursements: {
    paymentPeriods: [],
    paymentTypeOrder: {},
    countryOptions: [],
    countryData: {},
  },
  glossary: {
    categoryOrder: [],
    terms: [],
  },
  timeline: {
    mechanism: {
      start: '2021-01-01',
      end: '2026-08-31',
      finalDateLabel: '',
      finalDescription: '',
    },
    shortMonths: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    categories: [],
    legend: [],
    events: [],
    stats: [],
  },
  map: {
    euNumToIso: {},
    contextNums: [],
    contextNames: {},
    metrics: [],
    palette: [],
    countryMeta: {},
  },
  more: {
    resources: [],
  },
}

function hasStructuredClone() {
  return typeof structuredClone === 'function'
}

export function cloneData(data) {
  if (hasStructuredClone()) {
    return structuredClone(data)
  }

  return JSON.parse(JSON.stringify(data))
}

export function getEmptyResource(resourceKey) {
  return cloneData(EMPTY_RESOURCES[resourceKey] ?? {})
}

export async function loadJsonResource(resourceKey) {
  const response = await fetch(`${API_BASE_URL}/${resourceKey}`)

  if (!response.ok) {
    throw new Error(`json-server respondeu com HTTP ${response.status}`)
  }

  return {
    data: cloneData(await response.json()),
    source: 'json-server',
  }
}

export async function fetchJsonResource(resourceKey) {
  const { data } = await loadJsonResource(resourceKey)
  return data
}

export async function loadJsonResources(resourceKeys) {
  const entries = await Promise.all(
    resourceKeys.map(async (resourceKey) => [resourceKey, await loadJsonResource(resourceKey)])
  )

  return Object.fromEntries(entries)
}
