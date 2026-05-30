import assert from 'node:assert/strict'
import { mockDb } from '../src/data/baseSimulada.mjs'

const requiredResources = ['dashboard', 'compare', 'disbursements', 'glossary', 'timeline', 'map', 'more']

for (const resource of requiredResources) {
  assert.ok(Object.hasOwn(mockDb, resource), `Recurso em falta: ${resource}`)
}

assert.ok(mockDb.dashboard.kpis.length >= 3, 'Dashboard deve ter KPIs principais.')
assert.ok(mockDb.dashboard.countries.length >= 10, 'Dashboard deve ter países suficientes para ranking.')
assert.ok(mockDb.compare.countries.length >= 2, 'Comparação deve ter pelo menos dois países.')
assert.ok(mockDb.disbursements.countryOptions.length >= 2, 'Desembolsos deve ter opções de país.')
assert.ok(Object.keys(mockDb.disbursements.countryData).length >= 2, 'Desembolsos deve ter dados por país.')
assert.ok(mockDb.glossary.terms.length >= 10, 'Glossário deve ter termos suficientes.')
assert.ok(mockDb.timeline.events.length >= 5, 'Linha do tempo deve ter eventos.')
assert.ok(Object.keys(mockDb.map.countryMeta).length >= 10, 'Mapa deve ter metadados por país.')
assert.ok(mockDb.more.resources.length >= 3, 'Página Mais deve ter recursos.')

const compareCodes = new Set(mockDb.compare.countries.map((country) => country.value))
const disbursementCodes = Object.keys(mockDb.disbursements.countryData)

for (const countryCode of disbursementCodes) {
  assert.ok(compareCodes.has(countryCode), `Pais em desembolsos sem entrada na comparação: ${countryCode}`)
}

for (const country of mockDb.compare.countries) {
  assert.ok(country.name, `Pais sem nome na comparação: ${country.value}`)
  assert.ok(country.flag, `Pais sem bandeira na comparação: ${country.value}`)
  assert.ok(country.radar, `Pais sem dados radar na comparação: ${country.value}`)
}

JSON.stringify(mockDb)

console.log('Dados simulados validados com sucesso.')
