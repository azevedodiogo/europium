import { spawnSync } from 'node:child_process'

const args = new Set(process.argv.slice(2))
const getArgValue = (name, fallback = null) => {
  const index = process.argv.indexOf(name)
  return index === -1 ? fallback : process.argv[index + 1] || fallback
}

const shouldVerify = args.has('--verify')
const shouldPush = args.has('--push')
const isDryRun = args.has('--dry-run')
const maxArg = getArgValue('--max')
const maxCommits = maxArg === null ? Infinity : Number.parseInt(maxArg, 10)
const remote = getArgValue('--remote', 'origin')
const commitDate = getArgValue('--date', process.env.AUTO_COMMIT_DATE || null)

const run = (command, commandArgs, options = {}) => {
  const result = spawnSync(command, commandArgs, {
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    env: { ...process.env, ...(options.env || {}) },
  })

  if (result.status !== 0) {
    const details = [result.stdout, result.stderr].filter(Boolean).join('\n').trim()
    throw new Error(details || `${command} ${commandArgs.join(' ')} failed`)
  }

  return result.stdout?.trim() || ''
}

const git = (commandArgs, options = {}) => run('git', commandArgs, options)

const lines = (text) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

const unique = (items) => [...new Set(items)].sort()

const getChangedFiles = () => {
  const staged = lines(git(['diff', '--cached', '--name-only'], { capture: true }))

  if (staged.length > 0) {
    throw new Error(
      [
        'There are already staged files.',
        'Commit or unstage them before running this script so it does not mix manual staging with automated commits.',
      ].join('\n')
    )
  }

  const tracked = lines(git(['diff', '--name-only'], { capture: true }))
  const untracked = lines(git(['ls-files', '--others', '--exclude-standard'], { capture: true }))

  return unique([...tracked, ...untracked])
}

const groups = [
  {
    message: 'chore: update project configuration',
    match: (file) =>
      [
        '.env.example',
        '.gitattributes',
        '.gitignore',
        '.prettierignore',
        '.prettierrc.json',
        'eslint.config.js',
        'index.html',
        'package-lock.json',
        'package.json',
        'vite.config.js',
      ].includes(file),
  },
  {
    message: 'docs: update documentation',
    match: (file) => file === 'README.md' || file.startsWith('docs/'),
  },
  {
    message: 'feat: update public assets',
    match: (file) => file.startsWith('public/'),
  },
  {
    message: 'test: update verification scripts',
    match: (file) => file.startsWith('scripts/'),
  },
  {
    message: 'style: update application styles',
    match: (file) => file.startsWith('src/assets/') || file.startsWith('src/directives/'),
  },
  {
    message: 'feat: update application shell',
    match: (file) =>
      ['src/App.vue', 'src/main.js', 'src/router/index.js'].includes(file) || file.startsWith('src/components/layout/'),
  },
  {
    message: 'feat: update shared components',
    match: (file) => file.startsWith('src/components/app/'),
  },
  {
    message: 'feat: update home page',
    match: (file) => file.startsWith('src/components/home/') || file === 'src/pages/PaginaInicial.vue',
  },
  {
    message: 'feat: update milestones page',
    match: (file) => file.startsWith('src/components/milestones-goals/') || file === 'src/pages/PaginaMarcosMetas.vue',
  },
  {
    message: 'feat: update indicators page',
    match: (file) => file.startsWith('src/components/indicators/') || file === 'src/pages/PaginaIndicadores.vue',
  },
  {
    message: 'feat: update disbursements page',
    match: (file) =>
      file.startsWith('src/components/disbursements/') ||
      file === 'src/pages/PaginaDesembolsos.vue' ||
      file === 'src/data/desembolsos.mjs',
  },
  {
    message: 'feat: update country comparison page',
    match: (file) =>
      file.startsWith('src/components/compare-countries/') ||
      file === 'src/pages/PaginaCompararPaises.vue' ||
      file === 'src/data/comparacao.mjs',
  },
  {
    message: 'feat: update map page',
    match: (file) => file === 'src/pages/PaginaMapa.vue' || file === 'src/data/mapa.mjs',
  },
  {
    message: 'feat: update timeline page',
    match: (file) =>
      file.startsWith('src/components/timeline/') ||
      file === 'src/pages/PaginaLinhaTempo.vue' ||
      file === 'src/data/linhaTempo.mjs',
  },
  {
    message: 'feat: update glossary page',
    match: (file) =>
      file.startsWith('src/components/glossary/') ||
      file === 'src/pages/PaginaGlossario.vue' ||
      file === 'src/data/glossario.mjs',
  },
  {
    message: 'feat: update resource pages',
    match: (file) =>
      file.startsWith('src/components/more/') ||
      file === 'src/pages/PaginaMais.vue' ||
      file === 'src/data/mais.mjs',
  },
  {
    message: 'refactor: update data and state helpers',
    match: (file) =>
      file.startsWith('src/composables/') ||
      file.startsWith('src/stores/') ||
      file.startsWith('src/services/') ||
      file.startsWith('src/utils/') ||
      file.startsWith('src/config/') ||
      file === 'db.json' ||
      file.startsWith('src/data/'),
  },
]

const commitGroup = (message, files) => {
  if (isDryRun) {
    console.log(`[dry-run] ${message}${commitDate ? ` (${commitDate})` : ''}`)
    files.forEach((file) => console.log(`  ${file}`))
    return true
  }

  git(['add', '--', ...files])

  const stagedFiles = lines(git(['diff', '--cached', '--name-only'], { capture: true }))
  if (stagedFiles.length === 0) {
    return false
  }

  git(['commit', '-m', message, ...(commitDate ? ['--date', commitDate] : [])], {
    env: commitDate
      ? {
          GIT_AUTHOR_DATE: commitDate,
          GIT_COMMITTER_DATE: commitDate,
        }
      : undefined,
  })
  return true
}

const main = () => {
  const changedFiles = getChangedFiles()

  if (changedFiles.length === 0) {
    console.log('No changes to commit.')
    return
  }

  if (shouldVerify) {
    run('npm', ['run', 'verify'])
  }

  if (!Number.isFinite(maxCommits) && maxArg !== null) {
    throw new Error('--max must be a number.')
  }

  const remaining = new Set(changedFiles)
  let commits = 0

  for (const group of groups) {
    if (commits >= maxCommits) break

    const files = [...remaining].filter(group.match)
    if (files.length === 0) continue

    if (commitGroup(group.message, files)) {
      commits += 1
      files.forEach((file) => remaining.delete(file))
    }
  }

  if (remaining.size > 0 && commits < maxCommits) {
    if (commitGroup('chore: update remaining project files', [...remaining])) {
      commits += 1
      remaining.clear()
    }
  }

  if (remaining.size > 0) {
    console.log(`Stopped at --max ${maxCommits}. Remaining files were left uncommitted.`)
  }

  const action = isDryRun ? 'Would create' : 'Created'
  console.log(`${action} ${commits} commit${commits === 1 ? '' : 's'}.`)

  if (shouldPush && commits > 0) {
    const branch = git(['branch', '--show-current'], { capture: true })
    git(['push', remote, branch])
  }
}

try {
  main()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
