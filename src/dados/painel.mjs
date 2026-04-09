// Dados do mapa usados para alinhar os totais globais da homepage.
import { mapData } from './mapa.mjs'
// Função que evita divergências entre homepage, KPIs e mapa.
import { alignDashboardWithRrfSummary } from '../utilitarios/resumoRrf.mjs'

// Conjunto base de compromissos usado para gerar marcos/metas por Estado-Membro.
const commitmentTemplates = [
  {
    ref: 'M001',
    type: 'Marco',
    name: 'Modernização dos serviços públicos digitais',
    description: 'Entrada em funcionamento de serviços públicos digitais interoperáveis para cidadãos e empresas.',
    pillar: 'Digital',
    component: 'C01',
    deadline: 'Q4 2023',
    progressOffset: 0,
  },
  {
    ref: 'M002',
    type: 'Meta',
    name: 'Reforço da eficiência energética',
    description: 'Conclusão de intervenções de eficiência energética em edifícios residenciais, públicos ou de utilização coletiva.',
    pillar: 'Ecologia',
    component: 'C02',
    deadline: 'Q4 2024',
    progressOffset: 8,
  },
  {
    ref: 'M003',
    type: 'Marco',
    name: 'Execução de reformas estruturais',
    description: 'Aprovação e execução de reformas estruturais previstas no plano nacional de recuperação e resiliência.',
    pillar: 'Crescimento',
    component: 'C03',
    deadline: 'Q2 2025',
    progressOffset: 16,
  },
]

// Converte o progresso global do país num estado legível de execução.
function commitmentStatus(progress, offset) {
  const adjustedProgress = progress - offset
  if (adjustedProgress >= 62) return 'cumprido'
  if (adjustedProgress >= 42) return 'parcial'
  return 'nao-cumprido'
}

// Histórico formal apresentado no painel lateral de cada marco/meta.
function commitmentHistory(type, status) {
  const commitmentLabel = type.toLowerCase()
  const statusEvent = {
    cumprido: `${type} validado pela Comissão Europeia`,
    parcial: `Evidência parcial submetida para avaliação`,
    'nao-cumprido': `Atraso comunicado no cumprimento do ${commitmentLabel}`,
  }[status]

  return [
    { event: statusEvent, date: '2025-03-31', source: 'Comissão Europeia' },
    { event: 'Documentação nacional submetida para análise', date: '2024-11-30', source: 'Estado-Membro' },
    { event: `${type} inscrito no plano nacional`, date: '2021-08-01', source: 'Comissão Europeia' },
  ]
}

// Gera uma lista consistente de marcos/metas para os 27 Estados-Membros.
function buildMilestones(countryMeta) {
  let id = 1

  return Object.entries(countryMeta).flatMap(([code, country]) =>
    commitmentTemplates.map((template) => {
      const status = commitmentStatus(country.progress, template.progressOffset)

      return {
        id: id++,
        ref: `${code}-${template.ref}`,
        country: country.name,
        flag: country.flag,
        type: template.type,
        name: template.name,
        description: template.description,
        status,
        deadline: template.deadline,
        pillar: template.pillar,
        component: template.component,
        history: commitmentHistory(template.type, status),
      }
    }),
  )
}

// Dataset base da homepage e de várias secções reutilizadas.
const dashboardBaseData = {
  // KPIs principais mostrados no topo da página inicial.
  kpis: [
    { id: 'fundos-alocados', label: 'Fundos atribuídos', value: '589 mil M€', description: 'Total agregado dos Estados-Membros no mapa', badge: null, icon: 'euro' },
    { id: 'total-desembolsado', label: 'Total Desembolsado', value: '279 mil M€', description: 'Pagamentos já efetuados pela UE', badge: { text: '47% do total', color: 'green' }, icon: 'arrow-down' },
    { id: 'marcos-metas', label: 'Marcos e Metas', value: '4944', description: '2769 já cumpridos', badge: null, icon: 'target' },
    { id: 'progresso-global', label: 'Progresso Global', value: '58%', description: 'Progresso médio dos Estados-Membros', badge: { text: '+8% vs. semestre anterior', color: 'green' }, icon: 'chart' },
  ],
  // Estatísticas curtas usadas dentro do hero da homepage.
  heroStats: [
    { label: 'Fundos totais do MRR', value: '589 mil M€' },
    { label: 'Estados-Membros', value: '27' },
    { label: 'Obj. Climático Médio', value: '43%' },
    { label: 'Obj. Digital Médio', value: '25%' },
  ],
  // Seis pilares do MRR, com texto e progresso usados na grelha da homepage.
  pillars: [
    { id: 'ecologia', name: 'Ecologia', description: 'Transição ecológica', progress: 37.5, icon: 'leaf' },
    { id: 'digital', name: 'Digital', description: 'Transformação digital', progress: 26.4, icon: 'monitor' },
    { id: 'crescimento', name: 'Crescimento', description: 'Crescimento inteligente, sustentável e inclusivo.', progress: 33.1, icon: 'trending-up' },
    { id: 'coesao', name: 'Coesão', description: 'Coesão social & territorial', progress: 28.2, icon: 'users' },
    { id: 'saude', name: 'Saúde', description: 'Resiliência sanitária, económica, social e institucional', progress: 19.8, icon: 'heart' },
    { id: 'proxima-geracao', name: 'Próxima geração', description: 'Políticas para a próxima geração', progress: 15, icon: 'star' },
  ],
  // Tabela resumida de países por fundos totais, desembolsos e progresso.
  countries: [
    { name: 'Itália', total: 191.5, disbursed: 113.5, progress: 61 },
    { name: 'Espanha', total: 160.4, disbursed: 52.0, progress: 61 },
    { name: 'França', total: 40.3, disbursed: 26.4, progress: 63 },
    { name: 'Polónia', total: 35.4, disbursed: 6.3, progress: 30 },
    { name: 'Grécia', total: 30.1, disbursed: 15.6, progress: 60 },
    { name: 'Roménia', total: 27.1, disbursed: 9.2, progress: 35 },
    { name: 'Alemanha', total: 26.4, disbursed: 13.5, progress: 69 },
    { name: 'Portugal', total: 16.6, disbursed: 10.2, progress: 62 },
    { name: 'Croácia', total: 6.4, disbursed: 3.4, progress: 55 },
    { name: 'Países Baixos', total: 4.7, disbursed: 2.8, progress: 56 },
    { name: 'Bélgica', total: 4.5, disbursed: 3.1, progress: 68 },
    { name: 'Áustria', total: 3.5, disbursed: 2.4, progress: 69 },
  ],
  // Valores do gráfico que compara percentagem climática e digital por país.
  climateDigitalData: [
    { code: 'PT', climate: 61, digital: 22 },
    { code: 'ES', climate: 40, digital: 30 },
    { code: 'FR', climate: 46, digital: 25 },
    { code: 'IT', climate: 37, digital: 26 },
    { code: 'DE', climate: 42, digital: 27 },
    { code: 'GR', climate: 38, digital: 23 },
    { code: 'PL', climate: 42, digital: 21 },
    { code: 'RO', climate: 41, digital: 22 },
  ],
  // Atalhos da secção "Explorar Dados" na página inicial.
  exploreLinks: [
    { id: 'marcos-metas', title: 'Marcos e Metas', description: 'Explore objetivos específicos de cada país, prazos e estado de execução.', route: '/marcos-metas', icon: 'target' },
    { id: 'indicadores', title: 'Indicadores Comuns', description: '14 indicadores de reporte obrigatório com dados por país.', route: '/indicadores', icon: 'bar-chart' },
    { id: 'desembolsos', title: 'Desembolsos', description: 'Pagamentos efetuados, datas e montantes discriminados por país.', route: '/desembolsos', icon: 'credit-card' },
    { id: 'comparacao', title: 'Comparação', description: 'Compare o desempenho e investimento entre diferentes países.', route: '/comparar-paises', icon: 'globe' },
  ],
  // Resumo nacional usado no cartão de marcos e metas da homepage.
  countryStats: {
    country: 'Portugal',
    flag: '🇵🇹',
    total: 247,
    cumpridos: { count: 170, pct: 69 },
    parciais: { count: 48, pct: 19 },
    naoCumpridos: { count: 29, pct: 12 },
  },
  // Etiquetas dos estados usados nos filtros e cartões de marcos/metas.
  marcosStatusLabels: {
    cumprido: 'Cumprido',
    parcial: 'Parcial',
    'nao-cumprido': 'Não cumprido',
  },
  // Lista de marcos e metas usada pela página de detalhe e pelos filtros.
  marcos: buildMilestones(mapData.countryMeta),
  // Indicadores comuns apresentados na página própria de indicadores.
  indicadores: [
    {
      // Indicador energético medido em GWh por ano.
      num: 1,
      iconType: 'leaf',
      unit: 'GWh/ano',
      name: 'Poupança no consumo energético anual',
      description: 'Redução do consumo de energia nos edifícios renovados',
      techDefinition: 'Redução total no consumo de energia primária resultante de intervenções de eficiência energética em edifícios residenciais e públicos financiados pelo MRR.',
      methodology: 'Medição baseada na diferença de consumo energético antes e após renovações em edifícios, utilizando medições de contadores inteligentes e auditorias energéticas.',
      source: 'Eurostat, Agências Nacionais de Energia',
      frequency: 'Semestral',
      related: ['Habitações renovadas', 'Edifícios públicos renovados'],
      chartData: [
        { country: 'Itália', value: 3200 },
        { country: 'Espanha', value: 2100 },
        { country: 'França', value: 1800 },
        { country: 'Alemanha', value: 1400 },
        { country: 'Portugal', value: 543 },
        { country: 'Grécia', value: 420 },
      ],
    },
    {
      // Indicador de capacidade renovável instalada.
      num: 2,
      iconType: 'leaf',
      unit: 'MW',
      name: 'Capacidade adicional de energia renovável',
      description: 'Capacidade instalada adicional de fontes de energia renovável',
      techDefinition: 'Capacidade de geração elétrica adicional instalada a partir de fontes renováveis (solar, eólica, hídrica, etc.) como resultado direto de investimentos MRR.',
      methodology: 'Capacidade nominal instalada reportada pelos operadores de rede e verificada por entidades reguladoras nacionais.',
      source: 'Agências Nacionais de Energia, ENTSO-E',
      frequency: 'Semestral',
      related: ['Poupança energética', 'Emissões CO₂ evitadas'],
      chartData: [
        { country: 'Espanha', value: 8500 },
        { country: 'Itália', value: 6200 },
        { country: 'Alemanha', value: 5800 },
        { country: 'França', value: 3200 },
        { country: 'Portugal', value: 1800 },
        { country: 'Grécia', value: 980 },
      ],
    },
    {
      // Indicador de infraestruturas digitais apoiadas.
      num: 3,
      iconType: 'trending',
      unit: 'n.º',
      name: 'Empresas apoiadas',
      description: 'Número de empresas apoiadas em processos de inovação e digitalização',
      techDefinition: 'Empresas que receberam apoio financeiro direto (subsídios, empréstimos garantidos) para projetos de inovação, digitalização ou transição energética no âmbito do MRR.',
      methodology: 'Contagem de entidades empresariais únicas que beneficiaram de apoios MRR, com base nos registos dos organismos pagadores nacionais.',
      source: 'Organismos Pagadores Nacionais, IAPMEI',
      frequency: 'Semestral',
      related: ['Investigadores I&D', 'Digitalização PMEs'],
      chartData: [
        { country: 'Itália', value: 185000 },
        { country: 'Espanha', value: 95000 },
        { country: 'França', value: 38000 },
        { country: 'Alemanha', value: 42000 },
        { country: 'Portugal', value: 12400 },
        { country: 'Grécia', value: 8500 },
      ],
    },
    {
      num: 4,
      iconType: 'school',
      unit: 'n.º',
      name: 'Investigadores com melhores condições',
      description: 'Investigadores em instituições de I&D apoiadas pelo MRR',
      techDefinition: 'Número de investigadores (equivalente a tempo completo) em instituições de I&D que receberam financiamento MRR para melhoria de infraestruturas e condições de trabalho.',
      methodology: 'Equivalente a Tempo Completo (ETC) reportado por instituições beneficiárias com base nos contratos de trabalho e bolsas ativas durante o período de referência.',
      source: 'Fundações de Ciência nacionais, Eurostat',
      frequency: 'Anual',
      related: ['Empresas apoiadas', 'Patentes registadas'],
      chartData: [
        { country: 'Itália', value: 22000 },
        { country: 'Espanha', value: 18500 },
        { country: 'França', value: 9200 },
        { country: 'Alemanha', value: 8500 },
        { country: 'Portugal', value: 2800 },
        { country: 'Grécia', value: 1800 },
      ],
    },
    {
      num: 5,
      iconType: 'school',
      unit: 'n.º',
      name: 'Jovens com formação',
      description: 'Jovens que concluíram programas de formação financiados pelo MRR',
      techDefinition: 'Jovens (15-29 anos) que completaram com aproveitamento programas de formação profissional ou educação vocacional financiados pelo MRR.',
      methodology: 'Contagem de certificados de conclusão emitidos em programas MRR para jovens, reportada por entidades formadoras credenciadas.',
      source: 'Ministérios da Educação e Trabalho',
      frequency: 'Semestral',
      related: ['Salas de aula digitais', 'Participantes formação'],
      chartData: [
        { country: 'Espanha', value: 420000 },
        { country: 'Itália', value: 380000 },
        { country: 'França', value: 180000 },
        { country: 'Portugal', value: 85000 },
        { country: 'Grécia', value: 42000 },
        { country: 'Alemanha', value: 95000 },
      ],
    },
    {
      num: 6,
      iconType: 'monitor',
      unit: 'n.º',
      name: 'Salas de aula digitais',
      description: 'Salas de aula equipadas com tecnologias digitais via MRR',
      techDefinition: 'Salas de aula em estabelecimentos de ensino (básico, secundário e superior) que receberam equipamento digital (quadros interativos, tablets, etc.) financiado pelo MRR.',
      methodology: 'Contagem de salas de aula validadas como equipadas segundo critérios mínimos estabelecidos pela Comissão Europeia.',
      source: 'Ministérios da Educação nacionais',
      frequency: 'Semestral',
      related: ['Jovens com formação', 'Estudantes abrangidos'],
      chartData: [
        { country: 'Itália', value: 52000 },
        { country: 'Espanha', value: 38000 },
        { country: 'França', value: 22000 },
        { country: 'Alemanha', value: 18500 },
        { country: 'Portugal', value: 8200 },
        { country: 'Grécia', value: 4800 },
      ],
    },
    {
      num: 7,
      iconType: 'home',
      unit: 'n.º',
      name: 'Habitações renovadas',
      description: 'Habitações com melhoria da classe energética após renovação MRR',
      techDefinition: 'Habitações que melhoraram a sua classificação de eficiência energética em pelo menos uma classe (ex: D→C) como resultado de obras de reabilitação financiadas pelo MRR.',
      methodology: 'Baseado em certificados energéticos emitidos antes e após obras, verificados por auditores certificados nacionais.',
      source: 'Agências nacionais de energia, ADENE (PT)',
      frequency: 'Semestral',
      related: ['Poupança energética', 'Edifícios públicos renovados'],
      chartData: [
        { country: 'Itália', value: 4200000 },
        { country: 'Alemanha', value: 1800000 },
        { country: 'França', value: 750000 },
        { country: 'Espanha', value: 510000 },
        { country: 'Polónia', value: 280000 },
        { country: 'Portugal', value: 45000 },
      ],
    },
    {
      num: 8,
      iconType: 'bolt',
      unit: 'n.º',
      name: 'Pontos de carregamento EV',
      description: 'Pontos de carregamento para veículos elétricos instalados',
      techDefinition: 'Pontos de carregamento para veículos elétricos (normal e rápido) instalados em espaços públicos e semi-públicos com apoio direto de fundos MRR.',
      methodology: 'Contagem de pontos de carregamento interoperáveis registados na plataforma OCPI nacional, com financiamento MRR verificável.',
      source: 'Operadores nacionais de rede, MOBI.E (PT)',
      frequency: 'Semestral',
      related: ['Capacidade renovável', 'Emissões CO₂'],
      chartData: [
        { country: 'França', value: 85000 },
        { country: 'Alemanha', value: 72000 },
        { country: 'Espanha', value: 45000 },
        { country: 'Itália', value: 38000 },
        { country: 'Portugal', value: 12500 },
        { country: 'Grécia', value: 5200 },
      ],
    },
    {
      num: 9,
      iconType: 'leaf',
      unit: 'ha',
      name: 'Área protegida/restaurada',
      description: 'Área natural protegida ou restaurada com apoio do MRR',
      techDefinition: 'Área terrestre ou marinha (em hectares) sujeita a medidas de proteção, restauração de ecossistemas ou combate à desertificação financiadas pelo MRR.',
      methodology: 'Medição de área via sistemas de informação geográfica (SIG) certificados, com validação por entidades ambientais competentes.',
      source: 'Agências Ambiente nacionais, APA (PT)',
      frequency: 'Anual',
      related: ['Emissões CO₂', 'Biodiversidade'],
      chartData: [
        { country: 'Espanha', value: 285000 },
        { country: 'Portugal', value: 98000 },
        { country: 'Grécia', value: 75000 },
        { country: 'Itália', value: 64000 },
        { country: 'França', value: 48000 },
        { country: 'Alemanha', value: 22000 },
      ],
    },
    {
      num: 10,
      iconType: 'monitor',
      unit: 'n.º',
      name: 'População com acesso a banda larga',
      description: 'Pessoas com acesso a banda larga de alta velocidade via MRR',
      techDefinition: 'Número de residentes com acesso a serviços de banda larga de pelo menos 100 Mbps como resultado de investimentos em infraestrutura MRR.',
      methodology: 'Baseado em cobertura de rede reportada por operadores de telecomunicações e verificada por autoridades reguladoras nacionais.',
      source: 'Autoridades reguladoras telecomunicações, ANACOM (PT)',
      frequency: 'Semestral',
      related: ['Salas aula digitais', 'Digitalização empresas'],
      chartData: [
        { country: 'Itália', value: 8500000 },
        { country: 'Espanha', value: 6200000 },
        { country: 'França', value: 4800000 },
        { country: 'Alemanha', value: 3900000 },
        { country: 'Portugal', value: 1200000 },
        { country: 'Grécia', value: 850000 },
      ],
    },
    {
      num: 11,
      iconType: 'school',
      unit: 'n.º',
      name: 'Participantes em educação/formação',
      description: 'Adultos que participaram em formação financiada pelo MRR',
      techDefinition: 'Adultos (30+ anos) que participaram em pelo menos uma ação de formação ou educação de adultos financiada pelo MRR, independentemente da sua conclusão.',
      methodology: 'Contagem de inscrições únicas em ações de formação MRR, reportadas por entidades formadoras acreditadas aos ministérios competentes.',
      source: 'Ministérios Trabalho/Educação, IEFP (PT)',
      frequency: 'Semestral',
      related: ['Jovens formação', 'Qualificações digitais'],
      chartData: [
        { country: 'Itália', value: 580000 },
        { country: 'Espanha', value: 420000 },
        { country: 'França', value: 195000 },
        { country: 'Polónia', value: 145000 },
        { country: 'Portugal', value: 85000 },
        { country: 'Grécia', value: 48000 },
      ],
    },
    {
      num: 12,
      iconType: 'heart',
      unit: 'n.º',
      name: 'Capacidade de cuidados de saúde',
      description: 'Novas camas hospitalares ou equivalente em capacidade de saúde',
      techDefinition: 'Aumento de capacidade de internamento (camas hospitalares equivalentes) resultante de construção ou reabilitação de infraestruturas de saúde financiadas pelo MRR.',
      methodology: 'Inventário de camas certificadas por autoridades de saúde nacionais em unidades inauguradas ou renovadas com fundos MRR.',
      source: 'Ministérios da Saúde nacionais, DGS (PT)',
      frequency: 'Anual',
      related: ['Pessoas abrangidas saúde', 'Infraestrutura hospitalar'],
      chartData: [
        { country: 'Itália', value: 28000 },
        { country: 'Espanha', value: 22000 },
        { country: 'França', value: 7800 },
        { country: 'Polónia', value: 9500 },
        { country: 'Portugal', value: 3200 },
        { country: 'Grécia', value: 1800 },
      ],
    },
    {
      num: 13,
      iconType: 'home',
      unit: 'm²',
      name: 'Edifícios públicos renovados',
      description: 'Área de edifícios públicos sujeita a reabilitação energética',
      techDefinition: 'Área (m²) de edifícios da Administração Pública sujeita a obras de reabilitação com componente de eficiência energética, financiadas pelo MRR.',
      methodology: 'Medição de área intervencionada declarada por entidades públicas e verificada por auditorias energéticas pré e pós-obras.',
      source: 'Ministérios das Finanças e Ambiente nacionais',
      frequency: 'Semestral',
      related: ['Poupança energética', 'Habitações renovadas'],
      chartData: [
        { country: 'Itália', value: 4200000 },
        { country: 'Espanha', value: 2800000 },
        { country: 'França', value: 1500000 },
        { country: 'Alemanha', value: 1200000 },
        { country: 'Portugal', value: 320000 },
        { country: 'Grécia', value: 180000 },
      ],
    },
    {
      num: 14,
      iconType: 'home',
      unit: 'km',
      name: 'Km de rede ferroviária',
      description: 'Quilómetros de linha ferroviária nova ou reabilitada',
      techDefinition: 'Extensão de linha ferroviária (km) nova, reabilitada ou modernizada (incluindo eletrificação e sinalização digital) com financiamento MRR.',
      methodology: 'Medição de extensão de via reportada pelos gestores de infraestrutura ferroviária nacionais, verificada por entidades reguladoras do setor.',
      source: 'Gestores infraestrutura ferroviária, IP (PT)',
      frequency: 'Semestral',
      related: ['Emissões CO₂', 'Mobilidade sustentável'],
      chartData: [
        { country: 'Itália', value: 2800 },
        { country: 'Espanha', value: 2200 },
        { country: 'França', value: 850 },
        { country: 'Alemanha', value: 620 },
        { country: 'Portugal', value: 180 },
        { country: 'Grécia', value: 95 },
      ],
    },
  ],
}

// Dataset exportado já com os totais alinhados com os 27 países do mapa.
export const dashboardData = alignDashboardWithRrfSummary(dashboardBaseData, mapData.countryMeta)
