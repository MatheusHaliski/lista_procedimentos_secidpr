import type { Workflow, EtapaWorkflow, StatusWorkflow, AuditoriaRegistro } from '@/types';

export function calcularProgresso(workflow: Workflow): number {
  const total = workflow.etapas.length;
  if (total === 0) return 0;
  const concluidas = workflow.etapas.filter(e => e.status === 'concluida').length;
  return Math.round((concluidas / total) * 100);
}

export function etapaAtiva(workflow: Workflow): EtapaWorkflow | undefined {
  return workflow.etapas.find(e => e.status === 'ativa');
}

export function calcularStatus(workflow: Workflow): StatusWorkflow {
  if (workflow.etapas.every(e => e.status === 'concluida')) return 'concluido';
  if (workflow.etapas.some(e => e.status === 'devolvida')) return 'devolvido';

  const ativa = etapaAtiva(workflow);
  if (!ativa) return 'em_andamento';

  if (ativa.prazo) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const prazo = new Date(ativa.prazo + 'T00:00:00');
    const diasRestantes = Math.ceil((prazo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    if (diasRestantes < 0) return 'atrasado';
    if (diasRestantes <= 2) return 'atencao';
  }

  return 'aguardando_acao';
}

export function avancarEtapa(
  workflow: Workflow,
  etapaId: string,
  usuarioId: string,
  usuarioNome: string,
  comentario: string
): Workflow {
  const etapas = workflow.etapas.map(e => {
    if (e.id === etapaId) {
      return { ...e, status: 'concluida' as const, concluidaEm: new Date().toISOString().split('T')[0], comentario };
    }
    return e;
  });

  const indiceAtual = etapas.findIndex(e => e.id === etapaId);
  const proxima = etapas[indiceAtual + 1];
  if (proxima) {
    etapas[indiceAtual + 1] = { ...proxima, status: 'ativa' as const };
  }

  const registro: AuditoriaRegistro = {
    id: `a-${Date.now()}`,
    usuarioId,
    usuarioNome,
    acao: `Etapa ${indiceAtual + 1} concluída`,
    detalhes: comentario,
    timestamp: new Date().toISOString(),
  };

  const novoWorkflow: Workflow = {
    ...workflow,
    etapas,
    auditoria: [registro, ...workflow.auditoria],
  };

  novoWorkflow.status = calcularStatus(novoWorkflow);
  return novoWorkflow;
}

export function devolverEtapa(
  workflow: Workflow,
  etapaId: string,
  usuarioId: string,
  usuarioNome: string,
  motivo: string
): Workflow {
  const etapas = workflow.etapas.map(e => {
    if (e.id === etapaId) {
      return { ...e, status: 'devolvida' as const, comentario: motivo };
    }
    return e;
  });

  const indiceAtual = etapas.findIndex(e => e.id === etapaId);

  const registro: AuditoriaRegistro = {
    id: `a-${Date.now()}`,
    usuarioId,
    usuarioNome,
    acao: 'Etapa devolvida',
    detalhes: motivo,
    timestamp: new Date().toISOString(),
  };

  return {
    ...workflow,
    etapas,
    status: 'devolvido',
    auditoria: [registro, ...workflow.auditoria],
  };
}
