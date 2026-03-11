// Composição que centraliza o carregamento de recursos vindos do json-server.
import { onMounted, ref } from 'vue'
import { fetchJsonResource, getLocalResource } from '@/servicos/api'

// Cria um estado reativo com fallback local e substituição automática pela API.
export function usarRecursoApi(resourceKey) {
  const resource = ref(getLocalResource(resourceKey))

  onMounted(async () => {
    resource.value = await fetchJsonResource(resourceKey)
  })

  return resource
}
