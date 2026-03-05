// Junta todos os datasets locais num único objeto.
// Este objeto é usado como fallback da API e também para gerar o `db.json`.
import { dashboardData } from './painel.mjs'
import { compareData } from './comparacao.mjs'
import { disbursementsData } from './desembolsos.mjs'
import { glossaryData } from './glossario.mjs'
import { timelineData } from './linhaTempo.mjs'
import { mapData } from './mapa.mjs'
import { moreData } from './mais.mjs'
export const mockDb = {
  dashboard: dashboardData,
  compare: compareData,
  disbursements: disbursementsData,
  glossary: glossaryData,
  timeline: timelineData,
  map: mapData,
  more: moreData,
}
