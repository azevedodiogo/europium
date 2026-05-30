// Junta todos os datasets locais num único objeto.
// Este objeto é usado para gerar o `db.json` consumido pelo json-server.
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
