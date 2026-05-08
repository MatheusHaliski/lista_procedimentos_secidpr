'use client';

import { use, useState } from 'react';
import { WORKFLOWS_MOCK } from '@/data/workflows';
import type { Workflow, EtapaWorkflow, StatusWorkflow } from '@/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';
import { avancarEtapa, devolverEtapa } from '@/utils/workflow';
import { formatarData, formatarDataHora } from '@/utils/formatters';
import styles from './page.module.css';

const LABELS_STATUS: Record<StatusWorkflow, string> = {
  em_andamento: 'Em andamento',
  aguardando_acao: 'Aguard. ação',
  atencao: 'Atenção',
  atrasado: 'Atrasado',
  devolvido: 'Devolvido',
  concluido: 'Concluído',
};

const VARIANTE_STATUS: Record<StatusWorkflow, string> = {
  em_andamento: 'em_andamento',
  aguardando_acao: 'atencao',
  atencao: 'atencao',
  atrasado: 'atrasado',
  devolvido: 'devolvido',
  concluido: 'concluido',
};

interface Props {
  params: Promise<{ id: string }>;
}

export default function WorkflowDetalhePage({ params }: Props) {
  const { id } = use(params);
  const { usuario } = useAuth();

  const wfInicial = WORKFLOWS_MOCK.find((w) => w.id === id);
  const [workflow, setWorkflow] = useState<Workflow | undefined>(wfInicial);
  const [comentario, setComentario] = useState('');

  if (!workflow) {
    return (
      <main id="conteudo-principal">
        <Breadcrumb items={[{ label: 'Procedimentos', href: '/workflows' }, { label: 'Não encontrado' }]} />
        <div className={styles.erro} role="alert">
          Procedimento não encontrado.
        </div>
      </main>
    );
  }

  const etapaAtiva = workflow.etapas.find((e) => e.status === 'ativa');
  const podeAgir = !!(
    usuario &&
    etapaAtiva &&
    etapaAtiva.responsavelId === usuario.id
  );

  function handleConcluir() {
    if (!workflow || !etapaAtiva || !usuario) return;
    const atualizado = avancarEtapa(workflow, etapaAtiva.id, usuario.id, usuario.nome, comentario);
    setWorkflow(atualizado);
    setComentario('');
  }

  function handleDevolver() {
    if (!workflow || !etapaAtiva || !usuario || !comentario.trim()) return;
    const atualizado = devolverEtapa(workflow, etapaAtiva.id, usuario.id, usuario.nome, comentario);
    setWorkflow(atualizado);
    setComentario('');
  }

  return (
    <main id="conteudo-principal">
      <Breadcrumb
        items={[
          { label: 'Procedimentos', href: '/workflows' },
          { label: workflow.numero },
        ]}
      />

      <section className={styles.pagina}>
        <div className={styles.header}>
          <div className={styles.headerTopo}>
            <Badge
              label={LABELS_STATUS[workflow.status]}
              variante={VARIANTE_STATUS[workflow.status] as any}
            />
            <span className={styles.tipo}>{workflow.tipo}</span>
          </div>
          <h1 className={styles.titulo}>{workflow.titulo}</h1>
          <div className={styles.headerMeta}>
            <span>
              <strong>Nº:</strong> {workflow.numero}
            </span>
            <span>
              <strong>Iniciado por:</strong> {workflow.iniciadoPorNome}
            </span>
            <span>
              <strong>Abertura:</strong> {formatarData(workflow.dataAbertura)}
            </span>
            <span>
              <strong>Prazo:</strong>{' '}
              <span className={new Date(workflow.prazo) < new Date() ? styles.prazoAtrasado : ''}>
                {formatarData(workflow.prazo)}
              </span>
            </span>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.colEsquerda}>
            <h2 className={styles.secaoTitulo}>Linha do tempo</h2>
            <ol className={styles.timeline} aria-label="Etapas do procedimento">
              {workflow.etapas.map((etapa) => (
                <li key={etapa.id} className={`${styles.etapa} ${styles[`etapa_${etapa.status}`]}`}>
                  <div className={styles.etapaIcone} aria-hidden="true">
                    {etapa.status === 'concluida' && <span className={styles.iconeCheck}>✓</span>}
                    {etapa.status === 'ativa' && <span className={styles.iconePulso} />}
                    {etapa.status === 'devolvida' && <span className={styles.iconeDevolvida}>!</span>}
                    {etapa.status === 'pendente' && (
                      <span className={styles.iconeNumero}>{etapa.numero}</span>
                    )}
                  </div>
                  <div className={styles.etapaConteudo}>
                    <div className={styles.etapaTituloRow}>
                      <span className={styles.etapaTitulo}>{etapa.titulo}</span>
                      <span className={styles.etapaResp}>{etapa.responsavelNome}</span>
                    </div>
                    <p className={styles.etapaDesc}>{etapa.descricao}</p>
                    {etapa.status === 'concluida' && etapa.concluidaEm && (
                      <span className={styles.etapaMeta}>
                        Concluída em {formatarData(etapa.concluidaEm)}
                        {etapa.comentario && ` — ${etapa.comentario}`}
                      </span>
                    )}
                    {etapa.status === 'ativa' && etapa.prazo && (
                      <span className={styles.etapaMeta}>
                        Prazo: {formatarData(etapa.prazo)}
                      </span>
                    )}
                    {etapa.status === 'devolvida' && etapa.comentario && (
                      <span className={`${styles.etapaMeta} ${styles.etapaMetaDevolvida}`}>
                        Motivo: {etapa.comentario}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            {podeAgir && etapaAtiva && (
              <div className={styles.formularioAcao} aria-label="Formulário de ação">
                <h3 className={styles.formularioTitulo}>
                  Ação — {etapaAtiva.titulo}
                </h3>
                <label htmlFor="comentario-despacho" className={styles.formularioLabel}>
                  Comentário / Despacho
                </label>
                <textarea
                  id="comentario-despacho"
                  className={styles.textarea}
                  rows={4}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Descreva o despacho ou observações sobre esta etapa…"
                  aria-describedby="comentario-hint"
                />
                <p id="comentario-hint" className={styles.inputHint}>
                  Obrigatório para devolução. Opcional para conclusão.
                </p>
                <div className={styles.formularioBotoes}>
                  <button
                    type="button"
                    className={styles.btnConcluir}
                    onClick={handleConcluir}
                    aria-label="Concluir esta etapa"
                  >
                    Concluir etapa
                  </button>
                  <button
                    type="button"
                    className={styles.btnDevolver}
                    onClick={handleDevolver}
                    disabled={!comentario.trim()}
                    aria-label="Devolver com ressalvas"
                    aria-disabled={!comentario.trim()}
                  >
                    Devolver com ressalvas
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className={styles.colDireita} aria-label="Histórico de auditoria">
            <h2 className={styles.secaoTitulo}>Histórico de auditoria</h2>
            <ol className={styles.auditoria} reversed>
              {[...workflow.auditoria].map((reg) => (
                <li key={reg.id} className={styles.auditoriaItem}>
                  <div className={styles.auditoriaHeader}>
                    <span className={styles.auditoriaUsuario}>{reg.usuarioNome}</span>
                    <span className={styles.auditoriaData}>{formatarDataHora(reg.timestamp)}</span>
                  </div>
                  <p className={styles.auditoriaAcao}>{reg.acao}</p>
                  {reg.detalhes && (
                    <p className={styles.auditoriaDetalhes}>{reg.detalhes}</p>
                  )}
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </main>
  );
}
