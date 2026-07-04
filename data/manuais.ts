import type { Manual } from '@/types';

export const MANUAIS: Manual[] = [
  {
    id: 'manual-fiscal-obras',
    titulo: 'Manual do Fiscal de Obras',
    versao: '2.1',
    area: 'Engenharia e Obras',
    paginas: 24,
    descricao: 'Orientações completas para fiscalização de obras conveniadas nos municípios.',
    perfisAlvo: ['FISCAL', 'TECNICO', 'COORDENADOR'],
    secoes: [
      {
        id: 's1',
        titulo: '1. Introdução e competências do fiscal',
        conteudo: 'O fiscal de obras é o servidor designado pela SECID responsável por acompanhar a execução das obras objeto de convênios firmados entre o Estado e os municípios. Suas atribuições incluem: realizar vistorias periódicas, emitir relatórios técnicos, verificar a conformidade com projetos aprovados e medições executivas.',
        blocos: [
          { tipo: 'destaque', conteudo: 'A designação formal do fiscal deve ser feita por portaria antes do início das obras, sob pena de irregularidade.' },
          { tipo: 'dica', conteudo: 'Mantenha sempre registro fotográfico datado e georreferenciado de todas as visitas.' },
        ],
      },
      {
        id: 's2',
        titulo: '2. Procedimentos de vistoria',
        conteudo: 'A vistoria deve seguir o checklist padronizado disponível no sistema. Todos os pontos devem ser verificados e registrados com evidências fotográficas. Em caso de divergências entre o executado e o projeto aprovado, o fiscal deve lavrar termo de constatação imediatamente.',
        blocos: [
          { tipo: 'alerta', conteudo: 'Não autorize medições sem vistoria presencial. A responsabilidade pela aprovação indevida recai sobre o fiscal designado.' },
        ],
      },
      {
        id: 's3',
        titulo: '3. Medição e aprovação de parcelas',
        conteudo: 'A medição deve refletir o percentual físico real de execução verificado na vistoria. Utilize o formulário de medição disponível no sistema e anexe os documentos comprobatórios. O fiscal não pode aprovar parcelas superiores ao executado.',
      },
      {
        id: 's4',
        titulo: '4. Recebimento definitivo',
        conteudo: 'O recebimento definitivo formaliza a conclusão e aceitação da obra pelo Estado. Deve ser realizado após verificação completa de todos os itens contratados, saneamento de eventuais pendências e confirmação da qualidade executiva.',
        blocos: [
          { tipo: 'dica', conteudo: 'Utilize o checklist de recebimento definitivo para garantir que todos os itens foram verificados antes da assinatura do termo.' },
        ],
      },
    ],
  },
  {
    id: 'manual-gestao-convenios',
    titulo: 'Manual de Gestão de Convênios',
    versao: '3.0',
    area: 'Convênios',
    paginas: 38,
    descricao: 'Guia completo para gestão do ciclo de vida dos convênios firmados pela SECID.',
    perfisAlvo: ['TECNICO', 'COORDENADOR', 'GESTOR'],
    secoes: [
      {
        id: 's1',
        titulo: '1. Ciclo de vida do convênio',
        conteudo: 'O convênio passa pelas seguintes fases: proposta → análise → aprovação → assinatura → execução → prestação de contas → encerramento. Cada fase tem requisitos específicos documentados neste manual.',
      },
      {
        id: 's2',
        titulo: '2. Documentação obrigatória',
        conteudo: 'A proposta deve conter: Plano de Trabalho, Orçamento Detalhado, Projeto Básico de Engenharia, certidões de regularidade fiscal do município e cópias dos atos de designação dos gestores.',
        blocos: [
          { tipo: 'alerta', conteudo: 'Certidões com prazo de validade vencido tornam a proposta irregular e impedem a celebração do convênio.' },
        ],
      },
      {
        id: 's3',
        titulo: '3. Prestação de contas',
        conteudo: 'A prestação de contas final deve ser apresentada no prazo máximo de 60 dias após o término da vigência. Deve conter: Relatório Final de Execução, Relatório Financeiro, notas fiscais e comprovantes de pagamento, e Termo de Recebimento Definitivo da obra.',
        blocos: [
          { tipo: 'dica', conteudo: 'Organize a documentação em pastas digitais seguindo a nomenclatura padrão do sistema para facilitar a análise.' },
        ],
      },
    ],
  },
  {
    id: 'manual-analise-urbanistica',
    titulo: 'Manual de Análise Urbanística',
    versao: '1.2',
    area: 'Urbanismo',
    paginas: 19,
    descricao: 'Procedimentos técnicos para análise de planos diretores e legislação urbanística municipal.',
    perfisAlvo: ['TECNICO', 'COORDENADOR'],
    secoes: [
      { id: 's1', titulo: '1. Fundamentos legais', conteudo: 'A análise urbanística pela SECID baseia-se no Estatuto da Cidade (Lei nº 10.257/2001), na Lei Orgânica do Município e na legislação estadual de ordenamento territorial.' },
      { id: 's2', titulo: '2. Conteúdo mínimo do Plano Diretor', conteudo: 'O Plano Diretor deve conter: macrozoneamento, zoneamento de uso e ocupação do solo, sistema viário, áreas especiais de interesse social, áreas de proteção ambiental e instrumentos urbanísticos.' },
      { id: 's3', titulo: '3. Critérios de análise', conteudo: 'A análise verifica: consistência interna do plano, conformidade com legislação federal e estadual, adequação às características locais e participação popular no processo de elaboração.', blocos: [{ tipo: 'destaque', conteudo: 'Municípios com população acima de 20.000 habitantes são obrigados a ter Plano Diretor, conforme art. 182 da CF/88.' }] },
    ],
  },
  {
    id: 'manual-reurb',
    titulo: 'Manual de Regularização Fundiária REURB',
    versao: '1.0',
    area: 'Habitação',
    paginas: 15,
    descricao: 'Guia para análise de processos de regularização fundiária urbana (Lei nº 13.465/2017).',
    perfisAlvo: ['TECNICO', 'COORDENADOR'],
    secoes: [
      { id: 's1', titulo: '1. Base legal e modalidades', conteudo: 'A REURB é regulada pela Lei Federal nº 13.465/2017 e se divide em REURB-S (interesse social) e REURB-E (interesse específico). A SECID atua na análise e emissão de pareceres técnicos.' },
      { id: 's2', titulo: '2. Documentação necessária', conteudo: 'O processo deve conter: levantamento planialtimétrico, projeto urbanístico de regularização, Certidão de Regularização Fundiária (CRF), relação dos ocupantes e documentos de titulação.' },
    ],
  },
  {
    id: 'manual-sistema-workflow',
    titulo: 'Manual SGPO e E-Protocolo — Fluxo de Faturas',
    versao: '2024.R03',
    area: 'Sistemas',
    paginas: 28,
    descricao: 'Consolidação operacional do procedimento de faturas, com etapas SGPO (1 a 8), protocolos e modelos de documentos.',
    perfisAlvo: ['ADMINISTRADOR', 'GESTOR', 'COORDENADOR', 'TECNICO', 'FISCAL', 'CONSULTA'],
    secoes: [
      {
        id: 's1',
        titulo: '1. Base documental e escopo do procedimento',
        conteudo: 'Este manual consolida os documentos da pasta de procedimento de faturas: fluxo do processo SECID, procedimentos para cadastramento de faturas no SGPO (revisão 2024), resolução de designação de gestores e os modelos por tarefa (SGPO 1 a 8 e protocolos associados).',
        blocos: [
          { tipo: 'destaque', conteudo: 'A sequência de execução deve respeitar o fluxo oficial: SGPO (fiscal/contratada) + E-Protocolo (gestor, coordenações e financeiro) até confirmação do órgão demandante.' },
        ],
      },
      {
        id: 's2',
        titulo: '2. Etapas SGPO 1 a 3 (Fiscal e Contratada)',
        conteudo: 'SGPO 1 (Fiscal): organizar documentação técnica, incluindo checklist de fatura digital e evidências de execução (ex.: RVO/medição). SGPO 2 (Contratada): cadastrar a fatura no sistema conforme o roteiro de telas (1-5 a 5-5). SGPO 3 (Fiscal): validar o cadastro e, quando aplicável, instruir autorização de uso de serviço terceirizado por modelo padrão.',
        blocos: [
          { tipo: 'alerta', conteudo: 'Checklist e anexos comprobatórios devem estar completos antes do envio ao protocolo; pendências nesta fase propagam retrabalho nas etapas seguintes.' },
        ],
      },
      {
        id: 's3',
        titulo: '3. Etapas SGPO 4 a 6 (Gestor, Coordenação e Núcleo Financeiro)',
        conteudo: 'SGPO 4 (Protocolo 1 - Gestor): selecionar fatura, verificar documentos, analisar e enviar com informação padrão do gestor. SGPO 5 (Protocolo 3 - Coord. de Fiscalização): selecionar, analisar e encaminhar. SGPO 6 (Protocolo 5 - Núcleo Financeiro Setorial): selecionar, analisar e emitir despacho financeiro (NFS) no E-Protocolo.',
        blocos: [
          { tipo: 'dica', conteudo: 'Padronize os despachos e informações com os modelos da pasta para reduzir devoluções e acelerar conferência.' },
        ],
      },
      {
        id: 's4',
        titulo: '4. Etapas SGPO 7 e 8 (Diretor Geral e Órgão Demandante)',
        conteudo: 'SGPO 7 (Diretor Geral): selecionar e analisar a fatura para deliberação final da unidade. SGPO 8 (Protocolo 6 - Órgão Demandante): confirmar recebimento no fluxo, concluindo a tramitação prevista para o processo de pagamento.',
      },
      {
        id: 's5',
        titulo: '5. Modelos e anexos obrigatórios por etapa',
        conteudo: 'Devem ser utilizados, conforme a etapa, os modelos disponíveis na base documental: checklist de fatura digital, autorização de serviço terceirizado, informação padrão do gestor, exemplos de informação/lista de verificação da coordenação de gestão de contratos e despacho do núcleo financeiro setorial.',
      },
    ],
  },
];
