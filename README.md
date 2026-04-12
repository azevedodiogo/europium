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
