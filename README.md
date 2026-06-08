# Europium

> 1st phase: 20/20
> 2nd phase: ?/20

## Português

Este repositório destina-se à plataforma Europium, desenvolvida no âmbito da unidade curricular “Interface Pessoa-Máquina”.

O Europium é uma aplicação web interativa concebida para visualizar, explorar e comparar dados relacionados com o Mecanismo de Recuperação e Resiliência da União Europeia. A plataforma procura transformar informação densa, financeira e institucional num conjunto de páginas claras, navegáveis e visualmente consistentes, permitindo que diferentes perfis de utilizadores, desde cidadãos comuns a estudantes e analistas, compreendam melhor a execução dos fundos europeus.

A página inicial apresenta uma visão geral da execução do programa, reunindo métricas sintéticas sobre fundos alocados, Estados-Membros, metas cumpridas e pilares de investimento. Esta área funciona como ponto de entrada para a aplicação, oferecendo uma leitura rápida do estado global do mecanismo e encaminhando o utilizador para secções mais específicas da plataforma.

A secção de marcos e metas foi desenhada para lidar com grandes volumes de informação sem sobrecarregar cognitivamente o utilizador. A interface permite consultar objetivos associados aos diferentes Estados-Membros, distinguindo estados de execução, prazos, tipos de compromisso e pilares estratégicos. O sistema de filtros e paginação facilita a procura de informação concreta, mantendo uma organização visual estável mesmo quando existem muitos resultados.

A página de indicadores comuns apresenta os 14 indicadores definidos pela Comissão Europeia para acompanhamento semestral dos planos nacionais. O utilizador pode selecionar cada indicador, consultar a sua descrição, analisar dados quantitativos por país e observar comparações através de gráficos e tabelas. Esta secção foi desenvolvida com especial atenção à legibilidade dos dados, à clareza das unidades e à consistência entre cartões, gráficos e elementos de exportação.

A área de desembolsos permite acompanhar os pagamentos efetuados aos Estados-Membros, incluindo subvenções, empréstimos, pré-financiamentos e pedidos de pagamento. A informação é apresentada através de métricas financeiras, cronologias, tabelas e listagens de beneficiários, permitindo compreender a evolução dos fundos ao longo do tempo e a sua distribuição por entidades e projetos.

A plataforma inclui ainda uma página de comparação entre países, um mapa interativo da União Europeia, um glossário temático e uma linha do tempo relacionada com o Mecanismo de Recuperação e Resiliência. Estes elementos complementares tornam a navegação mais exploratória e ajudam o utilizador a cruzar dados financeiros, indicadores, eventos e conceitos institucionais relevantes.

O projeto foi implementado com Vue, Vite, Pinia, Vue Router, Chart.js, D3 Geo e json-server. A aplicação utiliza uma base de dados local simulada, inspirada no modelo público do Recovery and Resilience Scoreboard da Comissão Europeia, permitindo testar a experiência de navegação, os estados de carregamento e a integração entre frontend e API mock. A arquitetura separa páginas, componentes, stores, serviços, dados e utilitários, mantendo a interface organizada e facilitando a evolução do projeto.

Made with ❤️ by Diogo Azevedo, Bruno Magalhães & Vera Almeida

## English

This repository is intended for the Europium platform, developed as part of the academic course “Human-Computer Interaction”.

Europium is an interactive web application designed to visualize, explore and compare data related to the European Union Recovery and Resilience Facility. The platform aims to transform dense financial and institutional information into a clear, navigable and visually consistent set of pages, allowing different user profiles, from citizens to students and analysts, to better understand the execution of European funds.

The home page presents an overview of the programme execution, gathering summary metrics about allocated funds, Member States, completed milestones and investment pillars. This area works as the entry point of the application, providing a quick reading of the global state of the mechanism and guiding the user towards more specific sections of the platform.

The milestones and targets section was designed to handle large amounts of information without cognitively overloading the user. The interface allows users to inspect objectives associated with different Member States, distinguishing execution status, deadlines, commitment types and strategic pillars. The filtering and pagination system makes it easier to search for specific information while preserving a stable visual organization even when many results are available.

The common indicators page presents the 14 indicators defined by the European Commission for the semi-annual monitoring of national plans. Users can select each indicator, read its description, analyze quantitative data by country and observe comparisons through charts and tables. This section was developed with particular attention to data readability, unit clarity and consistency between cards, charts and export elements.

The disbursements area allows users to follow payments made to Member States, including grants, loans, pre-financing and payment requests. Information is presented through financial metrics, timelines, tables and beneficiary listings, making it possible to understand the evolution of funds over time and their distribution across entities and projects.

The platform also includes a country comparison page, an interactive European Union map, a thematic glossary and a timeline related to the Recovery and Resilience Facility. These complementary elements make navigation more exploratory and help users connect financial data, indicators, events and relevant institutional concepts.

The project was implemented with Vue, Vite, Pinia, Vue Router, Chart.js, D3 Geo and json-server. The application uses a simulated local database inspired by the public model of the European Commission Recovery and Resilience Scoreboard, allowing the navigation experience, loading states and integration between the frontend and the mock API to be tested. The architecture separates pages, components, stores, services, data and utilities, keeping the interface organized and making the project easier to evolve.

Made with ❤️ by Diogo Azevedo, Bruno Magalhães & Vera Almeida

## Comandos - Commands

### Instalação - Installation

[PT] Pode instalar as dependências do projeto através do comando `install` do npm.\
[EN] You can install the project dependencies using the npm `install` command.

```bash
npm install
```

### API Mock - Mock API

[PT] Pode gerar e executar a base de dados local através do comando `db:start` do npm.\
[EN] You can generate and run the local database using the npm `db:start` command.

```bash
npm run db:start
```

### Executável - Executable

[PT] Pode executar a aplicação em modo de desenvolvimento através do comando `dev` do npm.\
[EN] You can run the application in development mode using the npm `dev` command.

```bash
npm run dev
```

### Testes - Tests

[PT] Pode executar os testes de validação dos dados, da API e dos ficheiros estáticos através do comando `test` do npm.\
[EN] You can run the data, API and static file validation tests using the npm `test` command.

```bash
npm test
```

### Verificações - Checks

[PT] Pode validar lint, formatação, testes e compilação através do comando `verify` do npm.\
[EN] You can validate linting, formatting, tests and build using the npm `verify` command.

```bash
npm run verify
```

### Compilação - Build

[PT] Pode construir a versão de produção através do comando `build` do npm.\
[EN] You can build the production version using the npm `build` command.

```bash
npm run build
```

## Demonstração - Demonstration

[PT] O vídeo de demonstração apresenta a navegação pelas principais páginas da plataforma, incluindo dashboards, indicadores, desembolsos, comparação entre países, mapa interativo, glossário e linha do tempo.

[EN] The demonstration video presents the navigation through the platform's main pages, including dashboards, indicators, disbursements, country comparison, interactive map, glossary and timeline.

https://github.com/azevedodiogo/europium/blob/main/docs/videos/demo-video.mp4
