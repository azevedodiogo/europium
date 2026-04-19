// Lista de termos, definições e relações do glossário PRR.
export const glossaryData = {
  // Ordem usada nas pills de categoria do glossário.
  categoryOrder: ['Estrutura', 'Execução', 'Financiamento', 'Avaliação', 'Governação', 'Indicadores'],
  // Array principal de termos; cada objeto alimenta cartões, pesquisa e categorias.
  terms: [
    {
      // Termo estrutural sobre contratos de utilização de fundos europeus.
      term: 'Acordo de Parceria',
      short: 'Contrato estratégico entre Estado-Membro e Comissão Europeia.',
      definition:
        'Documento negociado entre um Estado-Membro e a Comissão Europeia que define a estratégia de utilização dos fundos estruturais e de investimento europeus para um determinado período de programação. Estabelece as prioridades de investimento, os objetivos temáticos e a repartição indicativa dos fundos.',
      category: 'Estrutura',
      related: ['Plano de Recuperação e Resiliência', 'Comissão Europeia'],
    },
    {
      // Termo de avaliação ligado à fiscalização externa dos fundos.
      term: 'Auditoria de Desempenho',
      short: 'Avaliação independente da eficiência e eficácia na utilização dos fundos.',
      definition:
        'Processo de controlo externo e independente que verifica se os fundos do MRR foram utilizados de forma eficaz, eficiente e económica. É conduzida pelo Tribunal de Contas Europeu e pelos órgãos nacionais de controlo, podendo conduzir à suspensão ou recuperação de fundos.',
      category: 'Avaliação',
      example:
        'O Tribunal de Contas Europeu auditou regularmente o progresso dos PRR, identificando lacunas na monitorização de marcos e metas em vários Estados-Membros.',
      related: ['Marcos', 'Metas', 'Tribunal de Contas Europeu'],
    },
    {
      // Termo de avaliação usado para medir efeitos das medidas do PRR.
      term: 'Avaliação de Impacto',
      short: 'Estudo que mede os efeitos das reformas e investimentos do PRR.',
      definition:
        'Análise sistemática dos efeitos — esperados ou verificados — das medidas incluídas no PRR sobre a economia, sociedade e ambiente. É obrigatória para determinadas categorias de intervenção e serve para justificar a pertinência e dimensão dos investimentos propostos.',
      category: 'Avaliação',
      related: ['Plano de Recuperação e Resiliência', 'Indicadores Comuns'],
    },
    {
      // Termo de execução para entidades que recebem verbas do PRR.
      term: 'Beneficiário',
      short: 'Entidade pública ou privada que recebe fundos do PRR.',
      definition:
        'Pessoa singular ou coletiva, entidade pública ou privada, que recebe e utiliza diretamente os fundos atribuídos no âmbito do PRR para realizar projetos, reformas ou investimentos aprovados. Os beneficiários são responsáveis pelo cumprimento dos marcos e metas associados às suas intervenções.',
      category: 'Execução',
      example:
        'O CP — Comboios de Portugal é um dos maiores beneficiários do PRR português, com verbas destinadas à modernização da frota ferroviária.',
      related: ['Fundos', 'Marcos', 'Metas'],
    },
    {
      // Termo estrutural que agrupa reformas e investimentos relacionados.
      term: 'Componente',
      short: 'Agrupamento de medidas coerentes dentro de um PRR.',
      definition:
        'Conjunto lógico de reformas e investimentos relacionados que contribuem para um objetivo específico dentro do PRR. Cada componente está associada a pelo menos um dos seis pilares do MRR e tem um orçamento, marcos e metas próprios. O PRR português está organizado em 20 componentes.',
      category: 'Estrutura',
      example:
        'A Componente C01 — "Digitalização da Administração Pública" inclui medidas de modernização dos serviços públicos digitais, como o portal ePortugal.',
      related: ['Pilar', 'Marco', 'Meta', 'Plano de Recuperação e Resiliência'],
    },
    {
      // Instituição europeia que avalia planos e pedidos de pagamento.
      term: 'Comissão Europeia',
      short: 'Órgão executivo da UE responsável pela gestão do MRR.',
      definition:
        'Instituição da União Europeia que atua como órgão executivo, tendo a responsabilidade de avaliar os PRR dos Estados-Membros, aprovar os pedidos de pagamento e monitorizar o cumprimento dos marcos e metas. Emite avaliações positivas que habilitam os pagamentos a cada país.',
      category: 'Governação',
      related: ['MRR', 'Plano de Recuperação e Resiliência', 'Pedido de Pagamento'],
    },
    {
      // Instituição que aprova formalmente os PRR após avaliação positiva.
      term: 'Conselho da União Europeia',
      short: 'Órgão que aprova formalmente os PRR dos Estados-Membros.',
      definition:
        'Instituição da UE composta pelos ministros de cada Estado-Membro. No contexto do MRR, é o Conselho que aprova formalmente, por via de decisão de execução, os PRR apresentados pelos Estados-Membros, com base na avaliação positiva da Comissão Europeia. Também autoriza os pedidos de pagamento.',
      category: 'Governação',
      related: ['Comissão Europeia', 'Plano de Recuperação e Resiliência'],
    },
    {
      // Termo de governação ligado à verificação de legalidade e regularidade.
      term: 'Controlo e Auditoria',
      short: 'Sistema de verificação da legalidade e regularidade das despesas.',
      definition:
        'Conjunto de mecanismos — internos e externos — que garantem que os fundos do MRR são utilizados em conformidade com a lei e com os objetivos definidos. Inclui controlos de primeiro nível (entidade gestora), segundo nível (autoridade de auditoria) e auditorias externas (Tribunal de Contas Europeu, OLAF).',
      category: 'Governação',
      related: ['OLAF', 'Tribunal de Contas Europeu', 'Auditoria de Desempenho'],
    },
    {
      // Conceito financeiro que representa a transferência efetiva de fundos.
      term: 'Desembolso',
      short: 'Transferência efetiva de fundos da UE para o Estado-Membro.',
      definition:
        'Pagamento efetivo realizado pela Comissão Europeia a um Estado-Membro após verificação do cumprimento satisfatório dos marcos e metas acordados. Os desembolsos dividem-se em pré-financiamento (automático, no início) e pagamentos intercalares/finais (condicionados ao cumprimento de compromissos).',
      category: 'Financiamento',
      example:
        'Portugal recebeu um pré-financiamento de 2,2 mil milhões de euros em agosto de 2021 e o 1º pedido de pagamento de 1,2 mil milhões em janeiro de 2022.',
      related: ['Pré-financiamento', 'Pedido de Pagamento', 'MRR'],
    },
    {
      // Entidade nacional de coordenação referida no contexto português.
      term: 'DGTF',
      short: 'Direção-Geral do Tesouro e Finanças — coordenadora do PRR em Portugal.',
      definition:
        'Entidade responsável em Portugal pela coordenação global do PRR, incluindo a articulação com a Comissão Europeia, a preparação dos pedidos de pagamento e a monitorização do cumprimento dos marcos e metas. Funciona como ponto focal nacional do mecanismo.',
      category: 'Governação',
    },
    {
      // Tipo de apoio financeiro reembolsável.
      term: 'Empréstimo MRR',
      short: 'Componente reembolsável dos fundos do MRR.',
      definition:
        'Forma de apoio financeiro do MRR que, ao contrário das subvenções, tem de ser reembolsado pelo Estado-Membro ao longo do tempo. Os empréstimos estão disponíveis até 6,8% do Rendimento Nacional Bruto de cada país e são contratados a taxas favoráveis, refletindo o custo de financiamento da UE.',
      category: 'Financiamento',
      related: ['Subvenção', 'MRR', 'Dotação Nacional'],
    },
    {
      // Montante máximo atribuído a um Estado-Membro.
      term: 'Envelope Financeiro',
      short: 'Montante total de fundos atribuídos a um país no âmbito do MRR.',
      definition:
        'Valor máximo de fundos (subvenções e/ou empréstimos) que um Estado-Membro pode solicitar no âmbito do MRR. Para as subvenções, 70% foi distribuído em 2021 com base em critérios socioeconómicos históricos; os restantes 30% foram distribuídos em 2022 com base na queda real do PIB em 2020-2021.',
      category: 'Financiamento',
      example:
        'Portugal tem um envelope de 16,6 mil milhões de euros — composto por 13,9 mil M em subvenções e 2,7 mil M em empréstimos.',
      related: ['Subvenção', 'Empréstimo MRR', 'Dotação Nacional'],
    },
    {
      // Indicadores que permitem comparar execução entre países.
      term: 'Indicadores Comuns',
      short: '14 indicadores de reporte obrigatório para todos os Estados-Membros.',
      definition:
        'Conjunto de 14 indicadores definidos pela Comissão Europeia que todos os Estados-Membros devem reportar semestralmente, independentemente do conteúdo dos seus PRR. Cobrem áreas como energia renovável, eficiência energética, digitalização, educação, emprego e saúde, permitindo comparações entre países.',
      category: 'Indicadores',
      example:
        'O Indicador Comum 2 mede a "Capacidade adicional de energia renovável instalada" em MW. Portugal reporta este valor semestralmente à Comissão.',
      related: ['MRR', 'Relatório de Progresso', 'Marco', 'Meta'],
    },
    {
      // Conceito digital importante em medidas de administração pública.
      term: 'Interoperabilidade',
      short: 'Capacidade de sistemas de TI comunicarem entre si sem fricção.',
      definition:
        'No contexto do PRR, refere-se especificamente à capacidade dos sistemas informáticos de diferentes entidades públicas — e entre países da UE — partilharem e utilizarem dados de forma fluida e normalizada. É um objetivo transversal do pilar digital do MRR e um critério de avaliação de várias medidas de digitalização.',
      category: 'Indicadores',
      related: ['Transformação Digital', 'Pilar Digital'],
    },
    {
      // Compromisso qualitativo usado para desbloquear pagamentos.
      term: 'Marco',
      short: 'Compromisso qualitativo do PRR associado a uma data de cumprimento.',
      definition:
        'Indicador qualitativo que representa um compromisso específico (aprovação de lei, criação de entidade, lançamento de programa) que deve ser cumprido até uma data definida. O cumprimento de marcos é uma condição necessária para a aprovação dos pedidos de pagamento pelo Conselho da UE.',
      category: 'Execução',
      example:
        'O Marco PT-M001 exigia a aprovação do quadro legal para o Banco de Fomento até Q2 2022 como condição para o 1º pedido de pagamento de Portugal.',
      related: ['Meta', 'Componente', 'Pedido de Pagamento'],
    },
    {
      // Nome formal do instrumento europeu em análise no projeto.
      term: 'Mecanismo de Recuperação e Resiliência (MRR)',
      short: 'O principal instrumento da política de recuperação pós-COVID da UE.',
      definition:
        'Instrumento central da resposta da União Europeia à crise pandémica COVID-19, criado pelo Regulamento (UE) 2021/241. Disponibiliza até 723,8 mil milhões de euros para apoiar reformas e investimentos nos Estados-Membros até 2026. Os fundos são condicionados ao cumprimento de marcos e metas acordados com a Comissão Europeia.',
      category: 'Estrutura',
      related: ['NextGenerationEU', 'PRR', 'Regulamento MRR'],
    },
    {
      // Compromisso quantitativo com valor-alvo mensurável.
      term: 'Meta',
      short: 'Compromisso quantitativo do PRR com um valor-alvo mensurável.',
      definition:
        'Indicador quantitativo e mensurável que define um valor-alvo a atingir (número de habitações renovadas, capacidade instalada em MW, percentagem de PMEs apoiadas, etc.) até uma data determinada. Como os marcos, o cumprimento das metas é verificado antes da aprovação de cada pedido de pagamento.',
      category: 'Execução',
      example:
        'A Meta PT-T027 exige que 15.000 PMEs adotem tecnologias digitais até Q4 2025 como parte da Componente de Digitalização da Economia.',
      related: ['Marco', 'Componente', 'Indicadores Comuns', 'Pedido de Pagamento'],
    },
    {
      // Pacote europeu que financia a recuperação pós-pandemia.
      term: 'NextGenerationEU',
      short: 'Pacote de recuperação económica da UE no valor de 807 mil M€.',
      definition:
        'Instrumento temporário criado pela Comissão Europeia para ajudar a reparar os danos económicos e sociais imediatos causados pela pandemia COVID-19. Com um valor total de 807 mil milhões de euros, financia principalmente o Mecanismo de Recuperação e Resiliência, além de programas como o React-EU e o InvestEU.',
      category: 'Estrutura',
      related: ['MRR', 'PRR', 'Subvenção'],
    },
    {
      // Requisito mínimo de contribuição climática.
      term: 'Objetivo Climático',
      short: 'Requisito de afetação mínima de 37% dos fundos ao clima.',
      definition:
        'O Regulamento do MRR exige que pelo menos 37% das despesas de cada PRR contribuam para os objetivos climáticos da UE. Cada medida é marcada com um coeficiente climático (0%, 40% ou 100%) e a soma ponderada deve atingir o limiar obrigatório. Este requisito promove a transição para uma economia neutra em carbono.',
      category: 'Avaliação',
      related: ['Objetivo Digital', 'Pilar Ecológico', 'Etiquetagem Climática'],
    },
    {
      // Requisito mínimo de contribuição digital.
      term: 'Objetivo Digital',
      short: 'Requisito de afetação mínima de 20% dos fundos à digitalização.',
      definition:
        'O Regulamento do MRR exige que pelo menos 20% das despesas de cada PRR contribuam para a transformação digital. Cada medida é classificada com um coeficiente digital (0%, 40% ou 100%), e a soma ponderada deve atingir o limiar obrigatório. Este requisito apoia a agenda digital europeia.',
      category: 'Avaliação',
      related: ['Objetivo Climático', 'Pilar Digital', 'Indicadores Comuns'],
    },
    {
      // Organismo europeu com competências antifraude.
      term: 'OLAF',
      short: 'Organismo europeu de luta antifraude.',
      definition:
        'Organismo Europeu de Luta Antifraude, responsável por investigar fraudes, corrupção e irregularidades que afetam os interesses financeiros da UE. No âmbito do MRR, o OLAF tem poderes para investigar suspeitas de fraude ou conflito de interesses na utilização dos fundos do PRR, podendo recomendar recuperações e sanções.',
      category: 'Governação',
      related: ['Controlo e Auditoria', 'Tribunal de Contas Europeu'],
    },
    {
      // Modelo de execução que envolve entidades públicas e privadas.
      term: 'Parceria Público-Privada',
      short: 'Modalidade de execução que envolve o setor privado no PRR.',
      definition:
        'Forma de contratação em que uma entidade pública e uma ou mais entidades privadas colaboram para realizar um projeto de interesse público. No contexto do PRR, as PPPs são permitidas em determinadas condições e devem respeitar as regras de contratação pública e as disposições específicas do Regulamento MRR.',
      category: 'Execução',
      related: ['Beneficiário', 'Fundos'],
    },
    {
      // Documento formal que antecede um desembolso.
      term: 'Pedido de Pagamento',
      short: 'Solicitação formal de desembolso de fundos após cumprimento de marcos e metas.',
      definition:
        'Documento formal apresentado por um Estado-Membro à Comissão Europeia solicitando o pagamento de uma tranche de fundos do MRR. Para ser aprovado, o pedido deve demonstrar o cumprimento satisfatório de todos os marcos e metas previstos para esse pagamento. Pode ser apresentado até duas vezes por ano.',
      category: 'Execução',
      example:
        'Portugal apresentou o 1º Pedido de Pagamento em outubro de 2021, demonstrando o cumprimento de 38 marcos e metas, tendo recebido 1,2 mil M€ em janeiro de 2022.',
      related: ['Marco', 'Meta', 'Desembolso', 'Comissão Europeia'],
    },
    {
      // Eixo temático estrutural do MRR.
      term: 'Pilar',
      short: 'Uma das seis áreas temáticas estruturais do MRR.',
      definition:
        'Os seis pilares do MRR são os eixos temáticos que organizam todas as reformas e investimentos dos PRR: (1) Transição Ecológica, (2) Transformação Digital, (3) Crescimento Inteligente, Sustentável e Inclusivo, (4) Coesão Social e Territorial, (5) Saúde e Resiliência, (6) Políticas para a Próxima Geração. Cada componente do PRR é associada a pelo menos um pilar.',
      category: 'Estrutura',
      related: ['Componente', 'MRR', 'Objetivo Climático', 'Objetivo Digital'],
    },
    {
      // Pilar dedicado à transformação digital.
      term: 'Pilar Digital',
      short: 'Pilar 2 do MRR — Transformação Digital.',
      definition:
        'Segundo pilar do MRR, que agrupa as medidas de transformação digital da economia e da sociedade. Inclui investimentos em conectividade, competências digitais, digitalização das administrações públicas e das empresas. Exige que pelo menos 20% das despesas do PRR contribuam para a transformação digital.',
      category: 'Estrutura',
      related: ['Pilar', 'Objetivo Digital', 'Indicadores Comuns'],
    },
    {
      // Pilar dedicado à transição ecológica.
      term: 'Pilar Ecológico',
      short: 'Pilar 1 do MRR — Transição Ecológica.',
      definition:
        'Primeiro pilar do MRR, que agrupa as medidas de descarbonização, eficiência energética, energias renováveis e proteção do ambiente. Exige que pelo menos 37% das despesas do PRR contribuam para os objetivos climáticos da UE, aplicando a metodologia de etiquetagem climática europeia.',
      category: 'Estrutura',
      related: ['Pilar', 'Objetivo Climático', 'Transição Ecológica'],
    },
    {
      // Documento nacional com reformas e investimentos.
      term: 'Plano de Recuperação e Resiliência (PRR)',
      short: 'O documento nacional que descreve as reformas e investimentos financiados pelo MRR.',
      definition:
        'Documento elaborado por cada Estado-Membro que descreve as reformas estruturais e os investimentos prioritários que serão financiados pelo MRR. Deve ser coerente com os pilares do MRR, respeitar os limiares climático (37%) e digital (20%) e incluir marcos e metas mensuráveis. Em Portugal, o PRR vale 16,6 mil milhões de euros.',
      category: 'Estrutura',
      example:
        'O PRR português — "Recuperar Portugal, Construindo o Futuro" — está organizado em 3 dimensões (Resiliência, Transição Climática, Transição Digital) e 20 componentes.',
      related: ['MRR', 'Componente', 'Marco', 'Meta', 'NextGenerationEU'],
    },
    {
      // Pagamento inicial automático no arranque dos planos.
      term: 'Pré-financiamento',
      short: 'Adiantamento automático de fundos no início do PRR.',
      definition:
        'Pagamento inicial efetuado pela Comissão Europeia a cada Estado-Membro, correspondente a 13% do total das subvenções e 13% dos empréstimos solicitados, sem necessidade de cumprimento prévio de marcos ou metas. O pré-financiamento visou proporcionar liquidez imediata para iniciar as medidas do PRR.',
      category: 'Financiamento',
      example:
        'Portugal recebeu 2,2 mil milhões de euros de pré-financiamento em agosto de 2021, após a ratificação da decisão de recursos próprios pelo parlamento.',
      related: ['Desembolso', 'Pedido de Pagamento', 'Subvenção'],
    },
    {
      term: 'Princípio DNSH',
      short: '"Do No Significant Harm" — não causar dano significativo.',
      definition:
        'Princípio do MRR que exige que nenhuma medida dos PRR cause dano significativo a nenhum dos seis objetivos ambientais da UE: mitigação das alterações climáticas, adaptação às alterações climáticas, utilização sustentável de recursos hídricos, economia circular, prevenção da poluição e proteção da biodiversidade. As medidas devem demonstrar conformidade com o DNSH.',
      category: 'Avaliação',
      related: ['Objetivo Climático', 'Pilar Ecológico'],
    },
    {
      term: 'Reforma',
      short: 'Mudança estrutural de política pública ou quadro legal incluída no PRR.',
      definition:
        'Alteração duradoura de um sistema, política pública ou quadro legal — distinguindo-se de um investimento físico. As reformas podem incluir alterações legislativas, criação de novas entidades, reorganização de serviços públicos ou mudanças de procedimento. São geralmente associadas a marcos (não a metas) porque têm natureza qualitativa.',
      category: 'Execução',
      related: ['Marco', 'Investimento', 'Componente'],
    },
    {
      term: 'Regulamento MRR',
      short: 'Regulamento (UE) 2021/241 — base jurídica do MRR.',
      definition:
        'Regulamento do Parlamento Europeu e do Conselho, de 12 de fevereiro de 2021, que estabelece o Mecanismo de Recuperação e Resiliência. Define os objetivos, critérios de elegibilidade, requisitos de conteúdo dos PRR, condições de pagamento, sistema de governação e as disposições relativas aos pilares temáticos.',
      category: 'Estrutura',
      related: ['MRR', 'PRR', 'NextGenerationEU'],
    },
    {
      term: 'Relatório de Progresso',
      short: 'Relatório semestral sobre o avanço na execução do PRR.',
      definition:
        'Documento que cada Estado-Membro apresenta semestralmente à Comissão Europeia com informação sobre o progresso na implementação do PRR — reformas aprovadas, investimentos iniciados, marcos e metas cumpridos, montantes gastos e indicadores comuns reportados. Serve de base para a avaliação dos pedidos de pagamento.',
      category: 'Avaliação',
      related: ['Marco', 'Meta', 'Indicadores Comuns', 'Pedido de Pagamento'],
    },
    {
      term: 'Scoreboard de Recuperação',
      short: 'Painel de monitorização online do progresso dos PRR na UE.',
      definition:
        'Plataforma digital da Comissão Europeia que disponibiliza publicamente dados sobre o progresso de todos os PRR dos 27 Estados-Membros — incluindo marcos e metas cumpridos, montantes desembolsados e indicadores comuns reportados. É a principal fonte de dados para visualizações como as do Europium.',
      category: 'Avaliação',
      related: ['MRR', 'Indicadores Comuns', 'Relatório de Progresso'],
    },
    {
      term: 'Subvenção',
      short: 'Apoio financeiro não reembolsável do MRR.',
      definition:
        'Componente não reembolsável do financiamento do MRR, que não tem de ser devolvida ao orçamento da UE. Representa cerca de 47% da dotação total do mecanismo (338 mil M€ a preços de 2018). A atribuição de subvenções a cada país depende de critérios populacionais, do inverso do PIB per capita e da taxa de desemprego.',
      category: 'Financiamento',
      example:
        'A subvenção portuguesa no MRR é de 13,9 mil milhões de euros, enquanto os empréstimos disponíveis ascendem a 2,7 mil milhões.',
      related: ['Empréstimo MRR', 'Envelope Financeiro', 'Desembolso'],
    },
    {
      term: 'Transição Ecológica',
      short: 'Processo de descarbonização e modernização sustentável da economia.',
      definition:
        'Processo de transformação da economia e da sociedade em direção à neutralidade climática, eficiência energética e proteção ambiental. No âmbito do MRR, corresponde ao Pilar 1 e inclui medidas de energias renováveis, renovação de edifícios, transporte sustentável, hidrogénio verde, agricultura sustentável e economia circular.',
      category: 'Estrutura',
      related: ['Pilar Ecológico', 'Objetivo Climático', 'Princípio DNSH'],
    },
    {
      term: 'Tribunal de Contas Europeu',
      short: 'Organismo independente de auditoria externa da UE.',
      definition:
        'Instituição da UE responsável pela auditoria externa independente das finanças europeias. Verifica se os fundos do MRR foram recebidos e utilizados de forma legal, regular e eficiente. Publica relatórios especiais sobre a implementação do MRR e pode formular recomendações à Comissão e aos Estados-Membros.',
      category: 'Governação',
      related: ['OLAF', 'Controlo e Auditoria', 'Auditoria de Desempenho'],
    },
  ],
}
