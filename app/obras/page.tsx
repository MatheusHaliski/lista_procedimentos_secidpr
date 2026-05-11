'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { OBRAS } from '@/data/obras';
import type { Obra, StatusObra } from '@/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import { formatarMoeda, formatarData } from '@/utils/formatters';
import styles from './page.module.css';

const LABELS_STATUS: Record<StatusObra, string> = {
  em_andamento: 'Em andamento',
  atrasada: 'Atrasada',
  concluida: 'Concluída',
  paralisada: 'Paralisada',
  nao_iniciada: 'Não iniciada',
};

const VARIANTE_STATUS: Record<StatusObra, string> = {
  em_andamento: 'em_andamento',
  atrasada: 'atrasado',
  concluida: 'concluido',
  paralisada: 'devolvido',
  nao_iniciada: 'pendente',
};

function varianteExecucao(pct: number): 'sucesso' | 'atencao' | 'perigo' {
  if (pct >= 70) return 'sucesso';
  if (pct >= 40) return 'atencao';
  return 'perigo';
}

function vencimentoAtrasado(data: string): boolean {
  return new Date(data + 'T00:00:00') < new Date(new Date().toDateString());
}

const REGIOES_UNICAS = Array.from(new Set(OBRAS.map((o) => o.regiao))).sort();

const FILTROS_STATUS: { value: StatusObra | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'atrasada', label: 'Atrasada' },
  { value: 'concluida', label: 'Concluída' },
  { value: 'paralisada', label: 'Paralisada' },
  { value: 'nao_iniciada', label: 'Não iniciada' },
];

interface ModalDetalheProps {
  obra: Obra;
  onFechar: () => void;
  onRegistrarVistoria: (obra: Obra) => void;
}

function ModalDetalhe({ obra, onFechar, onRegistrarVistoria }: ModalDetalheProps) {
  const [alertaVistoria, setAlertaVistoria] = useState(false);
  const atrasado = vencimentoAtrasado(obra.vencimento);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
      onClick={(e) => { if (e.target === e.currentTarget) onFechar(); }}
    >
      <div className={styles.modal}>
        <div className={styles.modalCabecalho}>
          <h2 id="modal-titulo" className={styles.modalTitulo}>{obra.titulo}</h2>
          <button
            type="button"
            className={styles.modalFechar}
            onClick={onFechar}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        <dl className={styles.modalGrid}>
          <div className={styles.modalCampo}>
            <dt>Código do convênio</dt>
            <dd>{obra.codigoConvenio}</dd>
          </div>
          <div className={styles.modalCampo}>
            <dt>Município</dt>
            <dd>{obra.municipio}</dd>
          </div>
          <div className={styles.modalCampo}>
            <dt>Tipo</dt>
            <dd>{obra.tipo}</dd>
          </div>
          <div className={styles.modalCampo}>
            <dt>Região</dt>
            <dd>{obra.regiao}</dd>
          </div>
          <div className={styles.modalCampo}>
            <dt>Valor</dt>
            <dd>{formatarMoeda(obra.valor)}</dd>
          </div>
          <div className={styles.modalCampo}>
            <dt>Execução</dt>
            <dd>{obra.execucao}%</dd>
          </div>
          <div className={styles.modalCampo}>
            <dt>Status</dt>
            <dd>
              <Badge
                label={LABELS_STATUS[obra.status]}
                variante={VARIANTE_STATUS[obra.status] as any}
              />
            </dd>
          </div>
          <div className={styles.modalCampo}>
            <dt>Vencimento</dt>
            <dd className={atrasado ? styles.vencimentoAtrasado : ''}>
              {formatarData(obra.vencimento)}
              {atrasado && ' (vencido)'}
            </dd>
          </div>
          <div className={`${styles.modalCampo} ${styles.modalCampoLargo}`}>
            <dt>Fiscal responsável</dt>
            <dd>{obra.fiscalNome}</dd>
          </div>
        </dl>

        {alertaVistoria && (
          <div className={styles.alertaInfo} role="alert">
            Vistoria registrada com sucesso. Acompanhe o histórico no módulo de procedimentos.
          </div>
        )}

        <div className={styles.modalRodape}>
          <Button
            variante="primario"
            onClick={() => {
              setAlertaVistoria(true);
              onRegistrarVistoria(obra);
            }}
            disabled={alertaVistoria}
          >
            Registrar vistoria
          </Button>
          <Button variante="fantasma" onClick={onFechar}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ObrasPage() {
  const router = useRouter();
  const [filtroStatus, setFiltroStatus] = useState<StatusObra | 'todos'>('todos');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroRegiao, setFiltroRegiao] = useState('');
  const [obraSelecionada, setObraSelecionada] = useState<Obra | null>(null);

  const total = OBRAS.length;
  const emAndamento = OBRAS.filter((o) => o.status === 'em_andamento').length;
  const comAtraso = OBRAS.filter((o) => o.status === 'atrasada').length;
  const concluidas = OBRAS.filter((o) => o.status === 'concluida').length;

  const obrasFiltradas = useMemo(() => {
    return OBRAS.filter((o) => {
      if (filtroStatus !== 'todos' && o.status !== filtroStatus) return false;
      if (filtroTipo && !o.tipo.toLowerCase().includes(filtroTipo.toLowerCase())) return false;
      if (filtroRegiao && o.regiao !== filtroRegiao) return false;
      return true;
    });
  }, [filtroStatus, filtroTipo, filtroRegiao]);

  return (
    <main id="conteudo-principal">
      <Breadcrumb items={[{ label: 'Painel de Obras' }]} />

      <section className={styles.pagina}>
        <h1 className={styles.titulo}>Painel de Obras</h1>

        <div className={styles.metricas} role="region" aria-label="Métricas de obras">
          <div className={styles.metricaCard}>
            <span className={styles.metricaValor}>{total}</span>
            <span className={styles.metricaLabel}>Total</span>
          </div>
          <div className={`${styles.metricaCard} ${styles.metricaDestaque}`}>
            <span className={styles.metricaValor}>{emAndamento}</span>
            <span className={styles.metricaLabel}>Em andamento</span>
          </div>
          <div className={`${styles.metricaCard} ${styles.metricaPerigo}`}>
            <span className={styles.metricaValor}>{comAtraso}</span>
            <span className={styles.metricaLabel}>Com atraso</span>
          </div>
          <div className={`${styles.metricaCard} ${styles.metricaSucesso}`}>
            <span className={styles.metricaValor}>{concluidas}</span>
            <span className={styles.metricaLabel}>Concluídas</span>
          </div>
        </div>

        <div className={styles.filtros} role="search" aria-label="Filtros de obras">
          <div className={styles.filtrosRow}>
            {FILTROS_STATUS.map((f) => (
              <button
                key={f.value}
                type="button"
                className={`${styles.filtroTab} ${filtroStatus === f.value ? styles.filtroTabAtivo : ''}`}
                onClick={() => setFiltroStatus(f.value as any)}
                aria-pressed={filtroStatus === f.value}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className={styles.filtrosCampos}>
            <label className={styles.filtroLabel} htmlFor="filtro-tipo">
              <span>Tipo de obra</span>
              <input
                id="filtro-tipo"
                type="text"
                className={styles.filtroInput}
                placeholder="Filtrar por tipo…"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              />
            </label>
            <label className={styles.filtroLabel} htmlFor="filtro-regiao">
              <span>Região</span>
              <select
                id="filtro-regiao"
                className={styles.filtroInput}
                value={filtroRegiao}
                onChange={(e) => setFiltroRegiao(e.target.value)}
              >
                <option value="">Todas as regiões</option>
                {REGIOES_UNICAS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className={styles.tabelaWrapper}>
          <table className={styles.tabela} aria-label="Lista de obras municipais">
            <thead>
              <tr>
                <th scope="col" className={styles.th}>Código conv.</th>
                <th scope="col" className={styles.th}>Obra / Município</th>
                <th scope="col" className={styles.th}>Tipo</th>
                <th scope="col" className={styles.th}>Valor</th>
                <th scope="col" className={styles.th}>Execução</th>
                <th scope="col" className={styles.th}>Status</th>
                <th scope="col" className={styles.th}>Vencimento</th>
                <th scope="col" className={styles.th}>Fiscal</th>
              </tr>
            </thead>
            <tbody>
              {obrasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={8} className={styles.tdVazio}>
                    Nenhuma obra encontrada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                obrasFiltradas.map((obra) => {
                  const atrasado = vencimentoAtrasado(obra.vencimento);
                  return (
                    <tr
                      key={obra.id}
                      className={styles.tr}
                      onClick={() => setObraSelecionada(obra)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setObraSelecionada(obra);
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Ver detalhes da obra: ${obra.titulo}`}
                    >
                      <td className={styles.td}>
                        <span className={styles.codigoConv}>{obra.codigoConvenio}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.obraTitulo}>{obra.titulo}</span>
                        <span className={styles.municipio}>{obra.municipio}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.tipo}>{obra.tipo}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.valor}>{formatarMoeda(obra.valor)}</span>
                      </td>
                      <td className={`${styles.td} ${styles.tdExecucao}`}>
                        <ProgressBar
                          valor={obra.execucao}
                          mostrarTexto={false}
                          variante={varianteExecucao(obra.execucao)}
                          label={`Execução: ${obra.execucao}%`}
                        />
                      </td>
                      <td className={styles.td}>
                        <Badge
                          label={LABELS_STATUS[obra.status]}
                          variante={VARIANTE_STATUS[obra.status] as any}
                        />
                      </td>
                      <td className={styles.td}>
                        <span className={atrasado ? styles.vencimentoAtrasado : ''}>
                          {formatarData(obra.vencimento)}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.fiscal}>{obra.fiscalNome}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {obraSelecionada && (
        <ModalDetalhe
          obra={obraSelecionada}
          onFechar={() => setObraSelecionada(null)}
          onRegistrarVistoria={(obra) => {
            setTimeout(() => {
              setObraSelecionada(null);
              router.push(`/workflows/novo?tipo=obras-vistoria-andamento&obraId=${obra.id}`);
            }, 700);
          }}
        />
      )}
    </main>
  );
}
