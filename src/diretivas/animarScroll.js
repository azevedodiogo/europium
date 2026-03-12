// Guarda uma única instância do observer.
// Assim evitamos criar um observer novo para cada elemento.
let _observer = null

// Cria o observer apenas na primeira utilização.
function obterObserver() {
  if (!_observer) {
    _observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          // Ignora entradas que ainda não chegaram à zona visível.
          if (!entrada.isIntersecting) return

          // Elemento real observado.
          const el = entrada.target
          // Atraso opcional lido do dataset.
          const atraso = parseInt(el.dataset.animDelay || '0', 10)
          // Indica se a animação deve entrar em cascata pelos filhos.
          const stagger = el.dataset.stagger !== undefined
          // Variante mais rápida da cascata.
          const rapido = el.dataset.staggerFast !== undefined

          // Quando o modo stagger está ativo, anima os filhos um a um.
          if (stagger) {
            Array.from(el.children).forEach((filho, i) => {
              setTimeout(
                () => filho.classList.add('sa-visible'),
                atraso + i * (rapido ? 60 : 90)
              )
            })
          } else {
            // Caso normal: anima apenas o próprio elemento.
            setTimeout(() => el.classList.add('sa-visible'), atraso)
          }

          // Depois de animar uma vez, deixa de observar o elemento.
          _observer.unobserve(el)
        })
      },
      {
        // Só dispara quando uma pequena parte do elemento entra no ecrã.
        threshold: 0.08,
        // Antecipação ligeira para a animação começar um pouco antes.
        rootMargin: '0px 0px -32px 0px'
      }
    )
  }

  return _observer
}

// Diretiva usada como `v-scroll-animate`.
export const scrollAnimateDirective = {
  mounted(el, { value, modifiers, arg }) {
    // Tipo de animação pedido no template.
    const tipo = value ?? 'fade-up'
    // Ativa animação em cascata.
    const stagger = !!modifiers.stagger
    // Versão rápida da cascata.
    const rapido = !!modifiers.fast
    // Atraso extra passado no argumento da diretiva.
    const atraso = arg ? parseInt(arg, 10) : 0

    if (stagger) {
      // Marca o contentor como stagger.
      el.dataset.stagger = ''

      // Marca também a variante rápida quando pedida.
      if (rapido) el.dataset.staggerFast = ''

      // Cada filho recebe uma classe-base para a animação funcionar em cascata.
      Array.from(el.children).forEach((filho) => {
        filho.classList.add('sa-child')
      })
    } else {
      // Em modo normal, a classe é aplicada diretamente ao elemento.
      el.classList.add(`sa-${tipo}`)
    }

    // Guarda o atraso no dataset para o observer o usar mais tarde.
    if (atraso) el.dataset.animDelay = String(atraso)

    // Espera pelo próximo frame antes de começar a observar.
    requestAnimationFrame(() => obterObserver().observe(el))
  },

  unmounted(el) {
    // Quando o elemento sai do DOM, deixa de ser observado.
    _observer?.unobserve(el)
  },
}
