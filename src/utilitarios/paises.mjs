import { mapData } from '../dados/mapa.mjs'

export function ordenarPaisesPorNome(paises) {
  return [...paises].sort((a, b) => (a.label ?? a.name).localeCompare(b.label ?? b.name, 'pt-PT'))
}

export function criarOpcoesPaisesEuropeus(countryMeta = mapData.countryMeta) {
  return ordenarPaisesPorNome(
    Object.entries(countryMeta).map(([code, country]) => ({
      value: code,
      label: country.name,
      flag: country.flag,
      planTotal: country.funds,
    }))
  )
}
