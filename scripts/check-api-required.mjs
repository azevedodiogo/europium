import assert from 'node:assert/strict'

process.env.VITE_API_BASE_URL = 'http://127.0.0.1:9'
process.env.VITE_API_TIMEOUT_MS = '100'

const { loadJsonResource } = await import('../src/services/api.js')
const dashboard = await loadJsonResource('dashboard')

assert.equal(dashboard.source, 'api-error', 'A app deve marcar erro quando o json-server não responde.')
assert.ok(dashboard.error?.message, 'A falha da API deve preservar a razão do erro.')
assert.equal(dashboard.data.kpis.length, 0, 'Sem json-server, o dashboard não deve receber dados de fallback.')

console.log('Obrigatoriedade do json-server validada com sucesso.')
