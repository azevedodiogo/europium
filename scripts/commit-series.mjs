import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const commitPlan = [
  ['chore: add git ignore rules', '.gitignore'],
  ['chore: add package manifest', 'package.json'],
  ['chore: add package lockfile', 'package-lock.json'],
  ['chore: add application HTML entrypoint', 'index.html'],
  ['chore: add Vite configuration', 'vite.config.js'],
  ['docs: add project README', 'README.md'],
  ['chore: add commit automation script', 'scripts/commit-series.mjs'],
  ['chore(api): add JSON database build script', 'scripts/build-jsondb.mjs'],
  ['feat(data): add simulated base dataset', 'src/dados/baseSimulada.mjs'],
  ['feat(data): add dashboard dataset', 'src/dados/painel.mjs'],
  ['feat(data): add country comparison dataset', 'src/dados/comparacao.mjs'],
  ['feat(data): add disbursements dataset', 'src/dados/desembolsos.mjs'],
  ['feat(data): add glossary dataset', 'src/dados/glossario.mjs'],
  ['feat(data): add timeline dataset', 'src/dados/linhaTempo.mjs'],
  ['feat(data): add map dataset', 'src/dados/mapa.mjs'],
  ['feat(data): add extra resources dataset', 'src/dados/mais.mjs'],
  ['feat(api): add JSON server database', 'db.json'],
  ['feat(api): add data access service', 'src/servicos/api.js'],
  ['chore(charts): add Chart.js configuration', 'src/configuracoes/chart.js'],
  ['feat(utils): add RRF summary helpers', 'src/utilitarios/resumoRrf.mjs'],
  ['feat(charts): add chart tooltip helpers', 'src/utilitarios/tooltipsGraficos.js'],
  ['feat(theme): add dark mode composable', 'src/composicoes/usarModoEscuro.js'],
  ['feat(api): add API resource composable', 'src/composicoes/usarRecursoApi.js'],
  ['feat(state): add notification store', 'src/estado/notificacao.js'],
  ['feat(state): add dashboard store', 'src/estado/painel.js'],
  ['feat(animation): add scroll animation directive', 'src/diretivas/animarScroll.js'],
  ['feat(router): add application routes', 'src/rotas/index.js'],
  ['chore(app): add Vue application bootstrap', 'src/main.js'],
  ['feat(app): add application shell', 'src/App.vue'],
  ['feat(components): add application icon component', 'src/componentes/app/IconeApp.vue'],
  ['feat(components): add SF icon component', 'src/componentes/app/IconeSf.vue'],
  ['feat(components): add notification status icon', 'src/componentes/app/IconeEstadoNotificacao.vue'],
  ['feat(components): add notification component', 'src/componentes/app/NotificacaoApp.vue'],
  ['feat(components): add selector component', 'src/componentes/app/SeletorApp.vue'],
  ['feat(components): add reset filters control', 'src/componentes/app/ReporFiltrosApp.vue'],
  ['feat(components): add export menu component', 'src/componentes/app/MenuExportacaoApp.vue'],
  ['feat(components): add page header component', 'src/componentes/app/CabecalhoPagina.vue'],
  ['feat(layout): add main header', 'src/componentes/layout/CabecalhoPrincipal.vue'],
  ['feat(layout): add main footer', 'src/componentes/layout/RodapePrincipal.vue'],
  ['feat(home): add hero statistics strip', 'src/componentes/inicio/FaixaEstatisticasHero.vue'],
  ['feat(home): add KPI cards', 'src/componentes/inicio/CartoesKpi.vue'],
  ['feat(home): add pillars grid', 'src/componentes/inicio/GrelhaPilares.vue'],
  ['feat(home): add countries table', 'src/componentes/inicio/TabelaPaises.vue'],
  ['feat(home): add climate and digital chart', 'src/componentes/inicio/GraficoClimaticoDigital.vue'],
  ['feat(home): add explore section', 'src/componentes/inicio/SecaoExplorar.vue'],
  ['feat(home): add hero section', 'src/componentes/inicio/SecaoHero.vue'],
  ['feat(milestones): add milestones filter bar', 'src/componentes/marcos-metas/BarraFiltrosMarcosMetas.vue'],
  ['feat(milestones): add milestones statistics card', 'src/componentes/marcos-metas/CartaoEstatisticasMarcosMetas.vue'],
  ['feat(milestones): add milestones empty state', 'src/componentes/marcos-metas/EstadoVazioMarcosMetas.vue'],
  ['feat(indicators): add indicators bar chart', 'src/componentes/indicadores/GraficoBarrasIndicadores.vue'],
  ['feat(disbursements): add disbursements filter bar', 'src/componentes/desembolsos/BarraFiltrosDesembolsos.vue'],
  ['feat(disbursements): add disbursements KPI cards', 'src/componentes/desembolsos/CartoesKpiDesembolsos.vue'],
  ['feat(disbursements): add disbursements line chart', 'src/componentes/desembolsos/GraficoLinhaDesembolsos.vue'],
  ['feat(disbursements): add payments panel', 'src/componentes/desembolsos/PainelPagamentosDesembolsos.vue'],
  ['feat(disbursements): add beneficiaries panel', 'src/componentes/desembolsos/PainelBeneficiariosDesembolsos.vue'],
  ['feat(comparison): add country comparison filters', 'src/componentes/comparar-paises/BarraFiltrosCompararPaises.vue'],
  ['feat(comparison): add country comparison summary cards', 'src/componentes/comparar-paises/CartoesResumoCompararPaises.vue'],
  ['feat(comparison): add country comparison table', 'src/componentes/comparar-paises/TabelaCompararPaises.vue'],
  ['feat(glossary): add glossary controls', 'src/componentes/glossario/ControlosGlossario.vue'],
  ['feat(timeline): add timeline controls', 'src/componentes/linha-tempo/ControlosLinhaTempo.vue'],
  ['feat(timeline): add timeline statistics grid', 'src/componentes/linha-tempo/GrelhaEstatisticasLinhaTempo.vue'],
  ['feat(resources): add extra resource card', 'src/componentes/mais/CartaoRecursoMais.vue'],
  ['feat(resources): add timeline preview', 'src/componentes/mais/PrevisualizacaoLinhaTempoMais.vue'],
  ['feat(pages): add home page', 'src/paginas/PaginaInicial.vue'],
  ['feat(pages): add milestones page', 'src/paginas/PaginaMarcosMetas.vue'],
  ['feat(pages): add indicators page', 'src/paginas/PaginaIndicadores.vue'],
  ['feat(pages): add disbursements page', 'src/paginas/PaginaDesembolsos.vue'],
  ['feat(pages): add country comparison page', 'src/paginas/PaginaCompararPaises.vue'],
  ['feat(pages): add map page', 'src/paginas/PaginaMapa.vue'],
  ['feat(pages): add glossary page', 'src/paginas/PaginaGlossario.vue'],
  ['feat(pages): add timeline page', 'src/paginas/PaginaLinhaTempo.vue'],
  ['feat(pages): add extra resources page', 'src/paginas/PaginaMais.vue'],
  ['style: add shared animations', 'src/assets/animations.css'],
  ['style: add global application styles', 'src/assets/main.css'],
  ['style: add EU flag asset', 'public/eu-flag.webp'],
].map(([message, path]) => ({ message, paths: [path] }))

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const verify = args.includes('--verify')
const push = args.includes('--push')

const cliCoauthors = args.flatMap((arg, index) => {
  if (arg === '--coauthor') return args[index + 1] ? [args[index + 1]] : []
  if (arg.startsWith('--coauthor=')) return [arg.slice('--coauthor='.length)]
  return []
})

function run(command, argsList, options = {}) {
  const result = spawnSync(command, argsList, {
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit',
  })

  if (result.status !== 0 && !options.allowFailure) {
    const output = [result.stdout, result.stderr].filter(Boolean).join('\n').trim()
    throw new Error(output || `Comando falhou: ${command} ${argsList.join(' ')}`)
  }

  return result
}

function git(argsList, options) {
  return run('git', argsList, options)
}

function npm(argsList, options) {
  return run('npm', argsList, options)
}

function readGitConfigList(key) {
  const result = git(['config', '--get-all', key], { capture: true, allowFailure: true })
  if (result.status !== 0) return []
  return result.stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function normalizeCoauthors() {
  const envCoauthors = (process.env.GIT_COAUTHORS || '')
    .split(/[\n;]+/)
    .map((line) => line.trim())
    .filter(Boolean)

  const configuredCoauthors = readGitConfigList('commit.coauthor')
  const coauthors = [...cliCoauthors, ...envCoauthors, ...configuredCoauthors]
  return [...new Set(coauthors)]
}

function validateCoauthors(coauthors) {
  const invalid = coauthors.filter((coauthor) => !/^.+ <[^<>\s]+@[^<>\s]+>$/.test(coauthor))
  if (coauthors.length < 2 || invalid.length > 0) {
    throw new Error(
      [
        'Configura os dois coautores antes de criar commits.',
        '',
        'Exemplo:',
        '  git config --add commit.coauthor "Nome Um <email-um@example.com>"',
        '  git config --add commit.coauthor "Nome Dois <email-dois@example.com>"',
        '',
        'Também podes usar:',
        '  GIT_COAUTHORS="Nome Um <email-um@example.com>;Nome Dois <email-dois@example.com>" npm run commit:series',
        '',
        invalid.length ? `Entradas inválidas: ${invalid.join(', ')}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    )
  }
}

function hasStagedChanges() {
  const result = git(['diff', '--cached', '--quiet'], { allowFailure: true })
  return result.status !== 0
}

function ensureCleanIndex() {
  if (hasStagedChanges()) {
    throw new Error('Já existem alterações em staging. Faz commit, unstaging ou stash antes de correr este script.')
  }
}

function existingPaths(paths) {
  return paths.filter((path) => existsSync(path))
}

function printPlan(coauthors) {
  console.log('Plano de commits:')
  commitPlan.forEach((item, index) => {
    const paths = existingPaths(item.paths)
    console.log(`${index + 1}. ${item.message}`)
    console.log(`   ${paths.length ? paths.join(', ') : 'sem ficheiros existentes'}`)
  })
  console.log('')
  console.log('Coautores:')
  coauthors.forEach((coauthor) => console.log(`- ${coauthor}`))
}

function commitGroup(group, coauthors) {
  const paths = existingPaths(group.paths)
  if (paths.length === 0) {
    console.log(`A saltar: ${group.message} (sem ficheiros existentes)`)
    return
  }

  git(['add', '--', ...paths])

  if (!hasStagedChanges()) {
    console.log(`A saltar: ${group.message} (sem alterações)`)
    return
  }

  const trailers = coauthors.map((coauthor) => `Co-authored-by: ${coauthor}`).join('\n')
  git(['commit', '-m', group.message, '-m', trailers])
}

function currentBranch() {
  const result = git(['branch', '--show-current'], { capture: true })
  return result.stdout.trim()
}

function main() {
  const coauthors = normalizeCoauthors()

  if (dryRun) {
    printPlan(coauthors.length ? coauthors : ['por configurar'])
    return
  }

  validateCoauthors(coauthors)
  ensureCleanIndex()

  if (verify) npm(['run', 'build'])

  commitPlan.forEach((group) => commitGroup(group, coauthors))

  if (push) {
    const branch = currentBranch()
    git(['push', '-u', 'origin', branch])
  }
}

try {
  main()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
