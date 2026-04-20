// Store que controla a notificação mostrada durante as exportações.
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Toda a lógica é mantida aqui para o componente visual ficar simples.
export const useNotificationStore = defineStore('notification', () => {
  // Título principal da notificação.
  const title = ref('')
  // Controla se a notificação está visível.
  const visible = ref(false)
  // Nome do ficheiro exportado.
  const filename = ref('')
  // Linha secundária com detalhe do documento.
  const subtitle = ref('')
  // Percentagem de progresso.
  const progress = ref(0)
  // Marca a exportação como concluída.
  const done = ref(false)
  // Marca a exportação como falhada.
  const isError = ref(false)
  // Guarda a mensagem de erro.
  const errorMsg = ref('')

  // Timer usado para fechar a notificação.
  let _timerDismiss = null
  // Timer usado para a transição para o estado "concluído".
  let _timerDone = null

  // Limpa qualquer timer anterior antes de iniciar um novo fluxo.
  function _limparTimers() {
    if (_timerDismiss) {
      clearTimeout(_timerDismiss)
      _timerDismiss = null
    }
    if (_timerDone) {
      clearTimeout(_timerDone)
      _timerDone = null
    }
  }

  // Inicia uma nova exportação.
  function start(meta) {
    _limparTimers()

    // Aceita tanto uma string simples como um objeto com metadados.
    const resolved =
      typeof meta === 'string'
        ? { filename: meta, title: 'Documento', subtitle: '' }
        : {
            filename: meta?.filename ?? '',
            title: meta?.title ?? 'Documento',
            subtitle: meta?.subtitle ?? '',
          }

    // Repõe o estado visual para um novo progresso.
    title.value = resolved.title
    filename.value = resolved.filename
    subtitle.value = resolved.subtitle
    errorMsg.value = ''
    progress.value = 0
    done.value = false
    isError.value = false
    visible.value = true
  }

  // Mostra a notificação em estado de erro.
  function error(mensagem, meta = {}) {
    _limparTimers()

    title.value = meta.title ?? 'Erro na exportação'
    subtitle.value = meta.subtitle ?? ''
    filename.value = meta.filename ?? ''
    isError.value = true
    errorMsg.value = mensagem
    done.value = false
    progress.value = 0
    visible.value = true

    // Fecha automaticamente ao fim de alguns segundos.
    _timerDismiss = setTimeout(() => {
      visible.value = false
      _timerDismiss = null
    }, 3200)
  }

  // Atualiza a percentagem da barra de progresso.
  function setProgress(pct) {
    if (!isError.value && visible.value) {
      progress.value = pct
    }
  }

  // Passa a notificação para o estado de sucesso e fecha depois.
  function finish() {
    if (!visible.value || isError.value) return

    _limparTimers()
    progress.value = 100

    _timerDone = setTimeout(() => {
      done.value = true
      _timerDone = null

      _timerDismiss = setTimeout(() => {
        visible.value = false
        _timerDismiss = null
      }, 1800)
    }, 300)
  }

  // Fecha manualmente a notificação.
  function dismiss() {
    _limparTimers()
    visible.value = false
  }

  // Expõe o estado e as ações para os componentes.
  return {
    title,
    visible,
    filename,
    subtitle,
    progress,
    done,
    isError,
    errorMsg,
    start,
    setProgress,
    finish,
    error,
    dismiss,
  }
})
