// Dados da página "Mais recursos".
export const moreData = {
  // Recursos apresentados nos cartões desta página.
  resources: [
    {
      id: 'mapa',
      to: '/mapa',
      title: 'Mapa da União Europeia',
      description: 'Visualização coroplética dos 27 Estados-Membros com dados do MRR — progresso de execução, fundos alocados e objectivos climáticos e digitais por país.',
      iconTone: 'blue',
      icon: 'globe',
      chips: ['27 países', 'Mapa interativo', '5 métricas'],
    },
    {
      id: 'glossario',
      to: '/glossario',
      title: 'Glossário PRR',
      description: 'Definições técnicas completas dos termos do MRR — marcos, metas, pilares, indicadores comuns, governação e muito mais. Com pesquisa e filtro por categoria.',
      iconTone: 'slate',
      icon: 'document',
      chips: ['40+ termos', 'Pesquisa', '6 categorias'],
    },
    {
      id: 'linha-tempo',
      to: '/linha-tempo',
      title: 'Linha do Tempo RRF',
      description: 'Os 12 marcos institucionais do Mecanismo — da proposta legislativa de 2020 ao prazo final de execução em agosto de 2026. Filtre por categoria e explore cada evento em detalhe.',
      iconTone: 'amber',
      icon: 'timeline',
      full: true,
      chips: [
        { label: 'Legislação', tone: 'leg' },
        { label: 'Execução UE', tone: 'exec' },
        { label: 'Pagamentos', tone: 'pay' },
        { label: 'Marcos críticos', tone: 'alert' },
      ],
      previewEvents: [
        { left: '6%', year: '2020', color: '#6366f1' },
        { left: '22%', year: '2021', color: '#1d4587' },
        { left: '39%', year: '2021', color: '#d97706' },
        { left: '56%', year: '2022', color: '#6366f1' },
        { left: '72%', year: '2023', color: '#dc2626' },
        { left: '88%', year: '2025', color: '#d97706' },
      ],
    },
  ],
}
