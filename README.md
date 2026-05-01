# Europium

## Como executar

Entrar na pasta do projeto:

```bash
cd europium
```

Instalar as dependencias:

```bash
npm install
```

Executar a API mock:

```bash
npm run db:start
```

Noutro terminal, executar o frontend:

```bash
npm run dev
```

A aplicacao fica disponivel no endereco indicado pelo Vite, normalmente:

```text
http://localhost:5173
```

A API mock fica disponivel em:

```text
http://localhost:3000
```

Se a porta `3000` estiver ocupada, fechar o processo que a está a usar ou arrancar o `json-server` noutra porta e configurar o frontend com:

```bash
VITE_API_BASE_URL=http://localhost:3001 npm run dev
```

## Build

Criar a versao de producao:

```bash
npm run build
```

Previsualizar a build:

```bash
npm run preview
```

## Verificacoes

Validar lint, formatacao, testes basicos e build:

```bash
npm run verify
```

Comandos individuais:

```bash
npm run lint
npm run format:check
npm test
npm run build
```

## Ficheiros de raiz

Os ficheiros de configuracao fora de `src/` ficam versionados porque suportam a execucao e a verificacao do projeto:

- `.env.example` documenta as variaveis usadas pelo Vite e pelo servico mock.
- `.prettierrc.json` define o formato comum usado por `npm run format`.
- `.prettierignore` evita formatar artefactos gerados ou pesados, como `db.json` e `package-lock.json`.
- `.gitattributes` mantem os videos de demonstracao tratados pelo Git LFS.
- `.gitignore` deixa fora dependencias, builds, caches e ficheiros locais do sistema.

## Dados e fontes

Os dados usados pelo projeto são uma base simulada e estruturada para IPM, inspirada no modelo publico do **Recovery and Resilience Scoreboard** da Comissão Europeia:

```text
https://ec.europa.eu/economy_finance/recovery-and-resilience-scoreboard/
```

A base local vive em `src/dados/` e é usada para gerar o `db.json`:

```bash
npm run db:build
```

Em execucao normal, o frontend le os recursos pelo `json-server` em `VITE_API_BASE_URL`. Se a API local estiver indisponivel, as paginas ficam sem dados carregados; para a demonstracao e necessario manter `npm run db:start` num terminal e `npm run dev` noutro.

## Registo de manutencao

- 2026-02-01: revisão documental do projeto.
- 2026-02-02: revisão documental do projeto.
- 2026-02-03: revisão documental do projeto.
- 2026-02-04: revisão documental do projeto.
- 2026-02-05: revisão documental do projeto.
- 2026-02-06: revisão documental do projeto.
- 2026-02-07: revisão documental do projeto.
- 2026-02-08: revisão documental do projeto.
- 2026-02-09: revisão documental do projeto.
- 2026-02-10: revisão documental do projeto.
- 2026-02-11: revisão documental do projeto.
- 2026-02-12: revisão documental do projeto.
- 2026-02-13: revisão documental do projeto.
- 2026-02-14: revisão documental do projeto.
- 2026-02-15: revisão documental do projeto.
- 2026-02-16: revisão documental do projeto.
- 2026-02-17: revisão documental do projeto.
