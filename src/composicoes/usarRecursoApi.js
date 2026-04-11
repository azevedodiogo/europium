// Composição que centraliza o carregamento de recursos vindos do json-server.
import { onMounted, ref } from 'vue'
import { fetchJsonResource, getEmptyResource } from '@/servicos/api'

// Cria um estado reativo vazio e substitui-o pelos dados vindos do json-server.
export function usarRecursoApi(resourceKey) {
  const resource = ref(getEmptyResource(resourceKey))

  onMounted(async () => {
    resource.value = await fetchJsonResource(resourceKey)
  })

  return resource
}
