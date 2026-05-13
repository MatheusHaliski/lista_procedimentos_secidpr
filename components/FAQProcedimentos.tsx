'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type FAQItem = {
  id: number;
  categoria: string;
  pergunta: string;
  resposta: string;
  dica: string;
  tags: string[];
};

const faqData: FAQItem[] = [
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

const categories = [
  'Todas',
  'Identidade e Missão',
  'Estrutura Organizacional',
  'Processos e Competências Técnicas',
  'Apoio aos Municípios e Convênios',
  'Licitações, Contratos e Inovação',
  'Gestão e Responsabilidades',
] as const;

export default function FAQProcedimentos() {
  // Estados principais do componente
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todas');

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Dados filtrados por categoria e termo de busca
  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return faqData.filter((item) => {
      const matchCategory = activeCategory === 'Todas' || item.categoria === activeCategory;
      const matchSearch =
        !term ||
        item.pergunta.toLowerCase().includes(term) ||
        item.resposta.toLowerCase().includes(term) ||
        item.tags.some((tag) => tag.toLowerCase().includes(term));

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  const selectedIndex = useMemo(
    () => filteredData.findIndex((item) => item.id === selectedId),
    [filteredData, selectedId],
  );

  const selectedItem = selectedIndex >= 0 ? filteredData[selectedIndex] : null;

  // Fecha modal com ESC + trava scroll quando aberto
  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedId(null);
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [selectedId]);

  // Focus trap no modal
  useEffect(() => {
    if (selectedId === null || !modalRef.current) return;

    const container = modalRef.current;
    const focusable = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', handleTab);
    return () => container.removeEventListener('keydown', handleTab);
  }, [selectedId]);

  // Navegação circular no modal
  const goToPrevious = useCallback(() => {
    if (filteredData.length <= 1 || selectedIndex < 0) return;
    const prevIndex = (selectedIndex - 1 + filteredData.length) % filteredData.length;
    setSelectedId(filteredData[prevIndex].id);
  }, [filteredData, selectedIndex]);

  const goToNext = useCallback(() => {
    if (filteredData.length <= 1 || selectedIndex < 0) return;
    const nextIndex = (selectedIndex + 1) % filteredData.length;
    setSelectedId(filteredData[nextIndex].id);
  }, [filteredData, selectedIndex]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      {/* Header da página */}
      <header className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">Perguntas Frequentes — SECID</h1>
        <p className="mt-1 text-sm text-gray-500">
          Secretaria de Estado das Cidades do Paraná — Regulamento aprovado pelo Decreto nº 4.497/2023
        </p>
      </header>

      {/* Busca */}
      <div className="relative mt-5">
        <svg className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por termo, categoria ou tag..." className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* Filtros de categoria */}
      <div className="mt-4 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2">
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`rounded-full px-4 py-2 text-sm transition ${active ? 'bg-blue-900 text-white' : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-2 text-xs text-gray-400">Exibindo {filteredData.length} de {faqData.length} perguntas</p>

      {/* Grid de cards */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {filteredData.map((item) => {
          const visibleTags = item.tags.slice(0, 3);
          const hiddenCount = item.tags.length - visibleTags.length;

          return (
            <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} className="group w-full cursor-pointer rounded-2xl border border-gray-100 bg-white p-5 text-left transition-all duration-200 hover:border-blue-200 hover:shadow-md">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-gray-300">#{item.id.toString().padStart(2, '0')}</span>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">{item.categoria}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-gray-800">{item.pergunta}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {visibleTags.map((tag) => (
                  <span key={`${item.id}-${tag}`} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{tag}</span>
                ))}
                {hiddenCount > 0 && <span className="text-xs text-gray-400">+{hiddenCount}</span>}
              </div>
              <div className="mt-3 flex justify-end text-gray-300 transition-colors group-hover:text-blue-500">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
              </div>
            </button>
          );
        })}
      </div>

      {filteredData.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <svg className="h-12 w-12 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <p className="mt-3 text-sm text-gray-500">Nenhuma pergunta encontrada para <strong>{searchTerm || activeCategory}</strong></p>
          <p className="mt-1 text-sm text-gray-400">Tente buscar por outro termo ou selecione outra categoria</p>
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-150" onClick={() => setSelectedId(null)}>
          <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="faq-modal-title" className="relative flex max-h-[85vh] w-full max-w-2xl scale-100 flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 fade-in duration-200 ease-out" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setSelectedId(null)} className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600" aria-label="Fechar modal">✕</button>

            <div className="border-b border-gray-100 p-6 pb-4">
              <span className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{selectedItem.categoria}</span>
              <h2 id="faq-modal-title" className="text-lg font-bold leading-snug text-gray-900">{selectedIndex + 1}. {selectedItem.pergunta}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Resposta</p>
              <p className="text-sm leading-relaxed text-gray-700">{selectedItem.resposta}</p>

              <div className="mb-4 mt-5 border-t border-gray-100" />
              <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                <div className="mb-1 flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-300" viewBox="0 0 24 24" fill="currentColor"><path d="M7.17 6A5.001 5.001 0 0 0 2 11v7h7v-7H5a3 3 0 0 1 3-3h1V6H7.17zm10 0A5.001 5.001 0 0 0 12 11v7h7v-7h-4a3 3 0 0 1 3-3h1V6h-1.83z"/></svg>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Nota do veterano</p>
                </div>
                <p className="text-sm italic leading-relaxed text-blue-800">{selectedItem.dica}</p>
              </div>

              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (<span key={`${selectedItem.id}-${tag}`} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">{tag}</span>))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 p-4">
              <p className="text-xs text-gray-400">Pergunta {selectedIndex + 1} de {filteredData.length}</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={goToPrevious} disabled={filteredData.length <= 1} className="rounded-xl border border-gray-200 px-4 py-2 text-xs transition-all hover:border-blue-200 hover:bg-white hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30">← Anterior</button>
                <button type="button" onClick={goToNext} disabled={filteredData.length <= 1} className="rounded-xl border border-gray-200 px-4 py-2 text-xs transition-all hover:border-blue-200 hover:bg-white hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30">Próxima →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
