import type { Caderno } from '@/types';

export const CADERNOS: Caderno[] = [
  {
    id: 'cad-boas-praticas-convenios',
    titulo: 'Boas práticas em gestão de convênios municipais',
    descricao: 'Coletânea de boas práticas e lições aprendidas na gestão de convênios com municípios.',
    area: 'Convênios',
    corCapa: '#003876',
    capitulos: [
      {
        id: 'c1', titulo: 'Planejamento e proposta',
        conteudo: 'O sucesso de um convênio começa com uma proposta bem elaborada. O município deve apresentar um Plano de Trabalho coerente, com objetivos claros, metas mensuráveis e cronograma realista. A SECID atua como parceira técnica nesse processo.',
        blocos: [
          { tipo: 'caso_pratico', titulo: 'Caso Prático — Município 11 2024', conteudo: 'O município de Município 11 reduziu em 40% o prazo de análise ao apresentar toda a documentação digitalizada e organizada conforme o checklist do sistema, evitando diligências posteriores.' },
          { tipo: 'erro_comum', titulo: 'Erro frequente', conteudo: 'Apresentar orçamento desatualizado (mais de 6 meses) faz com que a proposta seja devolvida para readequação, atrasando todo o processo.' },
        ],
      },
      {
        id: 'c2', titulo: 'Execução e acompanhamento',
        conteudo: 'Durante a execução, o gestor municipal deve manter comunicação constante com o fiscal da SECID, comunicar imprevistos com antecedência e manter registros atualizados no sistema.',
        blocos: [
          { tipo: 'dica', titulo: 'Dica prática', conteudo: 'Mantenha o diário de obra atualizado diariamente. Ele é o principal instrumento de comprovação da execução e facilita muito a análise das prestações de contas.' } as unknown as import('@/types').BlocoEspecialCaderno,
          { tipo: 'referencia_legal', titulo: 'Referência legal', conteudo: 'Decreto Federal nº 11.531/2023 — Regulamenta os convênios e contratos de repasse no âmbito da administração pública federal. Instrução Normativa STN nº 3/2024.' },
        ],
      },
    ],
  },
  {
    id: 'cad-erros-vistorias',
    titulo: 'Erros mais comuns em vistorias de obras',
    descricao: 'Análise dos principais equívocos cometidos por fiscais em vistorias, com orientações preventivas.',
    area: 'Engenharia e Obras',
    corCapa: '#CC0000',
    capitulos: [
      {
        id: 'c1', titulo: 'Erros de documentação',
        conteudo: 'A documentação incorreta ou incompleta nos relatórios de vistoria é uma das principais causas de problemas nas prestações de contas.',
        blocos: [
          { tipo: 'erro_comum', titulo: 'Fotos sem georreferenciamento', conteudo: 'Fotografias sem data, hora e localização georreferenciada são frequentemente impugnadas nas auditorias do TCE. Use sempre o GPS do smartphone ativado ao tirar fotos de obras.' },
          { tipo: 'erro_comum', titulo: 'Medição sem vistoria presencial', conteudo: 'Aprovação de medições baseada apenas em documentos do município, sem verificação in loco, configura irregularidade grave e gera responsabilidade do fiscal.' },
        ],
      },
      {
        id: 'c2', titulo: 'Erros técnicos de avaliação',
        conteudo: 'Avaliações técnicas inadequadas podem comprometer a qualidade das obras e gerar passivos futuros.',
        blocos: [
          { tipo: 'caso_pratico', titulo: 'Caso — Município 08 2023', conteudo: 'Fiscal aprovou estrutura de concreto sem exigir ensaio de resistência. Após conclusão da obra, laudo apontou resistência abaixo do especificado, gerando necessidade de reforço estrutural e impugnação parcial da prestação de contas.' },
        ],
      },
    ],
  },
  {
    id: 'cad-introducao-urbanismo',
    titulo: 'Guia de iniciação ao urbanismo para técnicos da SECID',
    descricao: 'Introdução ao urbanismo brasileiro e às ferramentas de planejamento urbano utilizadas pela SECID.',
    area: 'Urbanismo',
    corCapa: '#007A3D',
    capitulos: [
      {
        id: 'c1', titulo: 'Conceitos fundamentais de urbanismo',
        conteudo: 'Urbanismo é a disciplina que estuda e ordena o desenvolvimento das cidades. No Brasil, o marco legal é o Estatuto da Cidade (Lei nº 10.257/2001), que estabelece as diretrizes gerais da política urbana.',
        blocos: [
          { tipo: 'glossario', titulo: 'Glossário básico', conteudo: 'Gabarito: altura máxima permitida para edificações. Taxa de Ocupação (TO): percentual máximo do lote que pode ser ocupado pela construção. Coeficiente de Aproveitamento (CA): índice que multiplicado pela área do lote indica o total de área construída permitida.' },
        ],
      },
      {
        id: 'c2', titulo: 'Plano Diretor e instrumentos urbanísticos',
        conteudo: 'O Plano Diretor é o instrumento básico de planejamento urbano do município. Principais instrumentos: parcelamento/edificação/utilização compulsórios, IPTU progressivo, desapropriação para fins urbanísticos, ZEIS, outorga onerosa do direito de construir.',
        blocos: [
          { tipo: 'referencia_legal', titulo: 'Legislação aplicável', conteudo: 'Lei Federal nº 10.257/2001 (Estatuto da Cidade), Lei Federal nº 6.766/1979 (parcelamento do solo urbano), Decreto Estadual nº 2.581/2004 (parcelamento do solo).' },
        ],
      },
    ],
  },
  {
    id: 'cad-reurb-casos-praticos',
    titulo: 'Regularização fundiária — casos práticos',
    descricao: 'Compilação de casos reais de regularização fundiária realizados em municípios com aplicação da Lei nº 13.465/2017.',
    area: 'Habitação',
    corCapa: '#F5A623',
    capitulos: [
      {
        id: 'c1', titulo: 'REURB-S em assentamentos precários',
        conteudo: 'A REURB de Interesse Social (REURB-S) é direcionada a núcleos urbanos informais ocupados predominantemente por população de baixa renda.',
        blocos: [
          { tipo: 'caso_pratico', titulo: 'REURB-S em Município 05 — Bairro Central', conteudo: 'Regularização de 450 famílias em área de 18 hectares. Processo concluído em 14 meses com emissão de CRF e registro em cartório. Destaque para a participação comunitária no processo de levantamento cadastral.' },
        ],
      },
    ],
  },
  {
    id: 'cad-onboarding-secid',
    titulo: 'Manual de orientação ao servidor recém-chegado',
    descricao: 'Guia de boas-vindas e orientação para servidores que ingressam na SECID.',
    area: 'Administrativo',
    corCapa: '#0077C8',
    capitulos: [
      {
        id: 'c1', titulo: 'Bem-vindo à SECID',
        conteudo: 'A Secretaria de Estado das Cidades (SECID) tem como missão promover o desenvolvimento urbano sustentável dos municípios, por meio de políticas de habitação, saneamento, urbanismo e convênios para obras de infraestrutura.',
      },
      {
        id: 'c2', titulo: 'Estrutura organizacional',
        conteudo: 'A SECID é organizada em: Gabinete do Secretário, Superintendência de Obras, Superintendência de Convênios, Superintendência de Urbanismo e Habitação, e Superintendência Administrativa. O portal SAP SECID é a ferramenta central de gestão por processos.',
        blocos: [
          { tipo: 'dica', titulo: 'Dica para o novo servidor', conteudo: 'Explore todos os módulos do Portal SAP SECID. Cada módulo traz manuais, checklists e fluxogramas que guiarão seu trabalho no dia a dia.' } as unknown as import('@/types').BlocoEspecialCaderno,
        ],
      },
      {
        id: 'c3', titulo: 'Sistemas e ferramentas',
        conteudo: 'Principais sistemas utilizados: Portal SAP SECID (gestão por processos), SOLAR (controle financeiro estadual), BNAFAR (licitações e contratos), SICONV/Transferegov (convênios federais), GeoPortal (geoprocessamento).',
      },
    ],
  },
];
