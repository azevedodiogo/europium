# Europium

Europium é uma aplicação web desenvolvida em Vue 3 para visualizar informação sobre o Mecanismo de Recuperação e Resiliência da União Europeia. O projeto apresenta indicadores, marcos e metas, desembolsos, beneficiários, comparação entre países, mapa europeu, glossário e linha do tempo.

## Como executar

Instalar dependências:

```bash
npm install
```

Executar apenas o frontend:

```bash
npm run dev
```

Executar com `json-server`:

```bash
npm run db:start
```

Noutro terminal:

```bash
npm run dev
```

Criar build de produção:

```bash
npm run build
```

## Estrutura geral

```text
src/
  assets/
  componentes/
  composicoes/
  configuracoes/
  dados/
  diretivas/
  estado/
  paginas/
  rotas/
  servicos/
  utilitarios/
```

## Pastas principais

`docs/` fica reservada para documentação e relatório do projeto. Não é apagada nem ignorada pelo Git.

`dist/` é criada automaticamente quando se executa `npm run build`. É a versão final compilada da aplicação, pronta para publicação. Não deve ser editada manualmente, porque qualquer nova build volta a gerar o conteúdo.

`public/` contém ficheiros estáticos que o Vite copia diretamente para a aplicação final, sem passarem pelo sistema de imports do Vue. Neste projeto é usada para recursos públicos como `eu-flag.webp`.

`scripts/` contém automatizações auxiliares do projeto. O caso principal é `build-jsondb.mjs`, que constrói o ficheiro `db.json` usado pelo `json-server`.

`src/assets/` contém estilos globais, variáveis CSS, animações e regras visuais partilhadas.

`src/componentes/` contém os componentes reutilizáveis da aplicação. A pasta está organizada por área funcional, por exemplo `inicio`, `desembolsos`, `marcos-metas`, `comparar-paises`, `linha-tempo`, `glossario`, `mais`, `layout` e `app`.

`src/composicoes/` contém lógica reutilizável de Vue. Neste projeto é usada para gerir o modo claro/escuro e para carregar recursos da API através de `usarRecursoApi`.

`src/configuracoes/` contém configuração de bibliotecas externas, como Chart.js.

`src/dados/` contém os datasets estruturados que servem para gerar o `db.json` e para fallback local quando o `json-server` não está ativo.

`src/diretivas/` contém diretivas Vue próprias, como a animação ao fazer scroll.

`src/estado/` contém a store Pinia principal da aplicação, responsável por expor dados às páginas e componentes.

`src/paginas/` contém as páginas principais ligadas às rotas da aplicação.

`src/rotas/` contém as rotas da aplicação.

`src/servicos/` contém a camada central de acesso a dados, incluindo a tentativa de ler dados da API local, a recuperação dos fallbacks e o carregamento de vários recursos em paralelo.

`src/utilitarios/` contém funções auxiliares sem dependência direta de Vue, como tooltips de gráficos e cálculos de resumo do MRR.

## Páginas da aplicação

`PaginaInicial.vue` apresenta o resumo geral, KPIs, pilares, tabela de países, gráfico climático/digital e atalhos.

`PaginaMarcosMetas.vue` apresenta filtros, estatísticas, cartões e detalhe de marcos e metas.

`PaginaIndicadores.vue` apresenta os indicadores comuns, gráficos, tabela e modal de definição técnica.

`PaginaDesembolsos.vue` apresenta pagamentos, gráfico cumulativo, cronologia, tabela ordenável e beneficiários.

`PaginaCompararPaises.vue` compara dois países através de cartões, gráficos e tabela de diferenças.

`PaginaMapa.vue` apresenta o mapa interativo da União Europeia.

`PaginaGlossario.vue` apresenta termos técnicos com pesquisa, categorias e detalhe.

`PaginaLinhaTempo.vue` apresenta a evolução institucional do MRR e a posição da data atual.

`PaginaMais.vue` agrega recursos adicionais como mapa, glossário e linha do tempo.

## Dados e `json-server`

O projeto usa uma arquitetura híbrida. Primeiro tenta obter dados através da API local em `/api`. Se o servidor não estiver ativo ou se faltar algum recurso, a aplicação continua a funcionar com os dados locais em `src/dados/`.

Os dados de origem estão organizados em `src/dados/`. O ficheiro `db.json`, que fica na raiz do projeto, é a base lida pelo `json-server`. Esse ficheiro é gerado pelo comando `npm run db:build`, através do script `scripts/build-jsondb.mjs`.

O comando `npm run db:start` gera o ficheiro `db.json` e inicia o `json-server` na porta `3000`. O Vite encaminha os pedidos `/api/*` para esse servidor durante o desenvolvimento.

Os recursos principais disponíveis no `json-server` são:

- `/dashboard`
- `/compare`
- `/disbursements`
- `/glossary`
- `/timeline`
- `/map`
- `/more`

Para acrescentar novos dados, o fluxo recomendado é atualizar os ficheiros em `src/dados/` e voltar a executar `npm run db:build`. As páginas carregam os recursos através de `usarRecursoApi`, que tenta primeiro o `json-server` e só usa os dados locais como fallback. A aplicação constrói filtros, listas e gráficos a partir dos próprios dados sempre que possível, por isso novos países ou novos registos passam a aparecer sem ser necessário criar componentes novos.

Mesmo que o `json-server` falhe, existem dados estatísticos locais. Esses dados estão concentrados em `src/dados/baseSimulada.mjs` e nos módulos importados por esse ficheiro. A camada `src/servicos/api.js` é responsável por decidir se usa a API local ou esses fallbacks.

## Exportação

Os botões de exportação geram ficheiros reais em `.json` ou `.csv`. O nome do ficheiro inclui o tema da página e, quando existe filtro ativo, também inclui o país ou o contexto selecionado.

## Responsividade

Neste projeto, responsive significa que a interface se adapta a diferentes tamanhos de ecrã. Em desktop os conteúdos aparecem em grelhas maiores; em tablet e telemóvel as grelhas passam a uma coluna, as tabelas ganham scroll horizontal quando necessário e os filtros ficam empilhados para não ficarem ilegíveis.

## Tecnologias utilizadas

- Vue 3
- Vite
- Pinia
- Vue Router
- Chart.js
- vue-chartjs
- d3-geo
- topojson-client
- world-atlas
- json-server

## Observações

O projeto está preparado para evoluir gradualmente para uma dependência maior do `json-server`, mas mantém dados locais para não bloquear o desenvolvimento visual e funcional enquanto a base de dados final não estiver completa.
