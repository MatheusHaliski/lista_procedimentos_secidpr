import { WORKFLOWS_MOCK } from '@/data/workflows';
import type { Workflow, StatusWorkflow } from '@/types';

const KEY = 'secid_workflows';

export function getWorkflows(): Workflow[] {
  if (typeof window === 'undefined') return WORKFLOWS_MOCK;
  const raw = localStorage.getItem(KEY);
  if (!raw) return WORKFLOWS_MOCK;
  try { return JSON.parse(raw) as Workflow[]; } catch { return WORKFLOWS_MOCK; }
}

export function saveWorkflows(lista: Workflow[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(lista));
}

export function criarWorkflow(input: { titulo: string; tipo: string; tipoId: string; prazoDias: number; iniciadoPorNome: string; iniciadoPorId: string; }): Workflow {
  const lista = getWorkflows();
  const numeroSeq = lista.length + 1;
  const id = `wf-${String(Date.now())}`;
  const hoje = new Date();
  const prazo = new Date();
  prazo.setDate(hoje.getDate() + input.prazoDias);
  const novo: Workflow = {
    id,
    numero: `SECID-2026/${String(numeroSeq).padStart(3, '0')}`,
    titulo: input.titulo,
    tipo: input.tipo,
    tipoId: input.tipoId,
    iniciadoPorId: input.iniciadoPorId,
    iniciadoPorNome: input.iniciadoPorNome,
    dataAbertura: hoje.toISOString().split('T')[0],
    prazo: prazo.toISOString().split('T')[0],
    status: 'em_andamento' as StatusWorkflow,
    etapas: [{ id: `e1-${id}`, numero: 1, titulo: 'Triagem inicial', descricao: 'Etapa inicial do procedimento.', responsavelId: input.iniciadoPorId, responsavelNome: input.iniciadoPorNome, status: 'ativa', prazo: prazo.toISOString().split('T')[0] }],
    auditoria: [{ id: `a1-${id}`, usuarioId: input.iniciadoPorId, usuarioNome: input.iniciadoPorNome, acao: 'Procedimento aberto', timestamp: hoje.toISOString() }],
  };
  const atualizada = [novo, ...lista];
  saveWorkflows(atualizada);
  return novo;
}

export function atualizarWorkflow(workflow: Workflow) {
  const lista = getWorkflows();
  saveWorkflows(lista.map((w) => (w.id === workflow.id ? workflow : w)));
}
