import type { Manual } from '@/types';

export const MANUAIS: Manual[] = [
  {
    id: 'manual-fiscal-obras',
    titulo: 'Manual do Fiscal de Obras',
    versao: '2.1',
    area: 'Engenharia e Obras',
    paginas: 24,
    descricao: 'Orientações completas para fiscalização de obras conveniadas nos municípios paranaenses.',
    perfisAlvo: ['FISCAL', 'TECNICO', 'COORDENADOR'],
    secoes: [
      {
        id: 's1',
        titulo: '1. Introdução e competências do fiscal',
        conteudo: 'O fiscal de obras é o servidor designado pela SECID-PR responsável por acompanhar a execução das obras objeto de convênios firmados entre o Estado e os municípios. Suas atribuições incluem: realizar vistorias periódicas, emitir relatórios técnicos, verificar a conformidade com projetos aprovados e medições executivas.',
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
    descricao: 'Guia completo para gestão do ciclo de vida dos convênios firmados pela SECID-PR.',
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
    titulo: 'Manual de Uso do Sistema de Workflow',
    versao: '1.0',
    area: 'Sistemas',
    paginas: 10,
    descricao: 'Orientações para uso do Portal SAP SECID — sistema de gestão por processos.',
    perfisAlvo: ['ADMINISTRADOR', 'GESTOR', 'COORDENADOR', 'TECNICO', 'FISCAL', 'CONSULTA'],
    secoes: [
      { id: 's1', titulo: '1. Acesso ao sistema', conteudo: 'O acesso é feito com login e senha da rede CELEPAR. O perfil de acesso é definido pelo administrador do sistema conforme a função do servidor.' },
      { id: 's2', titulo: '2. Abertura de procedimentos', conteudo: 'Para abrir um novo procedimento, acesse o módulo Procedimentos > Novo. Selecione o tipo de procedimento, preencha os dados obrigatórios e clique em Abrir.' },
      { id: 's3', titulo: '3. Tramitação e conclusão de etapas', conteudo: 'O responsável pela etapa ativa recebe notificação por e-mail. Para concluir a etapa, acesse o procedimento, preencha o comentário e clique em Concluir etapa. Para devolver, utilize o botão Devolver com ressalvas.', blocos: [{ tipo: 'dica', conteudo: 'Preencha sempre o campo de comentário ao concluir ou devolver etapas — isso facilita o entendimento do histórico do processo.' }] },
    ],
  },
];
