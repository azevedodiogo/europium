// Composição que centraliza o carregamento de recursos vindos do json-server, a API local usada para simular dados.
import { onMounted, ref } from 'vue'
import { getEmptyResource, loadJsonResource } from '@/servicos/api'

// Cria um estado reativo vazio e substitui-o pelos dados vindos dessa API local.
export function usarRecursoApi(resourceKey) {
  const resource = ref(getEmptyResource(resourceKey))
  const isLoading = ref(false)
  const error = ref(null)
  const source = ref('empty')

  async function reload() {
    isLoading.value = true
    error.value = null

    try {
      const result = await loadJsonResource(resourceKey)
      resource.value = result.data
      source.value = result.source
      error.value = result.error
    } catch (loadError) {
      error.value = {
        message: loadError?.message ?? 'Não foi possível carregar este recurso.',
        code: 'resource-load-error',
      }
    } finally {
      isLoading.value = false
    }
  }

  Object.assign(resource, {
    isLoading,
    error,
    source,
    reload,
  })

  onMounted(reload)

  return resource
}
