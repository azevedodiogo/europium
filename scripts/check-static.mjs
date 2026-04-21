import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const packageJson = JSON.parse(await readFile('package.json', 'utf8'))
const routerSource = await readFile('src/rotas/index.js', 'utf8')
const readme = await readFile('README.md', 'utf8')

async function listSourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) return listSourceFiles(fullPath)
      return /\.(vue|js|mjs)$/.test(entry.name) ? [fullPath] : []
    })
  )

  return files.flat()
}

async function readSources() {
  const files = await listSourceFiles('src')
  const entries = await Promise.all(files.map(async (file) => [file, await readFile(file, 'utf8')]))
  return Object.fromEntries(entries)
}

const requiredScripts = ['lint', 'format', 'format:check', 'test', 'verify', 'build', 'db:start']

for (const script of requiredScripts) {
  assert.ok(packageJson.scripts[script], `Script em falta no package.json: ${script}`)
}

const requiredRoutes = [
  '/',
  '/marcos-metas',
  '/indicadores',
  '/desembolsos',
  '/comparar-paises',
  '/mapa',
  '/mais',
  '/glossario',
  '/linha-tempo',
]

for (const routePath of requiredRoutes) {
  assert.ok(routerSource.includes(`path: '${routePath}'`), `Rota em falta: ${routePath}`)
}

assert.ok(readme.includes('Recovery and Resilience Scoreboard'), 'README deve indicar a fonte de referencia dos dados.')
assert.ok(readme.includes('npm run verify'), 'README deve documentar o comando de verificacao.')
assert.ok(readme.includes('VITE_API_BASE_URL'), 'README deve documentar a configuracao da API.')

const sources = await readSources()

for (const [file, source] of Object.entries(sources)) {
  assert.ok(!/<th\b[^>]*@click/gm.test(source), `${file}: cabecalhos de tabela ordenaveis devem usar botao interno.`)
  assert.ok(!/role=["']button["']/gm.test(source), `${file}: usar <button> real em vez de role="button".`)
  assert.ok(
    !/<(div|span|article|li)\b(?=[^>]*@click(?!\.self))[^>]*>/gm.test(source),
    `${file}: elementos clicaveis devem ser botoes ou links reais.`
  )
}

console.log('Checks estaticos validados com sucesso.')
