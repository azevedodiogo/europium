// Importa a base simulada usada quando a API ainda não responde.
import { mockDb } from '@/dados/baseSimulada.mjs'

// Prefixo único usado pelo Vite para encaminhar pedidos para o json-server.
const API_PREFIX = '/api'

// Verifica se o ambiente suporta `structuredClone`.
// Se suportar, conseguimos copiar objetos de forma mais segura.
function hasStructuredClone() {
  return typeof structuredClone === 'function'
}

// Cria uma cópia profunda dos dados.
// Isto evita alterar por engano os dados de origem.
export function cloneData(data) {
  // Usa a função nativa quando existir.
  if (hasStructuredClone()) {
    return structuredClone(data)
  }

  // Fallback simples para ambientes sem `structuredClone`.
  return JSON.parse(JSON.stringify(data))
}

// Devolve um recurso local a partir da base simulada central.
export function getLocalResource(resourceKey) {
  return cloneData(mockDb[resourceKey])
}

// Tenta carregar um recurso pelo endpoint `/api/...`.
// Se falhar, devolve o fallback local e marca a origem como `local`.
export async function loadJsonResource(resourceKey, fallbackData = mockDb[resourceKey]) {
  try {
    // Faz o pedido ao backend.
    const response = await fetch(`${API_PREFIX}/${resourceKey}`)

    // Se a resposta vier com erro HTTP, força a ida para o catch.
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    // Converte a resposta para JSON.
    const data = await response.json()

    // Devolve o payload e indica que veio da API.
    return {
      data: cloneData(data),
      source: 'api',
    }
  } catch (error) {
    // Enquanto o backend não estiver pronto, avisa na consola e usa os dados locais.
    console.warn(`[api] fallback local para "${resourceKey}"`, error)

    // Devolve o fallback e indica que a origem foi local.
    return {
      data: cloneData(fallbackData),
      source: 'local',
    }
  }
}

// Versão mais simples da função anterior.
// Aqui só interessa o payload e não a origem.
export async function fetchJsonResource(resourceKey, fallbackData = mockDb[resourceKey]) {
  const { data } = await loadJsonResource(resourceKey, fallbackData)
  return data
}

// Carrega vários recursos em paralelo e devolve um objeto indexado pela chave.
export async function loadJsonResources(resourceKeys) {
  const entries = await Promise.all(
    resourceKeys.map(async (resourceKey) => [resourceKey, await loadJsonResource(resourceKey)])
  )

  return Object.fromEntries(entries)
}
