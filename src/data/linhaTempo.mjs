// Conjunto de eventos e metadados da página da linha do tempo.
import { mapData } from './mapa.mjs'
import { calculateRrfSummary } from '../utils/resumoRrf.mjs'

const rrfSummary = calculateRrfSummary(mapData.countryMeta)
const totalRrfValue = `${Math.round(rrfSummary.funds)} mil M€`

export const timelineData = {
  // Datas oficiais que definem o início e fim visual do mecanismo.
  mechanism: {
    start: '2020-05-27T00:00:00.000Z',
    end: '2026-08-31T23:59:59.000Z',
    finalDateLabel: '31 agosto 2026',
    finalDescription:
      'Data limite para conclusão de todos os investimentos e reformas dos PRR e submissão dos pedidos de pagamento finais.',
  },
  // Meses abreviados usados na etiqueta "Hoje".
  shortMonths: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  // Categorias disponíveis no filtro superior.
  categories: [
    { key: 'todos', label: 'Todos' },
    { key: 'legislacao', label: 'Legislação' },
    { key: 'execucao', label: 'Execução UE' },
    { key: 'pagamento', label: 'Pagamentos' },
    { key: 'alerta', label: 'Marcos Críticos' },
  ],
  // Legenda visual associada às categorias do filtro.
  legend: [
    { key: 'legislacao', label: 'Legislação', color: '#6366f1' },
    { key: 'execucao', label: 'Execução UE', color: '#1d4587' },
    { key: 'pagamento', label: 'Pagamento', color: '#d97706' },
    { key: 'alerta', label: 'Marco crítico', color: '#dc2626' },
  ],
  // Eventos oficiais e narrativos apresentados na cronologia.
  events: [
    {
      // Arranque político do pacote NextGenerationEU.
      id: 1,
      type: 'legislacao',
      typeLabel: 'Legislação',
      date: 'Maio 2020',
      title: 'Proposta do NextGenerationEU',
      description:
        'A Comissão Europeia apresenta o pacote NextGenerationEU no valor de 750 mil M€, em resposta à crise pandémica COVID-19. O maior estímulo financeiro alguma vez aprovado pela União Europeia.',
      impact: 'Representa 5,4% do PIB da UE — o maior pacote de recuperação económica da história europeia.',
      countries: 'Todos os 27 Estados-Membros da União Europeia',
    },
    {
      // Entrada em vigor da base legal do mecanismo.
      id: 2,
      type: 'legislacao',
      typeLabel: 'Legislação',
      date: 'Fevereiro 2021',
      title: 'Regulamento MRR entra em vigor',
      description:
        'O Regulamento (UE) 2021/241 é publicado no Jornal Oficial e entra em vigor. Define os seis pilares, os critérios de elegibilidade, os limiares obrigatórios de 37% (clima) e 20% (digital) e as regras de governação.',
      impact:
        'Base jurídica única para todos os PRR europeus. O princípio DNSH torna-se obrigatório em todas as medidas.',
    },
    {
      // Submissão dos planos nacionais pelos Estados-Membros.
      id: 3,
      type: 'execucao',
      typeLabel: 'Execução UE',
      date: 'Abril–Maio 2021',
      title: 'Estados-Membros submetem os 27 PRR',
      description:
        'Os 27 países entregam os seus Planos de Recuperação e Resiliência à Comissão Europeia. Os primeiros 12 planos chegam em abril; a Hungria é o último país a submeter, em maio de 2022.',
      impact:
        'Mais de 700 mil M€ em reformas e investimentos planeados, cobrindo energia, digitalização, coesão social e saúde.',
      countries: '27 Estados-Membros — todos submeteram plano antes do prazo',
    },
    {
      // Primeira vaga de aprovações formore.
      id: 4,
      type: 'execucao',
      typeLabel: 'Execução UE',
      date: 'Junho–Julho 2021',
      title: 'Primeiros PRR aprovados pelo Conselho da UE',
      description:
        'A Comissão emite avaliações positivas e o Conselho aprova formalmente os primeiros planos. Espanha, Itália, França, Alemanha, Grécia e more 12 países recebem luz verde na primeira vaga.',
      impact:
        'Aprovações simultâneas sinalizam o início do maior programa de investimento coordenado da história da UE.',
      countries:
        'Espanha (€69,5 mil M), Itália (€191,5 mil M), França (€40,3 mil M), Alemanha (€26,4 mil M) entre os primeiros',
    },
    {
      // Pagamentos automáticos iniciais aos planos aprovados.
      id: 5,
      type: 'pagamento',
      typeLabel: 'Pagamento',
      date: 'Agosto–Setembro 2021',
      title: 'Pré-financiamentos desembolsados a 26 países',
      description:
        'A Comissão Europeia transfere os pré-financiamentos automáticos — 13% das subvenções e 13% dos empréstimos — a todos os Estados-Membros com PRR aprovado, sem necessidade de cumprimento prévio de marcos.',
      impact: 'Mais de 56 mil M€ imediatamente nas economias europeias para dar início aos investimentos.',
      countries: '26 Estados-Membros receberam pré-financiamento em 2021',
    },
    {
      // Primeiros pedidos regulares dependentes de marcos e metas.
      id: 6,
      type: 'execucao',
      typeLabel: 'Execução UE',
      date: '2021–2022',
      title: 'Primeiros pedidos de pagamento regulares',
      description:
        'Espanha, Itália, Grécia, França e outros países submetem os primeiros pedidos de pagamento após demonstrarem o cumprimento de conjuntos específicos de marcos e metas legislativas.',
      impact:
        'Os primeiros pagamentos regulares confirmam que o mecanismo funciona: reformas concretas em troca de financiamento.',
      countries: 'Espanha (€10 mil M), Itália (€21 mil M), Grécia (€3,6 mil M) entre os primeiros a receber',
    },
    {
      // Adaptação do mecanismo à crise energética.
      id: 7,
      type: 'legislacao',
      typeLabel: 'Legislação',
      date: 'Março 2022',
      title: 'REPowerEU — resposta à crise energética',
      description:
        'Na sequência da invasão da Ucrânia, a Comissão propõe o REPowerEU — um capítulo adicional aos PRR para reduzir a dependência dos combustíveis fósseis russos e acelerar as energias renováveis.',
      impact:
        '20 mil M€ em subvenções adicionais. 25 dos 27 países reveem os seus PRR para incluir o capítulo REPowerEU.',
      countries: 'Todos os 27 Estados-Membros — revisão dos PRR em 2022–2023',
    },
    {
      // Momento de avaliação intercalar e identificação de atrasos.
      id: 8,
      type: 'alerta',
      typeLabel: 'Marco Crítico',
      date: 'Agosto 2023',
      title: 'Avaliação intercalar do MRR',
      description:
        'A Comissão Europeia e o Tribunal de Contas publicam avaliações intercalares. O relatório identifica progressos em energias renováveis e digitalização, mas atrasos em habitação e transportes em vários países.',
      impact:
        'Países com execução abaixo do plano ajustam cronogramas. Hungria mantém fundos suspensos por questões de Estado de direito.',
      countries: 'Todos os 27 países avaliados — atrasos identificados em média em 18% dos marcos',
    },
    {
      // Fase em que os disbursements aceleram.
      id: 9,
      type: 'pagamento',
      typeLabel: 'Pagamento',
      date: '2023–2024',
      title: 'Aceleração dos disbursements europeus',
      description:
        'Os disbursements aceleram significativamente. Itália, Espanha e outros grandes beneficiários recebem múltiplos pedidos de pagamento aprovados. O total desembolsado ultrapassa os 200 mil M€.',
      impact:
        'A maioria dos países cumpre os marcos climáticos e digitais. Energias renováveis superam as metas em 14 países.',
      countries: 'Itália (>113 mil M€), Espanha (>52 mil M€), Roménia, Polónia e Grécia entre os maiores beneficiários',
    },
    {
      // Revisões nacionais para adaptar planos a novos custos e prioridades.
      id: 10,
      type: 'execucao',
      typeLabel: 'Execução UE',
      date: '2024–2025',
      title: 'Revisão dos planos — adaptação pós-pandemia',
      description:
        'Vários Estados-Membros solicitam revisões adicionais dos seus PRR para adaptar investimentos à nova realidade — inflação, aumento dos custos de construção e mudanças de prioridade após as eleições europeias de 2024.',
      impact:
        'As revisões mantêm os envelopes financeiros mas reorientam alguns investimentos para setores com maior impacto. 19 países completaram pelo menos uma revisão.',
      countries: 'Maioria dos 27 países solicitou pelo menos uma revisão ao PRR original',
    },
    {
      // Alerta de proximidade do prazo final.
      id: 11,
      type: 'alerta',
      typeLabel: 'Marco Crítico',
      date: '2025',
      title: 'Contagem decrescente — 12 meses para concluir',
      description:
        'Com apenas 12 meses para o prazo final, os Estados-Membros intensificam a execução. A Comissão emite alertas formore a países com taxas de execução abaixo de 40%.',
      impact: 'Estimativa de 150 mil M€ ainda por desembolsar. Países em risco podem perder parte dos fundos.',
      countries: '6 países com alertas formore por execução insuficiente',
    },
    {
      // Fase final antes da conclusão obrigatória do mecanismo.
      id: 12,
      type: 'execucao',
      typeLabel: 'Execução UE',
      date: '2025–2026',
      title: 'Fase final — conclusão dos investimentos',
      description:
        'Período crítico para conclusão de todos os projetos, reformas e pedidos de pagamento finais. Os países devem demonstrar que todos os marcos e metas foram cumpridos e submeter os pedidos até 31 de agosto de 2026.',
      impact: `Totalidade dos ${totalRrfValue} do MRR a ser comprometida. O legado estará visível em 350.000+ projetos na Europa.`,
      countries: 'Todos os 27 Estados-Membros — prazo final improrrogável: 31 agosto 2026',
    },
  ],
  // Estatísticas de rodapé da página da linha do tempo.
  stats: [
    { value: '2020–2026', label: 'Período histórico' },
    { value: '5 anos', label: 'Duração do mecanismo' },
    { value: totalRrfValue, label: 'Valor total do MRR' },
    { value: '27', label: 'Planos nacionais' },
    { value: '>350.000', label: 'Projetos na Europa' },
  ],
}
