// Escreve o ficheiro `db.json` a partir da base simulada do projeto.
import { writeFile } from 'node:fs/promises'
// Funções de caminhos para localizar a raiz do projeto.
import { dirname, resolve } from 'node:path'
// Converte `import.meta.url` num caminho de ficheiro normal.
import { fileURLToPath } from 'node:url'

// Importa os dados agregados que servem de base ao json-server.
import { mockDb } from '../src/dados/baseSimulada.mjs'

// Descobre a pasta raiz do projeto a partir da localização deste script.
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
// Calcula o caminho final do ficheiro `db.json`.
const targetPath = resolve(rootDir, 'db.json')
// Guarda a página oficial usada como referência funcional e visual dos dados.
const sourceUrl = 'https://ec.europa.eu/economy_finance/recovery-and-resilience-scoreboard/'
// Constrói a base que o json-server expõe, mantendo recursos separados por página.
const jsonServerDb = {
  // Metadados úteis para explicar a origem e o propósito da base de dados.
  meta: {
    project: 'Europium',
    source: sourceUrl,
    generatedAt: new Date().toISOString(),
    note: 'Dados estruturados para o projeto IPM com base no modelo público do Recovery and Resilience Scoreboard.',
    resources: Object.keys(mockDb),
  },
  // Espalha os recursos reais para ficarem acessíveis em `/dashboard`, `/compare`, etc.
  ...mockDb,
}

// Escreve o JSON formatado com indentação de 2 espaços.
await writeFile(targetPath, `${JSON.stringify(jsonServerDb, null, 2)}\n`, 'utf8')

// Informa no terminal onde o ficheiro foi gerado.
console.log(`db.json gerado em ${targetPath}`)
