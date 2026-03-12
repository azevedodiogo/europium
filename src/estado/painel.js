// Cria a store principal com os dados do painel e da página inicial.
import { defineStore } from 'pinia'

// Função comum que mantém homepage e mapa com os mesmos totais.
import { alignDashboardWithRrfSummary } from '@/utilitarios/resumoRrf.mjs'
// Funções auxiliares para clonar dados e tentar a API.
import { cloneData, getLocalResource, loadJsonResources } from '@/servicos/api'

// Cria uma cópia limpa do estado inicial.
function createDashboardState() {
  return getLocalResource('dashboard')
}

// Store de dados principais do projeto.
export const useDashboardStore = defineStore('dashboard', {
  // Estado reativo base.
  state: () => ({
    // Espalha o conteúdo do dataset local.
    ...createDashboardState(),
    // Diz se já tentámos carregar os dados.
    isLoaded: false,
    // Guarda a origem do que está atualmente em uso.
    dataSource: 'local',
  }),

  // Getters usados pelas páginas e componentes.
  getters: {
    // Ordena os países por total alocado.
    topCountriesByAllocation: (state) => [...state.countries].sort((a, b) => b.total - a.total),
    // Lista de países disponíveis em marcos e metas.
    marcosCountries: (state) => [...new Set(state.marcos.map((marco) => marco.country))].sort(),
    // Lista de pilares presentes nos marcos.
    marcosPillars: (state) => [...new Set(state.marcos.map((marco) => marco.pillar))].sort(),
    // Lista dos tipos de registo disponíveis.
    marcosTypes: (state) => [...new Set(state.marcos.map((marco) => marco.type))].sort(),
  },

  // Ações assíncronas e mutações organizadas.
  actions: {
    // Tenta buscar o recurso `dashboard` pela API.
    async loadFromApi() {
      const results = await loadJsonResources(['dashboard', 'map'])
      const alignedData = alignDashboardWithRrfSummary(results.dashboard.data, results.map.data.countryMeta)

      // Aplica os dados recebidos à store atual.
      this.$patch({
        ...cloneData(alignedData),
        isLoaded: true,
        dataSource: results.dashboard.source === 'api' || results.map.source === 'api' ? 'api' : 'local',
      })
    },
  },
})
