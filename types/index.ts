/* Tipos centrais do Portal SECID */

// Perfis de acesso
export type Perfil =
  | 'ADMINISTRADOR'
  | 'GESTOR'
  | 'COORDENADOR'
  | 'TECNICO'
  | 'FISCAL'
  | 'CONSULTA';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  setor: string;
  avatar?: string;
}

// Status de workflows
export type StatusWorkflow =
  | 'em_andamento'
  | 'aguardando_acao'
  | 'atencao'
  | 'atrasado'
  | 'devolvido'
  | 'concluido';

// Áreas dos macrofluxos
export type AreaMacrofluxo =
  | 'convenios'
  | 'obras'
  | 'urbanismo'
  | 'administrativo';

// Tipos de nó no fluxograma
export type TipoNo = 'inicio' | 'normal' | 'decisao' | 'fim';

// Nó do fluxograma
export interface NoFluxograma {
  id: string;
  tipo: TipoNo;
  titulo: string;
  descricao: string;
  responsavel: string;
  documentos?: string[];
  posicao?: number;
  caminhos?: { label: string; destino: string }[];
}

// Macrofluxo
export interface Macrofluxo {
  id: string;
  titulo: string;
  descricao: string;
  area: AreaMacrofluxo;
  etapas: number;
  prazoTipico: number;
  versao: string;
  nos: NoFluxograma[];
  palavrasChave: string[];
}

// Etapa de workflow
export type StatusEtapa = 'pendente' | 'ativa' | 'concluida' | 'devolvida';

export interface EtapaWorkflow {
  id: string;
  numero: number;
  titulo: string;
  descricao: string;
  responsavelId: string;
  responsavelNome: string;
  status: StatusEtapa;
  prazo?: string;
  concluidaEm?: string;
  comentario?: string;
}

// Registro de auditoria
export interface AuditoriaRegistro {
  id: string;
  usuarioId: string;
  usuarioNome: string;
  acao: string;
  detalhes?: string;
  timestamp: string;
}

// Workflow / Procedimento
export interface Workflow {
  id: string;
  numero: string;
  titulo: string;
  tipo: string;
  tipoId: string;
  iniciadoPorId: string;
  iniciadoPorNome: string;
  dataAbertura: string;
  prazo: string;
  status: StatusWorkflow;
  etapas: EtapaWorkflow[];
  auditoria: AuditoriaRegistro[];
  macrofluxoId?: string;
}

// Tipo de workflow suportado
export interface TipoWorkflow {
  id: string;
  titulo: string;
  area: string;
  etapas: number;
  prazoDias: number;
  prioritario?: boolean;
}

// Manual
export interface SecaoManual {
  id: string;
  titulo: string;
  conteudo: string;
  blocos?: BlocoEspecial[];
}

export interface BlocoEspecial {
  tipo: 'destaque' | 'alerta' | 'dica';
  conteudo: string;
}

export interface Manual {
  id: string;
  titulo: string;
  versao: string;
  area: string;
  paginas: number;
  descricao: string;
  secoes: SecaoManual[];
  perfisAlvo: Perfil[];
}

// Checklist
export interface ItemChecklist {
  id: string;
  descricao: string;
  obrigatorio: boolean;
  marcado?: boolean;
}

export interface Checklist {
  id: string;
  titulo: string;
  area: string;
  itens: ItemChecklist[];
}

// Capítulo de caderno
export interface CapituloCaderno {
  id: string;
  titulo: string;
  conteudo: string;
  blocos?: BlocoEspecialCaderno[];
}

export interface BlocoEspecialCaderno {
  tipo: 'caso_pratico' | 'erro_comum' | 'referencia_legal' | 'glossario';
  titulo: string;
  conteudo: string;
}

export interface Caderno {
  id: string;
  titulo: string;
  descricao: string;
  area: string;
  capitulos: CapituloCaderno[];
  corCapa: string;
}

// Status de obras
export type StatusObra =
  | 'em_andamento'
  | 'atrasada'
  | 'concluida'
  | 'paralisada'
  | 'nao_iniciada';

export interface Obra {
  id: string;
  codigoConvenio: string;
  titulo: string;
  municipio: string;
  tipo: string;
  valor: number;
  execucao: number;
  status: StatusObra;
  vencimento: string;
  fiscalId: string;
  fiscalNome: string;
  regiao: string;
}

// Status de convênio
export type StatusConvenio =
  | 'analise'
  | 'aprovado'
  | 'em_execucao'
  | 'prestacao_contas'
  | 'concluido'
  | 'inadimplente'
  | 'suspenso';

export interface Convenio {
  id: string;
  numero: string;
  objeto: string;
  municipio: string;
  valor: number;
  exercicio: number;
  status: StatusConvenio;
  vencimento: string;
  tipo: string;
  responsavelId: string;
  responsavelNome: string;
}
