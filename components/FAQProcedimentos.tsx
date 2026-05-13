'use client';

import { useMemo, useState } from 'react';

type FAQItem = {
  id: number;
  categoria: string;
  pergunta: string;
  resposta: string;
  dica: string;
  tags: string[];
};

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    categoria: 'Identidade e Missão',
    pergunta: 'O que é a SECID e qual é a sua natureza jurídica?',
    resposta:
      'A Secretaria de Estado das Cidades — SECID é um órgão auxiliar do Governador do Estado do Paraná, a ele direta e imediatamente subordinado, nos termos do inciso II do art. 33 da Lei nº 21.352, de 1º de janeiro de 2023. Seu regulamento foi aprovado pelo Decreto nº 4.497, de 20 de dezembro de 2023.',
    dica:
      "Veterano: 'Não confunda a SECID com a SEIA nem com a SEIL. A SECID cuida de cidades, urbanismo, habitação e edificações públicas. Se o assunto for inovação digital, é outra pasta. Se for rodovias, é outra. Cada secretaria tem seu campo — errar o encaminhamento custa semanas.'",
    tags: ['Lei 21.352/2023', 'Decreto 4.497/2023', 'órgão auxiliar do Governador'],
  },
  {
    id: 2,
    categoria: 'Identidade e Missão',
    pergunta: 'Quais são as principais competências da SECID?',
    resposta:
      'A SECID tem 21 competências definidas no art. 1º do Regulamento. As principais são: formular políticas públicas para desenvolvimento urbano, regional, metropolitano e integrado; prestar assistência técnica aos municípios; promover infraestrutura urbana; coordenar a política habitacional do Estado; planejar e fiscalizar obras e serviços de engenharia de edificações de interesse estadual; gerir Fundos Estaduais de Desenvolvimento Urbano e Metropolitano; e gerenciar o Sistema de Financiamento de Ações nos Municípios — SFM.',
    dica:
      "Veterano: 'Quando um município vem com demanda de urbanismo, convênio de infraestrutura ou obra de prédio público estadual — é SECID. Decore esse escopo. Tudo que é edificação pública do Estado passa por aqui, independente de qual secretaria vai usar o prédio.'",
    tags: ['art. 1º do Regulamento', '21 competências', 'desenvolvimento urbano', 'habitação', 'edificações públicas'],
  },
  {
    id: 3,
    categoria: 'Identidade e Missão',
    pergunta: 'Quais entidades estão vinculadas ou relacionadas à SECID?',
    resposta:
      'A SECID possui duas entidades no nível de atuação descentralizada: a Agência de Assuntos Metropolitanos do Paraná — AMEP e a Companhia de Habitação do Paraná — COHAPAR. Além disso, o serviço social autônomo PARANACIDADE vincula-se à SECID por cooperação, nos termos da Lei nº 15.211/2006. A Superintendência Geral de Apoio aos Municípios — SAM também se subordina à SECID conforme Decreto nº 138/2023.',
    dica:
      "Veterano: 'AMEP cuida da governança metropolitana. COHAPAR cuida de habitação social. PARANACIDADE apoia tecnicamente os municípios. São entidades distintas com orçamentos próprios — não trate como se fossem departamentos internos da Secretaria.'",
    tags: ['AMEP', 'COHAPAR', 'PARANACIDADE', 'SAM', 'entidades vinculadas'],
  },
  {
    id: 4,
    categoria: 'Estrutura Organizacional',
    pergunta: 'Como é composta a estrutura organizacional básica da SECID?',
    resposta:
      'A estrutura da SECID, definida no art. 2º do Regulamento, compreende 8 níveis: (I) Direção Superior — Secretário de Estado; (II) Decisão Colegiada — Concidades Paraná; (III) Assessoramento — Gabinete do Secretário e Assessoria Técnica; (IV) Gerência — Diretor-Geral, Diretores de área e Unidades Técnicas; (V) Atuação Sistêmica — 6 Núcleos Setoriais; (VI) Execução Programática — Coordenações subordinadas às Diretorias; (VII) Atuação Regional — Núcleos Regionais das Cidades; (VIII) Atuação Descentralizada — AMEP e COHAPAR.',
    dica:
      "Veterano: 'Antes de encaminhar qualquer demanda, saiba em qual nível ela se resolve. Assunto estratégico vai para o Secretário ou Diretor-Geral. Execução técnica vai para as Coordenações. Demanda regional vai para o NRC da sua área. Errar o nível é perder tempo.'",
    tags: ['art. 2º', '8 níveis hierárquicos', 'organograma', 'Decreto 4.497/2023'],
  },
  {
    id: 5,
    categoria: 'Estrutura Organizacional',
    pergunta: 'Quais são as diretorias da SECID e suas áreas de atuação?',
    resposta:
      'A SECID possui quatro diretorias no nível de gerência: (1) Diretor-Geral — DG: integração interna e gestão administrativa da pasta; (2) Diretor de Desenvolvimento e Integração — DDI: políticas de desenvolvimento urbano, regional e metropolitano, gestão do SFM e dos Fundos Urbanos; (3) Diretor de Apoio aos Municípios — DAM: assistência técnica, convênios e repasses aos municípios; (4) Diretor de Edificações Públicas — DEP: planejamento, fiscalização e gestão de contratos de obras de edificações públicas estaduais.',
    dica:
      "Veterano: 'DDI pensa o território e a política. DAM opera o relacionamento com os 399 municípios. DEP constrói e fiscaliza prédios públicos. São mundos distintos dentro da mesma secretaria. Quem confunde as competências das diretorias atrasa qualquer processo.'",
    tags: ['DG', 'DDI', 'DAM', 'DEP', 'diretorias', 'competências'],
  },
  {
    id: 6,
    categoria: 'Estrutura Organizacional',
    pergunta: 'O que são os Núcleos Setoriais e quais existem na SECID?',
    resposta:
      'Os Núcleos Setoriais compõem o nível de atuação sistêmica e realizam atividades estruturais vinculadas aos sistemas estaduais. Na SECID existem 6 núcleos: Núcleo de Planejamento Setorial — NPS (vinculado à SEPL); Núcleo Fazendário Setorial — NFS (vinculado à SEFA); Núcleo Administrativo Setorial — NAS (vinculado à SEAP); Núcleo de Recursos Humanos Setorial — NRHS (vinculado à SEAP); Núcleo de Integridade e Compliance Setorial — NICS (vinculado à CGE); Núcleo de Comunicação Setorial — NCS (vinculado à SECOM).',
    dica:
      "Veterano: 'Os núcleos setoriais parecem internos mas seguem as regras das secretarias-mãe. RH segue a SEAP, finanças segue a SEFA. Quando surgir dúvida sobre processo de pessoal ou orçamento, consulte o regulamento da secretaria responsável pelo sistema — não só o regulamento da SECID.'",
    tags: ['NPS', 'NFS', 'NAS', 'NRHS', 'NICS', 'NCS', 'núcleos setoriais', 'atuação sistêmica'],
  },
  {
    id: 7,
    categoria: 'Processos e Competências Técnicas',
    pergunta: 'O que é o Sistema de Financiamento de Ações nos Municípios — SFM e quem o administra?',
    resposta:
      'O SFM é o Sistema de Financiamento de Ações nos Municípios do Estado do Paraná, instituído pela Lei nº 17.655, de 07 de agosto de 2013. Sua administração compete à SECID, especificamente por meio da Coordenação de Desenvolvimento Urbano e Regional — CDUR, subordinada ao Diretor de Desenvolvimento e Integração. O SFM é um dos instrumentos de financiamento de infraestrutura urbana e desenvolvimento institucional dos municípios paranaenses.',
    dica:
      "Veterano: 'O SFM é dinheiro real para municípios. Mas para acessar, o município precisa ter toda a documentação em ordem — certidões, plano de trabalho, sem inadimplência. A CCOR cuida da tramitação. Municípios que chegam sem documentação perdem a janela de repasse.'",
    tags: ['SFM', 'Lei 17.655/2013', 'CDUR', 'financiamento municipal', 'infraestrutura urbana'],
  },
  {
    id: 8,
    categoria: 'Processos e Competências Técnicas',
    pergunta: 'Qual é o papel da SECID nas obras de edificações públicas estaduais?',
    resposta:
      'A SECID é o órgão central responsável por planejar, coordenar, fiscalizar e receber obras e serviços de engenharia de edificações de interesse estadual para toda a Administração Direta, Autárquica e Fundacional do Poder Executivo do Paraná. Isso inclui: elaborar Termos de Referência, definir parâmetros de BDI, manter a Tabela de Custos de Obras, credenciar profissionais e empresas, gerir contratos e fiscalizar a execução. Outros órgãos só podem realizar as próprias obras sem a SECID se houver autorização expressa do Governador.',
    dica:
      "Veterano: 'Se algum órgão do Estado quiser construir ou reformar sem passar pela SECID, precisa de autorização do Governador. Isso é letra da lei. Projetos que tentam contornar esse fluxo enfrentam problemas jurídicos na licitação. A SECID não é burocracia — é o guardião da legalidade das obras públicas.'",
    tags: ['edificações públicas', 'BDI', 'Tabela de Custos', 'fiscalização', 'TED', 'obras estaduais'],
  },
  {
    id: 9,
    categoria: 'Processos e Competências Técnicas',
    pergunta: 'O que é BDI e qual é o papel da SECID na sua definição?',
    resposta:
      'BDI — Bonificações e Despesas Indiretas — é o percentual que incide sobre os custos diretos de obras para cobrir despesas como administração central, seguros, garantias e lucro. Compete à SECID definir os parâmetros aceitáveis de BDI para os projetos, obras e serviços de engenharia dos órgãos da administração direta e autárquica do Estado do Paraná, determinando os preços máximos admissíveis nas licitações públicas.',
    dica:
      "Veterano: 'BDI mal calculado é licitação impugnada. Já vi contratos inteiros serem questionados no TCE por BDI fora do padrão SECID. Antes de assinar qualquer orçamento de obra pública, confira se o BDI está dentro dos parâmetros vigentes da Tabela da SECID. Isso não é detalhe — é critério de validade.'",
    tags: ['BDI', 'Tabela de Custos', 'orçamento de obras', 'preço máximo', 'licitação'],
  },
  {
    id: 10,
    categoria: 'Processos e Competências Técnicas',
    pergunta: 'O que são os Termos de Execução Descentralizada — TEDs e como funcionam?',
    resposta:
      'Os TEDs são instrumentos pelos quais a SECID firma com outros órgãos da administração estadual a descentralização da execução de obras e serviços de engenharia de edificações públicas. A Coordenação de Planejamento e Orçamento de Edificações Públicas — CPOE é responsável por coordenar, monitorar e controlar atividades relacionadas ao planejamento de contratos vinculados aos TEDs, acompanhando o andamento das demandas junto aos fiscais designados.',
    dica:
      "Veterano: 'TED é o instrumento que formaliza quem faz o quê numa obra estadual. Sem TED assinado, não há fiscal designado. Sem fiscal, não há medição. Sem medição, não há pagamento. O TED é o ponto de partida de qualquer obra — não começa nada sem ele estar registrado no sistema.'",
    tags: ['TED', 'CPOE', 'descentralização', 'fiscalização', 'obras públicas estaduais'],
  },
  {
    id: 11,
    categoria: 'Apoio aos Municípios e Convênios',
    pergunta: 'Como a SECID presta assistência técnica aos municípios paranaenses?',
    resposta:
      'A assistência técnica aos municípios é coordenada pelo Diretor de Apoio aos Municípios — DAM, por meio de duas unidades: a Coordenação de Convênios e Repasses — CCOR (que administra a celebração e manutenção de convênios, instrui processos e avalia prestações de contas) e a Coordenação de Suporte Técnico aos Municípios — CSTM (que formula a política estadual de apoio municipal, organiza materiais técnicos, monitora convênios e realiza eventos técnicos junto aos municípios).',
    dica:
      "Veterano: 'Município que quer apoio técnico procura a CSTM. Município que quer assinar convênio ou receber repasse procura a CCOR. São portas diferentes. Levar demanda de convênio para a CSTM, ou dúvida técnica para a CCOR, gera retrabalho para todos os lados.'",
    tags: ['DAM', 'CCOR', 'CSTM', 'assistência técnica', 'convênios municipais'],
  },
  {
    id: 12,
    categoria: 'Apoio aos Municípios e Convênios',
    pergunta: 'Quais são os Núcleos Regionais das Cidades e como estão distribuídos no Paraná?',
    resposta:
      'Os Núcleos Regionais das Cidades — NRCs compõem o nível de atuação regional da SECID. Existem 11 núcleos, cada um com um município-sede: Campo Mourão, Cascavel, Curitiba, Guarapuava, Londrina, Maringá, Pato Branco, Ponta Grossa, Santo Antônio da Platina, Umuarama e União da Vitória. Cada NRC é responsável por promover e executar as atividades da Secretaria em sua região, fiscalizar obras locais, levantar necessidades de manutenção de prédios públicos e coletar informações regionais de interesse da SECID.',
    dica:
      "Veterano: 'O NRC é a SECID presente na região. Prefeitura com dúvida sobre obra, convênio ou edificação pública deve primeiro contatar o NRC da sua área, não ligar direto para Curitiba. O NRC tem a proximidade e o conhecimento local. Só escale para a sede quando o NRC não conseguir resolver.'",
    tags: ['NRCs', '11 núcleos regionais', 'atuação regional', 'Campo Mourão', 'Cascavel', 'Curitiba', 'Londrina', 'Maringá'],
  },
  {
    id: 13,
    categoria: 'Apoio aos Municípios e Convênios',
    pergunta: 'O que é o Concidades Paraná e qual é o seu papel?',
    resposta:
      'O Conselho Estadual das Cidades do Paraná — Concidades Paraná é um órgão colegiado de natureza permanente, caráter consultivo e fiscalizatório, criado pela Lei nº 19.228/2017. É composto por 41 Conselheiros Titulares, com 60% de representantes da sociedade civil e 40% do poder público. Compete ao Concidades propor diretrizes de desenvolvimento urbano, acompanhar políticas públicas, propor normas de direito urbanístico, promover cooperação intergovernamental e convocar a Conferência Estadual das Cidades.',
    dica:
      "Veterano: 'O Concidades não é decorativo. Ele fiscaliza, propõe e emite resoluções que orientam a política urbana do Estado. Resolução do Concidades tem peso. Quando surgir questão sobre política habitacional ou desenvolvimento urbano, vale pesquisar o que o Conselho já deliberou sobre o tema.'",
    tags: ['Concidades Paraná', 'Lei 19.228/2017', 'conselho estadual', 'desenvolvimento urbano', '41 conselheiros'],
  },
  {
    id: 14,
    categoria: 'Licitações, Contratos e Inovação',
    pergunta: 'O que faz a Unidade Técnica de Licitações — UTL da SECID?',
    resposta:
      'A UTL, subordinada ao Diretor-Geral, é responsável por coordenar e realizar os processos licitatórios da SECID, incluindo obras, serviços de engenharia e projetos de edificações públicas. Suas atribuições incluem: orientar outros órgãos da administração direta e autárquica em suas licitações de engenharia, dar apoio técnico às comissões de licitação, avaliar previamente os editais, analisar o desempenho das contratadas e propor sanções contratuais quando cabível.',
    dica:
      "Veterano: 'UTL não é só formalidade. Edital com vício jurídico ou técnico volta impugnado e atrasa meses o projeto. Leve o edital para a UTL ANTES de publicar, não depois. Revisão prévia da UTL é proteção para o gestor — qualquer questionamento posterior cai no colo de quem publicou sem validar.'",
    tags: ['UTL', 'licitações', 'editais', 'obras públicas', 'sanções contratuais'],
  },
  {
    id: 15,
    categoria: 'Licitações, Contratos e Inovação',
    pergunta: 'O que faz a Unidade Técnica de Inovação e Sustentabilidade — UTS?',
    resposta:
      'A UTS coordena as iniciativas da SECID em tecnologia e sustentabilidade aplicadas ao campo de atuação da pasta. Suas principais atribuições são: buscar e difundir novas tecnologias construtivas; coordenar a implantação da metodologia BIM (Modelagem de Informação da Construção) nas obras de edificações públicas estaduais; desenvolver planos e pesquisas em desenvolvimento urbano e regional; e promover eventos de capacitação interna e externa em qualidade, sustentabilidade e inovação construtiva.',
    dica:
      "Veterano: 'BIM não é opcional — é a direção para onde todas as obras públicas estão indo. A UTS lidera essa transição na SECID. Engenheiros e arquitetos que não dominam BIM vão ter dificuldade crescente nos processos da Secretaria. Qualificação em BIM hoje é investimento profissional obrigatório.'",
    tags: ['UTS', 'BIM', 'Modelagem de Informação da Construção', 'inovação construtiva', 'sustentabilidade'],
  },
  {
    id: 16,
    categoria: 'Licitações, Contratos e Inovação',
    pergunta: 'O que é a Coordenação de Gestão de Contratos de Edificações — CGCE e o que ela faz?',
    resposta:
      'A CGCE, subordinada ao Diretor de Edificações Públicas, é responsável por coordenar, monitorar e controlar a gestão de contratos de obras e serviços de engenharia de edificações públicas. Suas atribuições incluem: incluir contratos nos sistemas de gestão, registrar a evolução de execução contratual, adotar providências para corrigir irregularidades identificadas e gerar informações gerenciais especializadas sobre os contratos.',
    dica:
      "Veterano: 'Contrato de obra sem registro atualizado no sistema é passivo para o gestor. TCE cruza execução física com execução financeira. Se o sistema mostrar divergência, o fiscal responde. Manter o registro da CGCE em dia não é burocracia — é proteção jurídica do servidor.'",
    tags: ['CGCE', 'gestão de contratos', 'fiscalização', 'edificações públicas', 'DEP'],
  },
  {
    id: 17,
    categoria: 'Gestão e Responsabilidades',
    pergunta: 'Quais são as responsabilidades fundamentais de todos os chefes de unidade na SECID?',
    resposta:
      'O art. 27 do Regulamento estabelece 7 responsabilidades fundamentais para todos os ocupantes de chefia: propiciar formação e conhecimento dos objetivos da unidade; promover treinamento e aperfeiçoamento dos subordinados; treinar permanentemente o substituto e praticar rodízio entre subordinados; incentivar criatividade e participação crítica; conhecer custos operacionais e combater desperdício; incutir a filosofia do bem servir ao público; e desenvolver o espírito de participação construtiva e responsável.',
    dica:
      "Veterano: 'Art. 27 é o padrão de conduta esperado de qualquer chefe na SECID. Em avaliação de desempenho ou processo disciplinar, esse artigo é referência. Treinar o substituto é obrigação legal — não é generosidade. Quem nunca treinou ninguém está descumprindo o regulamento.'",
    tags: ['art. 27', 'responsabilidades de chefia', 'treinamento', 'gestão de pessoas', 'regulamento'],
  },
  {
    id: 18,
    categoria: 'Gestão e Responsabilidades',
    pergunta: 'Como funciona a substituição do Secretário de Estado das Cidades em caso de ausência?',
    resposta:
      'O Secretário de Estado das Cidades é substituído em casos de vacância, ausência ou impedimento pelo Diretor-Geral — DG, conforme previsto no art. 12 do Regulamento. O DG, por sua vez, será substituído por um dos Diretores a ser designado por resolução do próprio Secretário de Estado das Cidades. A escala de substituições deve ser elaborada e aprovada pelo Secretário para todos os níveis de chefia.',
    dica:
      "Veterano: 'A escala de substituições tem que existir e estar publicada em resolução. Não é informal. Decisão assinada por quem não está na escala pode ser questionada administrativamente. Toda unidade deve ter seu substituto designado formalmente — isso vale desde o Secretário até o Chefe de Setor.'",
    tags: ['substituição', 'Secretário', 'Diretor-Geral', 'resolução', 'escala de substituições'],
  },
  {
    id: 19,
    categoria: 'Gestão e Responsabilidades',
    pergunta: 'Como a SECID pode firmar contratos de gestão para execução de suas atividades?',
    resposta:
      'Nos termos do art. 28 do Regulamento, para a execução de suas atividades-fim, complementares e correlatas, a SECID pode firmar contratos de gestão que fixem atribuições, responsabilidades e obrigações. Esses contratos devem ter como anexo obrigatório o Plano Anual de Trabalho, contendo metas técnicas, indicadores de desempenho e demais informações que possibilitem a mensuração e avaliação do cumprimento das obrigações assumidas.',
    dica:
      "Veterano: 'Contrato de gestão sem plano de trabalho anexo não tem validade. O plano com metas e indicadores é parte inseparável do instrumento — não é documento opcional. Sem ele, não há como medir resultado nem responsabilizar quem descumpriu o contrato.'",
    tags: ['contrato de gestão', 'Plano Anual de Trabalho', 'metas', 'indicadores', 'art. 28'],
  },
  {
    id: 20,
    categoria: 'Gestão e Responsabilidades',
    pergunta: 'O que garante a integração entre as unidades da SECID?',
    resposta:
      'O art. 32 do Regulamento determina que, para garantir o bom desempenho das atribuições legais da SECID, todas as suas unidades devem atuar de forma integrada e articulada para consolidar a permanente sinergia interna. Os casos omissos e dúvidas na execução do Regulamento são resolvidos pelo Secretário de Estado das Cidades, que pode expedir os atos necessários para tanto (art. 33).',
    dica:
      "Veterano: 'Sinergia interna não é poesia de regulamento — é obrigação legal. Quando uma unidade retém informação ou não articula com as demais, está descumprindo o art. 32. Em qualquer conflito intersetorial dentro da SECID, esse artigo é o fundamento para exigir cooperação. Use-o.'",
    tags: ['art. 32', 'integração', 'sinergia interna', 'art. 33', 'casos omissos'],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Identidade e Missão': 'bg-blue-100 text-blue-800 border-blue-200',
  'Estrutura Organizacional': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'Processos e Competências Técnicas': 'bg-violet-100 text-violet-800 border-violet-200',
  'Apoio aos Municípios e Convênios': 'bg-amber-100 text-amber-800 border-amber-200',
  'Licitações, Contratos e Inovação': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Gestão e Responsabilidades': 'bg-rose-100 text-rose-800 border-rose-200',
};

export default function FAQProcedimentos() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('Todas');
  const [busca, setBusca] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);
  const [openedSet, setOpenedSet] = useState<Set<number>>(new Set());
  const [expandedAll, setExpandedAll] = useState(false);

  const categorias = useMemo(() => ['Todas', ...new Set(FAQ_DATA.map((item) => item.categoria))], []);

  const filteredFaqs = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return FAQ_DATA.filter((item) => {
      const categoriaOk = categoriaAtiva === 'Todas' || item.categoria === categoriaAtiva;
      const textoOk =
        !termo ||
        item.pergunta.toLowerCase().includes(termo) ||
        item.resposta.toLowerCase().includes(termo) ||
        item.dica.toLowerCase().includes(termo) ||
        item.tags.join(' ').toLowerCase().includes(termo);
      return categoriaOk && textoOk;
    });
  }, [busca, categoriaAtiva]);

  const toggleItem = (id: number) => {
    if (expandedAll) {
      setExpandedAll(false);
    }

    setOpenId((prev) => (prev === id ? null : id));
    setOpenedSet((prev) => new Set(prev).add(id));
  };

  const handleExpandAll = () => {
    setExpandedAll(true);
    setOpenId(null);
    setOpenedSet((prev) => {
      const next = new Set(prev);
      filteredFaqs.forEach((item) => next.add(item.id));
      return next;
    });
  };

  const handleCollapseAll = () => {
    setExpandedAll(false);
    setOpenId(null);
  };

  return (
    <section className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-4 shadow-sm md:p-6">
      <header className="mb-4 flex flex-col gap-3 border-b border-gray-100 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1B4F8E] md:text-2xl">Perguntas Frequentes — SECID</h2>
          <p className="text-sm text-gray-500">Secretaria de Estado das Cidades do Paraná — Regulamento aprovado pelo Decreto nº 4.497/2023</p>
        </div>

        <div className="relative w-full md:w-80">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por termo, tag ou categoria..."
            className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-[#1B4F8E] focus:bg-white"
          />
        </div>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {categorias.map((categoria) => {
          const isActive = categoria === categoriaAtiva;
          return (
            <button
              key={categoria}
              type="button"
              onClick={() => setCategoriaAtiva(categoria)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition md:text-sm ${
                isActive
                  ? 'border-[#1B4F8E] bg-[#1B4F8E] text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#1B4F8E]/50'
              }`}
            >
              {categoria}
            </button>
          );
        })}

        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={handleExpandAll}
            className="rounded-lg bg-[#1B4F8E] px-3 py-1.5 text-xs font-medium text-white transition hover:brightness-110 md:text-sm"
          >
            Expandir todas
          </button>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 md:text-sm"
          >
            Recolher todas
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((item) => {
          const isOpen = expandedAll || openId === item.id;
          return (
            <article key={item.id} className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50/60">
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${item.id}`}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleItem(item.id)}
                className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3"
              >
                <div className="space-y-2">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${CATEGORY_COLORS[item.categoria]}`}>
                    {item.categoria}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-800 md:text-base">{item.pergunta}</h3>
                </div>
                <span className="text-lg text-[#1B4F8E]">{isOpen ? '−' : '+'}</span>
              </div>

              <div
                id={`faq-content-${item.id}`}
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-3 border-t border-gray-200 bg-white px-4 py-4 text-sm text-gray-700">
                    <p>{item.resposta}</p>
                    <blockquote className="rounded-lg border-l-4 border-[#1B4F8E] bg-blue-50 px-3 py-2 italic text-gray-700">
                      <span className="mr-1 text-[#1B4F8E]">❝</span>
                      {item.dica}
                    </blockquote>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={`${item.id}-${tag}`} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
            Nenhuma pergunta encontrada com os filtros atuais.
          </div>
        )}
      </div>
    </section>
  );
}
