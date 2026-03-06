// Dados locais usados na secção de desembolsos.
// Mapa de etiquetas para converter chaves técnicas em texto apresentado ao utilizador.
const TYPE_LABELS = {
  pre: 'Pré-financiamento',
  subvencao: 'Subvenção',
  emprestimo: 'Empréstimo',
}
function payment(id, date, dateLabel, chartDate, parcel, amount, type) {
  // Cria um pagamento normalizado com etiqueta legível do tipo.
  return { id, date, dateLabel, chartDate, parcel, amount, type, typeLabel: TYPE_LABELS[type] }
}
function beneficiary(id, name, sector, amount, project) {
  // Cria um beneficiário com os campos usados pela tabela e pela pesquisa.
  return { id, name, sector, amount, project }
}
export const disbursementsData = {
  // Períodos usados no eixo X do gráfico cumulativo de pagamentos.
  paymentPeriods: ['08/21', '01/22', '11/22', '07/23', '03/24', '09/24'],
  // Ordem lógica dos tipos de pagamento para ordenação da tabela.
  paymentTypeOrder: { pre: 0, subvencao: 1, emprestimo: 2 },
  // Países disponíveis no filtro e respetivo total de plano.
  countryOptions: [
    { value: 'PT', label: 'Portugal', flag: '🇵🇹', planTotal: 16.6 },
    { value: 'ES', label: 'Espanha', flag: '🇪🇸', planTotal: 160.4 },
    { value: 'IT', label: 'Itália', flag: '🇮🇹', planTotal: 191.5 },
    { value: 'FR', label: 'França', flag: '🇫🇷', planTotal: 40.3 },
    { value: 'DE', label: 'Alemanha', flag: '🇩🇪', planTotal: 26.4 },
    { value: 'PL', label: 'Polónia', flag: '🇵🇱', planTotal: 35.4 },
  ],
  // Dados organizados por código de país para facilitar a troca de filtro.
  countryData: {
    PT: {
      // Pagamentos portugueses em ordem cronológica.
      payments: [
        payment('PT-01', '03/08/2021', '3 de agosto de 2021', '08/21', 'Pré-financiamento', 2.2, 'pre'),
        payment('PT-02', '10/01/2022', '10 de janeiro de 2022', '01/22', '1º pedido de pagamento', 1.2, 'subvencao'),
        payment('PT-03', '15/11/2022', '15 de novembro de 2022', '11/22', '2º pedido de pagamento', 1.8, 'subvencao'),
        payment('PT-04', '20/07/2023', '20 de julho de 2023', '07/23', '3º pedido de pagamento', 2.1, 'subvencao'),
        payment('PT-05', '15/03/2024', '15 de março de 2024', '03/24', '4º pedido de pagamento', 1.5, 'subvencao'),
        payment('PT-06', '10/09/2024', '10 de setembro de 2024', '09/24', '5º pedido de pagamento', 1.4, 'emprestimo'),
      ],
      // Beneficiários portugueses usados no ranking.
      beneficiaries: [
        beneficiary('PT-B01', 'CP - Comboios de Portugal', 'Transportes', 742.5, 'Modernização da frota ferroviária'),
        beneficiary('PT-B02', 'Infraestruturas de Portugal', 'Infraestruturas', 687.3, 'Reabilitação da rede ferroviária'),
        beneficiary('PT-B03', 'IHRU - Instituto da Habitação', 'Habitação', 543.2, 'Programa de habitação acessível'),
        beneficiary('PT-B04', 'Agência para a Modernização Administrativa', 'Administração Pública', 412.8, 'Digitalização de serviços públicos'),
        beneficiary('PT-B05', 'DGESTE - Estabelecimentos Escolares', 'Educação', 398.6, 'Escola Digital e equipamentos'),
        beneficiary('PT-B06', 'ADENE - Agência para a Energia', 'Energia', 356.4, 'Eficiência energética em edifícios públicos'),
        beneficiary('PT-B07', 'Metro do Porto', 'Transportes', 324.1, 'Expansão da rede de metro'),
        beneficiary('PT-B08', 'APA - Agência Portuguesa do Ambiente', 'Ambiente', 298.7, 'Gestão sustentável de recursos hídricos'),
      ],
    },
    ES: {
      // Pagamentos espanhóis em ordem cronológica.
      payments: [
        payment('ES-01', '11/08/2021', '11 de agosto de 2021', '08/21', 'Pré-financiamento', 8.9, 'pre'),
        payment('ES-02', '14/01/2022', '14 de janeiro de 2022', '01/22', '1º pedido de pagamento', 3.2, 'subvencao'),
        payment('ES-03', '18/11/2022', '18 de novembro de 2022', '11/22', '2º pedido de pagamento', 6.3, 'subvencao'),
        payment('ES-04', '21/07/2023', '21 de julho de 2023', '07/23', '3º pedido de pagamento', 5.8, 'subvencao'),
        payment('ES-05', '19/03/2024', '19 de março de 2024', '03/24', '4º pedido de pagamento', 10.9, 'subvencao'),
        payment('ES-06', '25/09/2024', '25 de setembro de 2024', '09/24', '5º pedido de pagamento', 8.7, 'emprestimo'),
      ],
      // Beneficiários espanhóis usados no ranking.
      beneficiaries: [
        beneficiary('ES-B01', 'ADIF Alta Velocidad', 'Infraestruturas', 1800, 'Corredores ferroviários de alta capacidade'),
        beneficiary('ES-B02', 'Renfe Operadora', 'Transportes', 1520, 'Renovação de material circulante'),
        beneficiary('ES-B03', 'Ministerio para la Transformación Digital', 'Administração Pública', 1345, 'Serviços públicos digitais'),
        beneficiary('ES-B04', 'SEPI', 'Economia', 1188, 'Fundo de recapitalização empresarial'),
        beneficiary('ES-B05', 'Red.es', 'Tecnologia', 1024, 'Conectividade e inclusão digital'),
        beneficiary('ES-B06', 'Instituto para la Transición Justa', 'Energia', 884, 'Projetos de descarbonização industrial'),
        beneficiary('ES-B07', 'Comunidad de Madrid', 'Administração Local', 796, 'Mobilidade urbana sustentável'),
        beneficiary('ES-B08', 'Ajuntament de Barcelona', 'Administração Local', 742, 'Habitação e espaços públicos resilientes'),
      ],
    },
    IT: {
      // Pagamentos italianos em ordem cronológica.
      payments: [
        payment('IT-01', '13/08/2021', '13 de agosto de 2021', '08/21', 'Pré-financiamento', 24.9, 'pre'),
        payment('IT-02', '12/01/2022', '12 de janeiro de 2022', '01/22', '1º pedido de pagamento', 17.1, 'subvencao'),
        payment('IT-03', '08/11/2022', '8 de novembro de 2022', '11/22', '2º pedido de pagamento', 16.3, 'subvencao'),
        payment('IT-04', '28/07/2023', '28 de julho de 2023', '07/23', '3º pedido de pagamento', 16.2, 'subvencao'),
        payment('IT-05', '28/03/2024', '28 de março de 2024', '03/24', '4º pedido de pagamento', 21.6, 'emprestimo'),
        payment('IT-06', '30/09/2024', '30 de setembro de 2024', '09/24', '5º pedido de pagamento', 17.4, 'emprestimo'),
      ],
      // Beneficiários italianos usados no ranking.
      beneficiaries: [
        beneficiary('IT-B01', 'Rete Ferroviaria Italiana', 'Infraestruturas', 2650, 'Modernização e sinalização da rede ferroviária'),
        beneficiary('IT-B02', 'Enel Italia', 'Energia', 2400, 'Infraestruturas para energias renováveis'),
        beneficiary('IT-B03', 'Invitalia', 'Economia', 2250, 'Apoio à inovação empresarial e PMEs'),
        beneficiary('IT-B04', 'Ministero della Salute', 'Saúde', 1980, 'Digitalização hospitalar e cuidados primários'),
        beneficiary('IT-B05', 'Trenitalia', 'Transportes', 1865, 'Comboios de baixa emissão'),
        beneficiary('IT-B06', 'Cassa Depositi e Prestiti', 'Financeiro', 1710, 'Instrumentos financeiros para municípios'),
        beneficiary('IT-B07', 'Comune di Roma', 'Administração Local', 1624, 'Requalificação urbana e habitação'),
        beneficiary('IT-B08', 'Politecnico di Milano', 'Educação', 1498, 'Laboratórios de inovação e competências digitais'),
      ],
    },
    FR: {
      // Pagamentos franceses em ordem cronológica.
      payments: [
        payment('FR-01', '20/08/2021', '20 de agosto de 2021', '08/21', 'Pré-financiamento', 5.1, 'pre'),
        payment('FR-02', '03/01/2022', '3 de janeiro de 2022', '01/22', '1º pedido de pagamento', 4.2, 'subvencao'),
        payment('FR-03', '16/11/2022', '16 de novembro de 2022', '11/22', '2º pedido de pagamento', 4.9, 'subvencao'),
        payment('FR-04', '19/07/2023', '19 de julho de 2023', '07/23', '3º pedido de pagamento', 4.6, 'subvencao'),
        payment('FR-05', '14/03/2024', '14 de março de 2024', '03/24', '4º pedido de pagamento', 3.6, 'subvencao'),
        payment('FR-06', '06/09/2024', '6 de setembro de 2024', '09/24', '5º pedido de pagamento', 4.0, 'subvencao'),
      ],
      // Beneficiários franceses usados no ranking.
      beneficiaries: [
        beneficiary('FR-B01', 'SNCF Réseau', 'Transportes', 980, 'Rede ferroviária de baixa emissão'),
        beneficiary('FR-B02', 'Bpifrance', 'Financeiro', 872, 'Capacitação e financiamento à transição industrial'),
        beneficiary('FR-B03', 'ANRU', 'Habitação', 798, 'Renovação urbana e habitação sustentável'),
        beneficiary('FR-B04', 'Ministère de la Transition écologique', 'Ambiente', 742, 'Eficiência energética e adaptação climática'),
        beneficiary('FR-B05', 'AP-HP', 'Saúde', 688, 'Modernização digital hospitalar'),
        beneficiary('FR-B06', 'Région Île-de-France', 'Administração Local', 624, 'Mobilidade limpa e interoperabilidade regional'),
        beneficiary('FR-B07', 'ADEME', 'Energia', 598, 'Descarbonização de edifícios e indústria'),
        beneficiary('FR-B08', 'Université PSL', 'Educação', 534, 'Centros de investigação e competências avançadas'),
      ],
    },
    DE: {
      // Pagamentos alemães em ordem cronológica.
      payments: [
        payment('DE-01', '25/08/2021', '25 de agosto de 2021', '08/21', 'Pré-financiamento', 3.1, 'pre'),
        payment('DE-02', '18/01/2022', '18 de janeiro de 2022', '01/22', '1º pedido de pagamento', 2.3, 'subvencao'),
        payment('DE-03', '22/11/2022', '22 de novembro de 2022', '11/22', '2º pedido de pagamento', 2.4, 'subvencao'),
        payment('DE-04', '25/07/2023', '25 de julho de 2023', '07/23', '3º pedido de pagamento', 1.4, 'subvencao'),
        payment('DE-05', '21/03/2024', '21 de março de 2024', '03/24', '4º pedido de pagamento', 2.4, 'subvencao'),
        payment('DE-06', '17/09/2024', '17 de setembro de 2024', '09/24', '5º pedido de pagamento', 1.9, 'subvencao'),
      ],
      // Beneficiários alemães usados no ranking.
      beneficiaries: [
        beneficiary('DE-B01', 'Deutsche Bahn', 'Transportes', 1120, 'Eletrificação e interoperabilidade ferroviária'),
        beneficiary('DE-B02', 'KfW', 'Financeiro', 980, 'Programas de investimento para municípios'),
        beneficiary('DE-B03', 'Bundesagentur für Arbeit', 'Emprego', 845, 'Requalificação e competências digitais'),
        beneficiary('DE-B04', 'Siemens Energy', 'Energia', 792, 'Modernização de redes energéticas'),
        beneficiary('DE-B05', 'Fraunhofer-Gesellschaft', 'Ciência', 688, 'Investigação aplicada e transferência tecnológica'),
        beneficiary('DE-B06', 'Charité Berlin', 'Saúde', 624, 'Dados clínicos e infraestruturas hospitalares'),
        beneficiary('DE-B07', 'Freie Hansestadt Hamburg', 'Administração Local', 578, 'Porto sustentável e mobilidade urbana'),
        beneficiary('DE-B08', 'Berliner Verkehrsbetriebe', 'Transportes', 546, 'Autocarros elétricos e pontos de carregamento'),
      ],
    },
    PL: {
      // Pagamentos polacos em ordem cronológica.
      payments: [
        payment('PL-01', '31/08/2021', '31 de agosto de 2021', '08/21', 'Pré-financiamento', 1.1, 'pre'),
        payment('PL-02', '27/01/2022', '27 de janeiro de 2022', '01/22', '1º pedido de pagamento', 0.9, 'subvencao'),
        payment('PL-03', '29/11/2022', '29 de novembro de 2022', '11/22', '2º pedido de pagamento', 1.2, 'subvencao'),
        payment('PL-04', '27/07/2023', '27 de julho de 2023', '07/23', '3º pedido de pagamento', 0.9, 'subvencao'),
        payment('PL-05', '04/03/2024', '4 de março de 2024', '03/24', '4º pedido de pagamento', 0.9, 'subvencao'),
        payment('PL-06', '24/09/2024', '24 de setembro de 2024', '09/24', '5º pedido de pagamento', 1.3, 'emprestimo'),
      ],
      // Beneficiários polacos usados no ranking.
      beneficiaries: [
        beneficiary('PL-B01', 'PKP Polskie Linie Kolejowe', 'Infraestruturas', 684, 'Corredores ferroviários e sinalização'),
        beneficiary('PL-B02', 'Bank Gospodarstwa Krajowego', 'Financeiro', 612, 'Linhas de crédito para investimentos públicos'),
        beneficiary('PL-B03', 'Narodowy Fundusz Ochrony Środowiska', 'Ambiente', 558, 'Eficiência energética e renováveis'),
        beneficiary('PL-B04', 'Miasto Warszawa', 'Administração Local', 512, 'Mobilidade limpa e bairros resilientes'),
        beneficiary('PL-B05', 'PGE Polska Grupa Energetyczna', 'Energia', 488, 'Armazenamento e redes inteligentes'),
        beneficiary('PL-B06', 'Centralny Port Komunikacyjny', 'Transportes', 446, 'Integração de transportes e acessibilidades'),
        beneficiary('PL-B07', 'Politechnika Warszawska', 'Educação', 398, 'Laboratórios de inovação industrial'),
        beneficiary('PL-B08', 'Uniwersytet Jagielloński', 'Educação', 352, 'Centros de investigação biomédica'),
      ],
    },
  },
}
