const runtimeEnv = typeof process !== 'undefined' ? process.env : {}
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? runtimeEnv.VITE_API_BASE_URL ?? 'http://localhost:3000'
const API_TIMEOUT_MS = Number(import.meta.env?.VITE_API_TIMEOUT_MS ?? runtimeEnv.VITE_API_TIMEOUT_MS ?? 2500)

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
    indicators: [],
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

function normalizeError(error) {
  if (error?.name === 'AbortError') {
    return {
      message: `A API local demorou more de ${API_TIMEOUT_MS} ms a responder.`,
      code: 'api-timeout',
    }
  }

  return {
    message: error?.message ?? 'Erro desconhecido ao carregar dados.',
    code: error?.code ?? 'api-error',
  }
}

async function fetchWithTimeout(url) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS)

  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function loadJsonResource(resourceKey) {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/${resourceKey}`)

    if (!response.ok) {
      throw new Error(`json-server respondeu com HTTP ${response.status}`)
    }

    return {
      data: cloneData(await response.json()),
      source: 'json-server',
      error: null,
    }
  } catch (error) {
    return {
      data: getEmptyResource(resourceKey),
      source: 'api-error',
      error: normalizeError(error),
    }
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
