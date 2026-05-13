'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { StatusWorkflow, Workflow } from '@/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { calcularProgresso } from '@/utils/workflow';
import { formatarData, diasRestantes } from '@/utils/formatters';
import { getWorkflows } from '@/utils/workflowsStore';
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

type FiltroPainel = 'todos' | StatusWorkflow;

const FILTROS: { value: FiltroPainel; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'aguardando_acao', label: 'Aguard. ação' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'atencao', label: 'Atenção' },
  { value: 'atrasado', label: 'Atrasados' },
  { value: 'devolvido', label: 'Devolvidos' },
  { value: 'concluido', label: 'Concluídos' },
];

function etapaAtivaResponsavel(workflow: Workflow): string {
  const ativa = workflow.etapas.find((e) => e.status === 'ativa');
  return ativa?.responsavelNome ?? '—';
}

export default function WorkflowsPage() {
  const router = useRouter();
  const [filtro, setFiltro] = useState<FiltroPainel>('todos');
  const [workflows] = useState<Workflow[]>(() => getWorkflows());

  const totalEmTramitacao = workflows.filter((w) => w.status !== 'concluido').length;
  const aguardandoAcao = workflows.filter((w) => w.status === 'aguardando_acao').length;
  const atrasadosDevolvidos = workflows.filter(
    (w) => w.status === 'atrasado' || w.status === 'devolvido'
  ).length;
  const concluidosMes = workflows.filter((w) => w.status === 'concluido').length;

  const listaFiltrada =
    filtro === 'todos' ? workflows : workflows.filter((w) => w.status === filtro);

  return (
    <main id="conteudo-principal">
      <Breadcrumb items={[{ label: 'Procedimentos' }]} />

      <section className={styles.pagina}>
        <div className={styles.cabecalhoRow}>
          <h1 className={styles.titulo}>Procedimentos</h1>
          <a href="/workflows/novo" className={styles.btnNovo} aria-label="Abrir novo procedimento">
            Novo procedimento
          </a>
        </div>

        <div className={styles.metricas} role="region" aria-label="Métricas de procedimentos">
          <div className={styles.metricaCard}>
            <span className={styles.metricaValor}>{totalEmTramitacao}</span>
            <span className={styles.metricaLabel}>Em tramitação</span>
          </div>
          <div className={`${styles.metricaCard} ${styles.metricaDestaque}`}>
            <span className={styles.metricaValor}>{aguardandoAcao}</span>
            <span className={styles.metricaLabel}>Aguardando minha ação</span>
          </div>
          <div className={`${styles.metricaCard} ${styles.metricaPerigo}`}>
            <span className={styles.metricaValor}>{atrasadosDevolvidos}</span>
            <span className={styles.metricaLabel}>Atrasados ou devolvidos</span>
          </div>
          <div className={`${styles.metricaCard} ${styles.metricaSucesso}`}>
            <span className={styles.metricaValor}>{concluidosMes}</span>
            <span className={styles.metricaLabel}>Concluídos no mês</span>
          </div>
        </div>

        <div className={styles.filtrosRow} role="group" aria-label="Filtrar procedimentos">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`${styles.filtroTab} ${filtro === f.value ? styles.filtroTabAtivo : ''}`}
              onClick={() => setFiltro(f.value)}
              aria-pressed={filtro === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.tabelaWrapper}>
          <table className={styles.tabela} aria-label="Lista de procedimentos">
            <thead>
              <tr>
                <th scope="col" className={styles.th}>Nº</th>
                <th scope="col" className={styles.th}>Procedimento</th>
                <th scope="col" className={styles.th}>Tipo</th>
                <th scope="col" className={styles.th}>Progresso</th>
                <th scope="col" className={styles.th}>Responsável atual</th>
                <th scope="col" className={styles.th}>Status</th>
                <th scope="col" className={styles.th}>Prazo</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.tdVazio}>
                    Nenhum procedimento encontrado.
                  </td>
                </tr>
              ) : (
                listaFiltrada.map((w) => {
                  const progresso = calcularProgresso(w);
                  const atrasado = diasRestantes(w.prazo) < 0;
                  return (
                    <tr
                      key={w.id}
                      className={styles.tr}
                      onClick={() => router.push(`/workflows/${w.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') router.push(`/workflows/${w.id}`);
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Ver procedimento ${w.numero}: ${w.titulo}`}
                    >
                      <td className={styles.td}>
                        <span className={styles.numero}>{w.numero}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.tituloProc}>{w.titulo}</span>
                        <span className={styles.iniciador}>{w.iniciadoPorNome}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.tipo}>{w.tipo}</span>
                      </td>
                      <td className={styles.td}>
                        <ProgressBar
                          valor={progresso}
                          mostrarTexto={false}
                          aria-label={`Progresso: ${progresso}%`}
                        />
                      </td>
                      <td className={styles.td}>{etapaAtivaResponsavel(w)}</td>
                      <td className={styles.td}>
                        <Badge
                          label={LABELS_STATUS[w.status]}
                          variante={VARIANTE_STATUS[w.status] as any}
                        />
                      </td>
                      <td className={styles.td}>
                        <span className={atrasado ? styles.prazoAtrasado : ''}>
                          {formatarData(w.prazo)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
