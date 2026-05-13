'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Macrofluxo, AreaMacrofluxo } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useAuth } from '@/contexts/AuthContext';
import { truncarTexto } from '@/utils/formatters';
import styles from './page.module.css';

interface Props {
  macrofluxos: Macrofluxo[];
}

const LABELS_AREA: Record<AreaMacrofluxo, string> = {
  convenios: 'Convênios',
  obras: 'Obras',
  urbanismo: 'Urbanismo e Habitação',
  administrativo: 'Administrativo',
};

const FILTROS_AREA = [
  { value: '', label: 'Todos' },
  { value: 'convenios', label: 'Convênios' },
  { value: 'obras', label: 'Obras' },
  { value: 'urbanismo', label: 'Urbanismo' },
  { value: 'administrativo', label: 'Administrativo' },
] as const;

export default function MacrofluxosCliente({ macrofluxos }: Props) {
  const router = useRouter();
  const { temAcesso } = useAuth();
  const [busca, setBusca] = useState('');
  const [areaFiltro, setAreaFiltro] = useState('');
  const [macrofluxoModal, setMacrofluxoModal] = useState<Macrofluxo | null>(null);

  const resultados = useMemo(() => {
    const termo = busca.toLowerCase().trim();
    return macrofluxos.filter((m) => {
      const matchArea = areaFiltro === '' || m.area === areaFiltro;
      if (!matchArea) return false;
      if (!termo) return true;
      return (
        m.titulo.toLowerCase().includes(termo) ||
        m.descricao.toLowerCase().includes(termo) ||
        m.palavrasChave.some((p) => p.toLowerCase().includes(termo))
      );
    });
  }, [macrofluxos, busca, areaFiltro]);

  return (
    <section className={styles.pagina}>
      <div className={styles.cabecalho}>
        <h1 className={styles.titulo}>Macrofluxos dos Processos</h1>
        <p className={styles.subtitulo}>
          Consulte os fluxos padronizados dos principais processos da SECID-PR.
        </p>
      </div>

      <div className={styles.controles}>
        <div className={styles.buscaWrapper}>
          <label htmlFor="busca-macrofluxo" className={styles.labelBusca}>
            Buscar macrofluxo
          </label>
          <input
            id="busca-macrofluxo"
            type="search"
            className={styles.inputBusca}
            placeholder="Buscar por título, descrição ou palavra-chave…"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Buscar macrofluxo por título, descrição ou palavra-chave"
          />
        </div>

        <div className={styles.filtrosArea} role="group" aria-label="Filtrar por área">
          {FILTROS_AREA.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`${styles.filtroBtn} ${areaFiltro === f.value ? styles.filtroBtnAtivo : ''}`}
              onClick={() => setAreaFiltro(f.value)}
              aria-pressed={areaFiltro === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {resultados.length === 0 ? (
        <p className={styles.semResultados} role="status">
          Nenhum macrofluxo encontrado para os filtros aplicados.
        </p>
      ) : (
        <div className={styles.grid} aria-label={`${resultados.length} macrofluxos encontrados`}>
          {resultados.map((m) => (
            <article key={m.id} className={styles.card}>
              <div className={styles.cardTopo}>
                <Badge label={LABELS_AREA[m.area]} variante={m.area} />
                <span className={styles.versao}>v{m.versao}</span>
              </div>
              <h2 className={styles.cardTitulo}>{m.titulo}</h2>
              <p className={styles.cardDescricao}>{truncarTexto(m.descricao, 120)}</p>
              <div className={styles.cardMeta}>
                <span className={styles.metaItem} aria-label={`${m.etapas} etapas`}>
                  <span className={styles.metaIcone} aria-hidden="true">⊞</span>
                  {m.etapas} etapas
                </span>
                <span className={styles.metaItem} aria-label={`Prazo típico: ${m.prazoTipico} dias úteis`}>
                  <span className={styles.metaIcone} aria-hidden="true">◷</span>
                  {m.prazoTipico} dias úteis
                </span>
              </div>
              <div className={styles.cardAcoes}>
                <Button tamanho="sm" variante="secundario" onClick={() => router.push(`/macrofluxos/${m.id}`)}>
                  Ver fluxograma
                </Button>
                <Button tamanho="sm" variante="fantasma" onClick={() => setMacrofluxoModal(m)}>
                  Ver passo a passo
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      {temAcesso('workflows') && (
        <Link
          href="/workflows/novo"
          className={styles.fab}
          aria-label="Novo procedimento"
        >
          + Novo procedimento
        </Link>
      )}

      <Modal
        aberto={Boolean(macrofluxoModal)}
        onFechar={() => setMacrofluxoModal(null)}
        titulo={macrofluxoModal ? `Passo a passo: ${macrofluxoModal.titulo}` : 'Passo a passo'}
      >
        {macrofluxoModal && (
          <ol className={styles.listaPassos}>
            {macrofluxoModal.nos.map((no, idx) => (
              <li key={no.id} className={styles.itemPasso}>
                <span className={styles.numeroPasso}>{idx + 1}</span>
                <div className={styles.conteudoPasso}>
                  <strong className={styles.tituloPasso}>{no.titulo}</strong>
                  <span className={styles.tipoPasso}>
                    {no.tipo === 'inicio' ? 'Início' : no.tipo === 'fim' ? 'Fim' : no.tipo === 'decisao' ? 'Decisão' : 'Etapa'}
                  </span>
                </div>
              </li>
            ))}
            {!macrofluxoModal.nos.some((no) => no.tipo === 'fim') && (
              <li className={`${styles.itemPasso} ${styles.itemFim}`}>
                <span className={styles.numeroPasso}>✓</span>
                <strong className={styles.tituloPasso}>Fim.</strong>
              </li>
            )}
          </ol>
        )}
      </Modal>
    </section>
  );
}
