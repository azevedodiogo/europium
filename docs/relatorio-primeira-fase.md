# Relatório da Primeira Fase

## Europium

No âmbito deste trabalho prático, foi prototipada a interface de utilizador do _Europium_, um sistema interativo para a visualização e gestão de dados do Mecanismo de Recuperação e Resiliência da União Europeia.
A aplicação destina-se a diversos perfis, desde cidadãos comuns a analistas de políticas públicas.
Neste documento, apresenta-se a interface modelada com recurso à ferramenta Figma, justificando as várias decisões visuais face às exigências de manipulação de grandes volumes de dados governamentais.
O principal foco do desenvolvimento foi apresentar informação complexa e densa de uma forma familiar, flexível e transparente, sem sobrecarregar o utilizador cognitivamente.
Foi também realizada uma avaliação rigorosa baseada nas heurísticas de Nielsen.

## 1. Interface

A plataforma _Europium_ foi concebida de forma a permitir que qualquer utilizador a possa explorar facilmente.
A interface segue uma abordagem minimalista, procurando apresentar a informação essencial relacionada com o EU Recovery and Resilience de forma organizada.

Todas as páginas do site partilham a mesma estrutura.
No topo encontra-se um header com as secções da plataforma: Visão Geral, Marcos e Metas, Indicadores Comuns, Desembolsos e Comparar Países.
A página atualmente selecionada é destacada, permitindo ao utilizador identificar a sua localização dentro do site.
No final da página encontra-se um footer, que inclui novamente as ligações para as diferentes páginas da plataforma.
Esta secção contém também as fontes utilizadas para a recolha da informação apresentada e a identificação dos autores do projeto.

### 1.1 Página Inicial

A página inicial – apresentada ao utilizador quando acede ao site – funciona como uma síntese da execução dos fundos europeus.
Nesta página são apresentados dados globais, como o total de fundos alocados, o número de Estados-Membros e o número de metas já cumpridas.
São também apresentados os seis pilares que estruturam o programa e que representam os principais focos de investimento.

A página inclui ainda uma tabela com dados comparativos entre vários países e um gráfico que compara os objetivos climáticos e digitais por país.
Estes elementos funcionam como exemplos da informação disponível na plataforma, servindo como uma visão introdutória do tipo de dados apresentados.
Para aceder a estas informações com maior detalhe, o site termina com quatro caixas de navegação que encaminham o utilizador para diferentes páginas da plataforma.

<img width="558" height="1078" alt="image" src="https://github.com/user-attachments/assets/f9d4f83a-a267-4c4f-af3e-8f52a126d7c6" />

Figura 1: Captura de ecrã da página "Visão Geral"

### 1.2 Página "Marcos e Metas"

A página "Marcos e Metas" foi concebida para lidar com o grande volume de dados referentes às metas e marcos dos Estados-Membros, com foco na flexibilidade e no controlo do utilizador.

Para facilitar a exploração, foi implementado um sistema de filtros expansível, permitindo selecionar combinações por País, Pilar, Estado de Execução e Tipo. Para situações sem resultados, a tabela apresenta um empty state com a mensagem: “Nenhum resultado encontrado com os filtros selecionados”, acompanhada de um botão para limpar os filtros e reiniciar a pesquisa.

A página apresenta uma visão geral do total de marcos e metas, incluindo a distribuição do seu estado de execução entre cumpridos, parcialmente cumpridos e não cumpridos, seguida de dez cartões com informação sobre cada marco ou meta, incluindo estado, prazo e pilar.
Cada cartão possui um ícone que permite aceder a informações adicionais e mais detalhadas.
Para navegar pelos restantes resultados, foi implementado um sistema de paginação com botões “Anterior” e “Seguinte” posicionados à direita, sendo indicada também a página atual no lado esquerdo.

<img width="571" height="655" alt="image" src="https://github.com/user-attachments/assets/431f86f1-ef4a-45ee-aef0-f22d088fb2b9" />

Figura 2: Captura de ecrâ da página "Marcos e Metas" inicial

<img width="562" height="400" alt="image" src="https://github.com/user-attachments/assets/3b86bdfa-80d9-4490-960a-ac16420ddc3e" />

Figura 3: Captura de ecrã da página "Marcos e Metal" sem resultados

### 1.3 Página "Indicadores Comuns"

A secção "Indicadores Comuns" apresenta os 14 indicadores obrigatórios definidos pela Comissão Europeia, abrangendo áreas como energia, digitalização e saúde.
Os dados são organizados em cartões interativos, que permitem ao utilizador selecionar métricas específicas, como poupança energética anual ou número de habitações renovadas.

A visualização inclui um gráfico de barras comparativo e uma tabela que quantifica o desempenho de cada país.
O gráfico dispõe, ainda, de um ícone de informação que, ao ser clicado, abre um pop-up com detalhes adicionais sobre o indicador correspondente.

<img width="562" height="591" alt="image" src="https://github.com/user-attachments/assets/de610617-032a-46d1-b9f8-ca7ce347718c" />

Figura 4: Captura de ecrã da página "Indicadores Comuns"

### 1.4 Página "Desembolsos"

A página "Desembolsos" detalha os fluxos financeiros transferidos da União Europeia para os Estados-Membros.
Tomando Portugal como exemplo, são apresentados o total desembolsado, as subvenções e os empréstimos.
A interface inclui um gráfico de evolução temporal, uma cronologia de pedidos e uma tabela, que destaca o pré-financiamento inicial e os pedidos de pagamento subsequentes.

A página dispõe ainda de um botão que permite consultar os 100 maiores beneficiários, apresentando a listagem das entidades que receberam os maiores montantes no âmbito do MRR.
Os dados são organizados por entidade, setor de atividade, montante e projeto específico.
Para facilitar a pesquisa, está disponível uma barra que permite ao utilizador localizar um beneficiário específico.

<img width="571" height="703" alt="image" src="https://github.com/user-attachments/assets/81d9e7f5-d677-4475-84ad-5355536bd811" />

Figura 5: Captura ecrã da página "Desembolsos"

### 1.5 Página "Comparar Países"

A página “Comparar Países” permite analisar lado a lado o desempenho de diferentes Estados-Membros, oferecendo ao utilizador a possibilidade de selecionar dois países através de dois botões para realizar uma comparação direta e detalhada.

Cada país é apresentado num cartão que mostra o total de fundos, os montantes já desembolsados, o PIB e o progresso na execução das metas.
Para complementar esta informação, a visualização inclui um gráfico de barras que ilustra a diferença nas tipologias de financiamento (subvenções e empréstimos) e um gráfico radial que compara o desempenho setorial de cada país.
Abaixo das visualizações, encontra-se uma tabela consolidada com todos os dados dos dois países, incluindo a diferença entre eles.

<img width="561" height="664" alt="image" src="https://github.com/user-attachments/assets/f4981400-42e1-46ac-9e9e-e88bef10d57a" />

Figura 6: Captura de ecrã do protótipo da página "Comparar Países"

## 2. Adequação aos Perfis de Utilizador

A arquitetura da interface foi desenhada de forma a responder de forma estrita a três cenários/perfis levantados na fase inicial:

### Perfil 1. Helena Vasconcelos (Analista de Políticas Públicas)

O primeiro perfil de utilizador corresponde a Helena Vasconcelos, uma analista de políticas públicas.
Para esta utilizadora, o foco principal da plataforma é a capacidade de extrair dados brutos e analisar de forma profunda e detalhada todas as informações financeiras e governamentais.

Como as suas tarefas diárias exigem um grande nível de detalhe, a interface foi desenhada com funcionalidades específicas para facilitar o seu trabalho:
em primeiro lugar, implementaram-se botões de exportação de ficheiros nos formatos CSV e JSON.
Estas opções foram colocadas de forma visível ao longo de todas as tabelas principais da plataforma (como nas secções de Marcos e Metas, Indicadores e Desembolsos).
Esta escolha garante à analista uma total flexibilidade, permitindo-lhe descarregar facilmente a informação e manipulá-la de forma offline nas suas próprias ferramentas de análise (como o Excel ou outras bases de dados locais).

Em segundo lugar, e para ajudar a lidar com a enorme quantidade de informação disponível na plataforma, desenvolveu-se um sistema de pesquisa com filtros detalhados.
Este sistema permite à utilizadora cruzar múltiplas variáveis ao mesmo tempo, escolhendo o País, o Pilar de investimento (por exemplo, a transição digital), o Estado de execução e o Tipo de medida.
Graças a esta organização, é possível isolar e encontrar rapidamente as metas de um setor específico, sem que a utilizadora se sinta sobrecarregada com os dados dos restantes países ou áreas.

Outro aspeto fundamental para o trabalho de uma analista é saber a origem exata da informação.
Para garantir um elevado rigor técnico sem encher o ecrã com blocos de texto muito extensos, optou-se por esconder inicialmente as descrições mais complexas.
Em alternativa, a plataforma utiliza painéis que se expandem com um clique e janelas flutuantes contextuais (pop-ups).
Desta forma, quando a utilizadora precisa de compreender um indicador específico, basta interagir com o elemento para que o sistema revele imediatamente a fórmula ou a metodologia de cálculo utilizada, bem como as fontes de dados oficiais dessa métrica.
Esta abordagem mantém a interface visualmente limpa e arrumada, oferecendo o detalhe técnico apenas quando este é realmente solicitado.

Por fim, para dar resposta à necessidade de acompanhar as alterações feitas aos planos de cada país ao longo do tempo, a plataforma inclui uma área dedicada ao histórico de revisões.
Para tornar a leitura dessa evolução mais intuitiva e fácil de seguir, adotou-se o uso de uma linha temporal visual.
Esta representação gráfica ajuda a analista a perceber, de forma clara e cronológica, a ordem exata das atualizações e revisões efetuadas nos planos europeus.

### Perfil 2: Marco Rossi (Cofundador de Startup)

O segundo perfil de utilizador corresponde a um cofundador de uma startup (Marco Rossi).
Este tipo de utilizador procura ferramentas de análise que sejam rápidas e diretas, com o objetivo principal de identificar novas oportunidades de negócio e perceber as tendências de mercado, focando-se de forma especial nas áreas da transição climática e digital.
Como o seu tempo é limitado e o seu foco é prático, a interface precisa de lhe entregar respostas visuais imediatas.

Para dar resposta a estas exigências, a plataforma conta com as seguintes soluções.
Primeiramente, desenvolveu-se uma secção dedicada inteiramente à comparação visual entre diferentes nações.
Nesta área, optou-se pela utilização de gráficos de radar e gráficos de barras.
A escolha destes modelos não foi um acaso: eles permitem que o empreendedor consiga colocar lado a lado o desempenho de vários Estados-Membros e compará-los ao mesmo tempo.
Assim, através de uma leitura visual e instantânea, o utilizador percebe imediatamente quais são os países que estão a apostar mais fundo nos pilares estratégicos (como o ambiente e a digitalização), sem ter a necessidade de ler ou cruzar informações de tabelas extensas e complexas.

Outro aspeto fundamental para este utilizador é perceber como e quando o dinheiro chega ao mercado.
Para isso, a secção de pagamentos (desembolsos) abandonou as listas tradicionais e adotou uma representação visual em forma de linha temporal (cronologia).
Esta organização cronológica mostra as datas exatas dos pagamentos e divide os fundos em três categorias bem definidas: subvenções, empréstimos e pré-financiamentos.
Ao apresentar a informação desta forma temporal e categorizada, o utilizador consegue identificar com grande facilidade os momentos em que ocorrem grandes injeções de capital.

Por fim, todo o desenho destas páginas de análise e dos respetivos gráficos foi pensado para ser visualmente limpo, com um bom uso do espaço e sem distrações.
Esta organização permite que o utilizador consiga exportar ou copiar os gráficos facilmente, podendo usá-los de forma direta nas suas apresentações de negócios para atrair e convencer potenciais investidores.

### Perfil 3: Clara Mendes (Professora do Ensino Secundário)

O terceiro e último perfil de utilizador é representado por Clara Mendes, uma professora do ensino secundário.
Esta utilizadora possui conhecimentos intermédios sobre análise de dados e o seu principal objetivo é perceber, de forma clara e transparente, como é que os fundos europeus estão a melhorar o dia a dia da população.
Como não é especialista em finanças ou economia, a plataforma precisa de lhe transmitir a informação sem recorrer a termos técnicos complicados ou a tabelas demasiado densas.

Para dar resposta a estas necessidades, a interface foi desenhada com as seguintes soluções práticas.

Primeiramente, a página principal da plataforma foi construída para funcionar como um grande resumo visual.
Em vez de apresentar listas de números difíceis de interpretar, esta página destaca apenas os dados mais importantes de forma muito visual e direta.
Isto permite que a utilizadora compreenda o estado geral dos investimentos logo no primeiro olhar.

De seguida, para mostrar o impacto real do dinheiro, a informação na página dos "Indicadores Comuns" foi organizada através de pequenos cartões visuais e minimalistas.
Cada um destes cartões isola um resultado prático, como, por exemplo, o número de salas de aula que receberam equipamentos digitais ou a quantidade de casas que foram renovadas.
Para facilitar ainda mais a leitura, estes números exatos são acompanhados por ícones simples e universais.
Através de uma barra de pesquisa simples e de tabelas organizadas por setor, a utilizadora pode procurar diretamente por entidades ligadas à educação na sua região.
Deste modo, consegue verificar com os seus próprios olhos se outras escolas ou autarquias já receberam os fundos, o que a ajuda a concluir se o atraso na sua escola é um problema local de distribuição ou um atraso nos pagamentos a nível central.

Por fim, para garantir a total transparência exigida por este perfil, a plataforma inclui uma área dedicada a mostrar quem recebe os fundos.
Esta secção apresenta uma lista clara das entidades ou empresas que receberam dinheiro público, organizada por setores (como a educação, a habitação ou os transportes) e indicando o nome específico de cada projeto.
A inclusão de uma barra de pesquisa simples permite à utilizadora procurar rapidamente por uma entidade específica.
Deste modo, a plataforma responde diretamente ao seu desejo cívico de fiscalizar e perceber de forma transparente onde e como o dinheiro público está a ser gasto.

## 3. Avaliação Heurística de Usabilidade (Nielsen)

Para validar as decisões de design, o grupo aplicou as 10 Heurísticas de Jakob Nielsen, focando na redução da carga cognitiva e na eficácia da exploração de dados complexos.

### 3.1 Visibilidade do Estado do Sistema

A interface procura evitar que o utilizador se sinta “perdido” perante a densidade de dados.
No protótipo Figma, o número total de resultados atualiza-se em tempo real e é apresentado acima da lista de resultados.
Para exportações de dados existe uma barra de progresso persistente no topo da página.
No protótipo, esta barra serve como um simples feedback visual imediato.
Prentende-se, na próxima fase, tornar este feedback mais completo e informativo.
Inspirando-nos nas necessidades da Helena, que lida com grandes volumes de dados, a solução atual privilegia feedback claro e contextual (contagem dinâmica e paginação).
O estado de progresso das metas europeias é indicado por um bloco de cor combinado com ícone e texto (Verde representa concluído, Amarelo representa parcialmente concluído e Vermelho representa não concluído) e uma legenda visível, garantindo redundância para questões de percepção de cor.

### 3.2 Correspondência entre o Sistema e o Mundo Real

A linguagem da interface mantém os termos oficiais do domínio PRR (por exemplo, “Beneficiário”, “Investimento”, “Meta”, “Marco”), privilegiando coerência com a terminologia institucional.
Para utilizadores com menor literacia financeira, como a Clara, estão disponíveis tooltips acionados por clique junto aos termos mais técnicos.
Estes tooltips contêm definições breves (1–2 frases) e dados úteis adicionais.
A iconografia funciona como reforço visual: ícones surgem com um rótulo textual adjacente (por exemplo, ao lado da “Ecologia” surge um ícone de uma folha) garantindo redundância entre símbolo e texto.
Elementos de formato seguem as convenções locais: datas em formato português e valores em euros (€).
No protótipo não foram incluídos mapas nem conversão de moedas.
Estas funcionalidades estão assinaladas como opções para a fase 2.

### 3.3 Controlo e Liberdade do Utilizador

O sistema apoia a exploração dos utilizadores assegurando mecanismos claros para recuar quando filtros sucessivos conduzem a resultados indesejados.
No protótipo Figma, sempre que existe pelo menos um filtro aplicado surge um botão proeminente “Repor” que restaura todos os filtros da página ao estado inicial, pedindo confirmação antes de executar.
A interface não disponibiliza um “x” de remoção directa por filtro, mas a remoção pode ser efetuada ao selecionar a opção “Todos” para cada parâmetro.
Este comportamento foi concebido para que a Helena possa explorar iterativamente sem perder controlo do contexto de consulta.

### 3.4 Consistência e Normas

Estabelecemos um Design System visual no protótipo que garante uma experiência fluida e coerente.
Visualmente, os botões mantêm aparência consistente, a tipografia está harmonizada e o espaçamento entre componentes é, de modo geral, uniforme salvo erros acidentais.
A paleta base reduz-se essencialmente a três cores (azul, cinzento e branco), usadas de forma consistente para estados e hierarquia visual.
A iconografia apresenta um estilo uniforme e a barra de navegação mantém alinhamento nas páginas onde aparecem.
Em termos de densidade de informação, o protótipo favorece o uso de white-space, o que reduz a sensação de amontoamento.
Estas decisões visuais apoiam utilizadores como a Helena ao preservar previsibilidade e reduzir a carga cognitiva durante tarefas exploratórias.

### 3.5 Prevenção de Erros

A interface procura minimizar situações de erro através de feedback claro e mecanismos de confirmação.
Quando uma combinação de filtros não produz resultados, o sistema apresenta uma mensagem explicativa em vez de um ecrã vazio, ajudando o utilizador a compreender o que ocorreu.
Para ações irreversíveis, como o reset total de uma comparação de dados personalizada, é apresentada uma confirmação antes da execução, reduzindo o risco de cliques acidentais e perda de trabalho analítico.

### 3.6 Reconhecimento vs. Recordação

Para minimizar a carga cognitiva, a interface mantém visíveis os parâmetros de consulta ativos sob a forma de tags posicionadas próximo do topo da página, permitindo ao utilizador reconhecer imediatamente o contexto atual sem necessidade de memorizar escolhas anteriores.
Cada filtro apresenta claramente o respetivo significado associado ao valor selecionado (por exemplo, “País” e “Portugal”), reforçando a transparência da consulta.
No protótipo, os filtros são reiniciados ao navegar entre dashboards, uma limitação da ferramenta de prototipagem. Na implementação real do sistema, o estado dos filtros será mantido entre vistas, garantindo maior consistência cognitiva.

### 3.7 Flexibilidade e Eficiência de Utilização

A interface foi concebida para acomodar diferentes níveis de experiência, utilizando a mesma estrutura base para utilizadores iniciantes e peritos.
Para utilizadores menos experientes, como a Clara, a interação baseia-se numa secção específica com cards visuais e indicadores simplificados, que apresentam dados agregados e de leitura rápida, permitindo uma compreensão imediata do panorama geral.
Para utilizadores mais experientes, a página de beneficiários inclui uma barra de pesquisa com sugestões dinâmicas, permitindo localizar rapidamente entidades pelo nome e gerar uma lista filtrada sem necessidade de navegação extensiva pelos filtros.
Adicionalmente, funcionalidades como exportações rápidas e comparações lado-a-lado suportam análises mais aprofundadas, promovendo maior eficiência em tarefas recorrentes.
Alguns detalhes mais específicos encontram-se acessíveis através de ações de “Ver mais”, permitindo aprofundamento progressivo sem sobrecarregar a interface principal.

### 3.8 Estética e Desenho Minimalista

O design segue o princípio de Progressive Disclosure (Revelação Progressiva), equilibrando dados agregados e informação detalhada na mesma vista, sem sobrecarga visual.
As páginas apresentam métricas sintéticas e gráficos essenciais (em média dois por dashboard), mantendo a densidade informacional controlada.
O uso estratégico de white-space contribui para a organização visual das métricas e facilita a leitura, permitindo que o utilizador se concentre nos indicadores de investimento relevantes.
A paleta cromática reduzida e o contraste suave reforçam a clareza visual.
Informações adicionais encontram-se acessíveis através de opções de “Ver mais”, apresentadas em pop-up na mesma página, evitando navegação desnecessária e mantendo a interface limpa e funcional.
Elementos decorativos são mínimos e não interferem com a hierarquia da informação.

### 3.9 Ajuda aos Utilizadores a Reconhecer, Diagnosticar e Recuperar de Erros

Quando uma pesquisa não produz resultados, o protótipo apresenta uma mensagem clara no ecrã, acompanhada de um ícone, informando o utilizador de que não existem dados com os filtros selecionados.
A mensagem permite ações imediatas, como alterar os filtros ou repor todos, facilitando a recuperação sem necessidade de navegação adicional.
Outros tipos de erros, como falhas de carregamento ou exportação, não estão incluídos no protótipo atual, mas estão previstos para implementação na segunda fase, garantindo um diagnóstico abrangente e a capacidade de recuperação em situações futuras.

### 3.10 Ajuda e Documentação

A interface foi concebida com o princípio de ser, tanto quanto possível, autoexplicativa, fornecendo ajuda contextual diretamente nos ecrãs.
Para indicadores mais complexos, existem elementos de apoio sempre visíveis que fornecem informação resumida, podendo ser expandidos via tooltip ou pop-up para detalhes adicionais.
Esta abordagem garante que utilizadores como a Clara recebem explicações claras, legendas e descrições concisas no momento da leitura, evitando a necessidade de recorrer a manuais extensos ou glossários externos.
Não existe ainda um glossário global ou ajuda centralizada, sendo esta funcionalidade prevista para uma segunda fase do projeto.

## Uso de LLM's

De acordo com as orientações da Unidade Curricular sobre a utilização de LLM's, informa-se que foram usadas ferramentas de inteligência artificial generativa apenas como apoio.
Numa fase inicial, recorreu-se à criação de esboços visuais através da ferramenta Nano Banana (via Gemini), usando apenas para organizar ideias e orientar o trabalho posterior no Figma.
Todas as decisões relacionadas com o design conceptual, levantamento de requisitos e desenho de ecrãs foram definidas pelos elementos do grupo, com base nas necessidades dos utilizadores e na consulta direta do site oficial do Mecanismo de Recuperação e Resiliência da União Europeia, pelo que nenhuma parte essencial do projeto foi gerada de forma automatizada.

<img width="1600" height="873" alt="image" src="https://github.com/user-attachments/assets/6673f5d7-0e7e-4e00-9447-b0cdcd2b72f8" />

<img width="2816" height="1536" alt="Gemini_Generated_Image_ehf4e6ehf4e6ehf4" src="https://github.com/user-attachments/assets/3dc8d806-3e6b-46a0-9d24-ae51dfe75ee8" />

<img width="2816" height="1536" alt="Gemini_Generated_Image_vodsxzvodsxzvods" src="https://github.com/user-attachments/assets/a8ffbdf8-6855-4fc9-983a-b5419d13bfb1" />

## Conclusão

Ao longo das últimas semanas, foi prototipada a interface do _Europium_, uma plataforma de visualização de dados do Mecanismo de Recuperação e Resiliência da União Europeia.

A definição de três perfis de utilizador permitiu modelar a interface de acordo com diferentes necessidades e cenários de uso.
Já a análise heurística realizada permitiu avaliar e melhorar a usabilidade do protótipo e verificar a consistência e previsibilidade da navegação.
Durante este processo foram, ainda, identificados alguns aspetos que poderão ser melhorados durante o desenvolvimento em Vue.js.

Assim, apesar das limitações apontadas ao longo deste documento, considera-se que o protótipo desenvolvido reúne as condições necessárias para avançar para a fase de implementação na segunda fase deste trabalho prático.

https://www.figma.com/design/ydD2Hc65365wbt9u88FJwg/Europium?node-id=0-1&t=7vnbEIh9Lrs7Yrru-1
