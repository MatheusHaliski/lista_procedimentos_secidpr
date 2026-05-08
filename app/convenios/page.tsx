'use client';

import { useState, useMemo } from 'react';
import { CONVENIOS } from '@/data/convenios';
import type { StatusConvenio } from '@/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import { formatarMoeda, formatarData } from '@/utils/formatters';
import styles from './page.module.css';

const LABELS_STATUS: Record<StatusConvenio, string> = {
  analise: 'Em análise',
  aprovado: 'Aprovado',
  em_execucao: 'Em execução',
  prestacao_contas: 'Prest. contas',
  concluido: 'Concluído',
  inadimplente: 'Inadimplente',
  suspenso: 'Suspenso',
};

const VARIANTE_STATUS: Record<StatusConvenio, string> = {
  analise: 'pendente',
  aprovado: 'no_prazo',
  em_execucao: 'em_andamento',
  prestacao_contas: 'atencao',
  concluido: 'concluido',
  inadimplente: 'atrasado',
  suspenso: 'devolvido',
};

const EXERCICIOS_UNICOS = Array.from(new Set(CONVENIOS.map((c) => c.exercicio))).sort((a, b) => b - a);

const STATUS_OPTIONS: { value: StatusConvenio | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'analise', label: 'Em análise' },
  { value: 'aprovado', label: 'Aprovado' },
  { value: 'em_execucao', label: 'Em execução' },
  { value: 'prestacao_contas', label: 'Prest. contas' },
  { value: 'concluido', label: 'Concluído' },
  { value: 'inadimplente', label: 'Inadimplente' },
  { value: 'suspenso', label: 'Suspenso' },
];

function diasParaVencer(data: string): number {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const d = new Date(data + 'T00:00:00');
  return Math.ceil((d.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
}

export default function ConveniosPage() {
  const [filtroStatus, setFiltroStatus] = useState<StatusConvenio | 'todos'>('todos');
  const [filtroMunicipio, setFiltroMunicipio] = useState('');
  const [filtroExercicio, setFiltroExercicio] = useState('');

  const ativos = useMemo(
    () => CONVENIOS.filter((c) => c.status !== 'concluido' && c.status !== 'suspenso').length,
    []
  );
  const aguardandoAnalise = useMemo(
    () => CONVENIOS.filter((c) => c.status === 'analise').length,
    []
  );
  const proxVencimento30 = useMemo(
    () =>
      CONVENIOS.filter((c) => {
        const dias = diasParaVencer(c.vencimento);
        return dias >= 0 && dias <= 30;
      }).length,
    []
  );
  const inadimplentes = useMemo(
    () => CONVENIOS.filter((c) => c.status === 'inadimplente').length,
    []
  );

  const conveniosFiltrados = useMemo(() => {
    return CONVENIOS.filter((c) => {
      if (filtroStatus !== 'todos' && c.status !== filtroStatus) return false;
      if (filtroMunicipio && !c.municipio.toLowerCase().includes(filtroMunicipio.toLowerCase())) return false;
      if (filtroExercicio && c.exercicio !== Number(filtroExercicio)) return false;
      return true;
    });
  }, [filtroStatus, filtroMunicipio, filtroExercicio]);

  return (
    <main id="conteudo-principal">
      <Breadcrumb items={[{ label: 'Convênios' }]} />

      <section className={styles.pagina}>
        <h1 className={styles.titulo}>Convênios</h1>

        <div className={styles.metricas} role="region" aria-label="Métricas de convênios">
          <div className={`${styles.metricaCard} ${styles.metricaDestaque}`}>
            <span className={styles.metricaValor}>{ativos}</span>
            <span className={styles.metricaLabel}>Total ativos</span>
          </div>
          <div className={styles.metricaCard}>
            <span className={styles.metricaValor}>{aguardandoAnalise}</span>
            <span className={styles.metricaLabel}>Aguardando análise</span>
          </div>
          <div className={`${styles.metricaCard} ${styles.metricaAtencao}`}>
            <span className={styles.metricaValor}>{proxVencimento30}</span>
            <span className={styles.metricaLabel}>Próx. vencimento 30d</span>
          </div>
          <div className={`${styles.metricaCard} ${styles.metricaPerigo}`}>
            <span className={styles.metricaValor}>{inadimplentes}</span>
            <span className={styles.metricaLabel}>Inadimplentes</span>
          </div>
        </div>

        <div className={styles.filtros} role="search" aria-label="Filtros de convênios">
          <div className={styles.filtrosCampos}>
            <label className={styles.filtroLabel} htmlFor="filtro-status">
              <span>Status</span>
              <select
                id="filtro-status"
                className={styles.filtroInput}
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value as any)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
            <label className={styles.filtroLabel} htmlFor="filtro-municipio">
              <span>Município</span>
              <input
                id="filtro-municipio"
                type="text"
                className={styles.filtroInput}
                placeholder="Filtrar por município…"
                value={filtroMunicipio}
                onChange={(e) => setFiltroMunicipio(e.target.value)}
              />
            </label>
            <label className={styles.filtroLabel} htmlFor="filtro-exercicio">
              <span>Exercício</span>
              <select
                id="filtro-exercicio"
                className={styles.filtroInput}
                value={filtroExercicio}
                onChange={(e) => setFiltroExercicio(e.target.value)}
              >
                <option value="">Todos os exercícios</option>
                {EXERCICIOS_UNICOS.map((ano) => (
                  <option key={ano} value={String(ano)}>{ano}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className={styles.tabelaWrapper}>
          <table className={styles.tabela} aria-label="Lista de convênios">
            <thead>
              <tr>
                <th scope="col" className={styles.th}>Número</th>
                <th scope="col" className={styles.th}>Objeto / Município</th>
                <th scope="col" className={styles.th}>Valor</th>
                <th scope="col" className={styles.th}>Exercício</th>
                <th scope="col" className={styles.th}>Status</th>
                <th scope="col" className={styles.th}>Vencimento</th>
                <th scope="col" className={styles.th}>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {conveniosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.tdVazio}>
                    Nenhum convênio encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                conveniosFiltrados.map((conv) => {
                  const dias = diasParaVencer(conv.vencimento);
                  const vencimentoAlerta = dias < 0 || dias <= 30;
                  return (
                    <tr key={conv.id} className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.numero}>{conv.numero}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.objeto}>{conv.objeto}</span>
                        <span className={styles.municipio}>{conv.municipio}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.valor}>{formatarMoeda(conv.valor)}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.exercicio}>{conv.exercicio}</span>
                      </td>
                      <td className={styles.td}>
                        <Badge
                          label={LABELS_STATUS[conv.status]}
                          variante={VARIANTE_STATUS[conv.status] as any}
                        />
                      </td>
                      <td className={styles.td}>
                        <span className={vencimentoAlerta ? styles.vencimentoAlerta : ''}>
                          {formatarData(conv.vencimento)}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.responsavel}>{conv.responsavelNome}</span>
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
