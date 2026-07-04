'use client';

import { useState, useCallback } from 'react';
import { Info, AlertTriangle, Lightbulb, Download, BookOpen } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import Alert from '@/components/ui/Alert';
import { MANUAIS } from '@/data/manuais';
import { CHECKLISTS } from '@/data/checklists';
import type { Manual, Checklist, BlocoEspecial } from '@/types';
import styles from './page.module.css';

const FILTROS_AREA = [
  'Todos',
  'Engenharia e Obras',
  'Convênios',
  'Urbanismo',
  'Habitação',
  'Sistemas',
];


const MANUAIS_COM_PDF = new Set([
  'manual-fiscal-obras',
  'manual-gestao-convenios',
  'manual-analise-urbanistica',
  'manual-reurb',
  'manual-sistema-workflow',
]);

function BlocoEspecialManual({ bloco }: { bloco: BlocoEspecial }) {
  if (bloco.tipo === 'destaque') {
    return (
      <div className={styles.blocoDestaque} role="note" aria-label="Destaque">
        <span className={`${styles.blocoIcone} ${styles.blocoIconeDestaque}`} aria-hidden="true">
          <Info size={16} />
        </span>
        <p className={styles.blocoTexto}>{bloco.conteudo}</p>
      </div>
    );
  }
  if (bloco.tipo === 'alerta') {
    return (
      <div className={styles.blocoAlerta} role="note" aria-label="Alerta">
        <span className={`${styles.blocoIcone} ${styles.blocoIconeAlerta}`} aria-hidden="true">
          <AlertTriangle size={16} />
        </span>
        <p className={styles.blocoTexto}>{bloco.conteudo}</p>
      </div>
    );
  }
  return (
    <div className={styles.blocoDica} role="note" aria-label="Dica">
      <span className={`${styles.blocoIcone} ${styles.blocoIconeDica}`} aria-hidden="true">
        <Lightbulb size={16} />
      </span>
      <p className={styles.blocoTexto}>{bloco.conteudo}</p>
    </div>
  );
}

function VisualizadorManual({ manual }: { manual: Manual }) {
  const [secaoAtiva, setSecaoAtiva] = useState(manual.secoes[0]?.id ?? '');

  const irParaSecao = (id: string) => {
    setSecaoAtiva(id);
    document.getElementById(`secao-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.visualizador}>
      <nav className={styles.sumario} aria-label="Sumário do manual">
        <p className={styles.sumarioTitulo}>Sumário</p>
        <ol className={styles.sumarioLista}>
          {manual.secoes.map((s) => (
            <li key={s.id}>
              <a
                href={`#secao-${s.id}`}
                className={`${styles.sumarioLink} ${secaoAtiva === s.id ? styles.sumarioLinkAtivo : ''}`}
                onClick={(e) => { e.preventDefault(); irParaSecao(s.id); }}
                aria-current={secaoAtiva === s.id ? 'location' : undefined}
              >
                {s.titulo}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className={styles.conteudoManual} role="region" aria-label="Conteúdo do manual">
        {manual.secoes.map((s) => (
          <section key={s.id} id={`secao-${s.id}`} className={styles.secao}>
            <h3 className={styles.secaoTitulo}>{s.titulo}</h3>
            <p className={styles.secaoTexto}>{s.conteudo}</p>
            {s.blocos && s.blocos.length > 0 && (
              <div className={styles.blocos}>
                {s.blocos.map((b, i) => (
                  <BlocoEspecialManual key={i} bloco={b} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

function AbaManuals() {
  const [filtro, setFiltro] = useState('Todos');
  const [manualAberto, setManualAberto] = useState<Manual | null>(null);
  const [mostrarAlertaPdf, setMostrarAlertaPdf] = useState(false);

  const manuaisFiltrados = filtro === 'Todos'
    ? MANUAIS
    : MANUAIS.filter((m) => m.area === filtro);

  const fecharModal = useCallback(() => {
    setManualAberto(null);
    setMostrarAlertaPdf(false);
  }, []);

  const abrirManual = (manual: Manual) => {
    setManualAberto(manual);
    setMostrarAlertaPdf(false);
  };

  return (
    <>
      <div className={styles.filtros} role="group" aria-label="Filtrar por área">
        {FILTROS_AREA.map((f) => (
          <button
            key={f}
            type="button"
            className={`${styles.filtroBtn} ${filtro === f ? styles.filtroBtnAtivo : ''}`}
            onClick={() => setFiltro(f)}
            aria-pressed={filtro === f}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.gridManuais} aria-label={`${manuaisFiltrados.length} manuais`}>
        {manuaisFiltrados.map((manual) => (
          <article
            key={manual.id}
            className={styles.cardManual}
            role="button"
            tabIndex={0}
            aria-label={`Abrir manual: ${manual.titulo}`}
            onClick={() => abrirManual(manual)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') abrirManual(manual); }}
          >
            <div className={styles.cardTopo}>
              <Badge label={manual.area} variante="pendente" />
              <Badge label={`v${manual.versao}`} variante="pendente" />
            </div>
            <h2 className={styles.cardTitulo}>{manual.titulo}</h2>
            <p className={styles.cardDescricao}>{manual.descricao}</p>
            <div className={styles.cardMeta}>
              <span className={styles.cardMetaItem} aria-label={`${manual.paginas} páginas`}>
                <BookOpen size={12} aria-hidden="true" />
                {manual.paginas} páginas
              </span>
            </div>
            <div className={styles.cardRodape}>
              <Button
                variante="fantasma"
                tamanho="sm"
                aria-label={`Ver manual ${manual.titulo}`}
                onClick={(e) => { e.stopPropagation(); abrirManual(manual); }}
              >
                Ver manual
              </Button>
            </div>
          </article>
        ))}
      </div>

      {manualAberto && (
        <Modal
          aberto={!!manualAberto}
          onFechar={fecharModal}
          titulo={manualAberto.titulo}
          tamanho="lg"
          rodape={
            <div className={styles.rodapeModal}>
              {mostrarAlertaPdf && (
                <div className={styles.alertaPdfInline}>
                  <Alert variante="info">PDF disponível em breve</Alert>
                </div>
              )}
              <Button
                variante="fantasma"
                tamanho="sm"
                icone={<Download size={14} />}
                aria-label="Baixar PDF do manual"
                onClick={() => {
                  if (!manualAberto || !MANUAIS_COM_PDF.has(manualAberto.id)) {
                    setMostrarAlertaPdf(true);
                    return;
                  }
                  setMostrarAlertaPdf(false);
                  window.open(`/api/manuais/${manualAberto.id}/pdf`, '_blank', 'noopener,noreferrer');
                }}
              >
                Baixar PDF
              </Button>
            </div>
          }
        >
          <VisualizadorManual manual={manualAberto} />
        </Modal>
      )}
    </>
  );
}

function AbaChecklists() {
  const [checklistAtivo, setChecklistAtivo] = useState<Checklist>(CHECKLISTS[0]);
  const [marcados, setMarcados] = useState<Set<string>>(new Set());

  const trocarChecklist = (checklist: Checklist) => {
    setChecklistAtivo(checklist);
    setMarcados(new Set());
  };

  const toggleItem = (id: string) => {
    setMarcados((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const total = checklistAtivo.itens.length;
  const concluidos = checklistAtivo.itens.filter((i) => marcados.has(i.id)).length;
  const percentual = total > 0 ? Math.round((concluidos / total) * 100) : 0;
  const cem = percentual === 100;

  const obrigatoriosNaoMarcados = checklistAtivo.itens.filter(
    (i) => i.obrigatorio && !marcados.has(i.id)
  );

  const progressoVariante = cem
    ? 'sucesso'
    : percentual >= 50
    ? 'padrao'
    : 'padrao';

  return (
    <div className={styles.layoutChecklist}>
      <aside>
        <nav className={styles.sidebarChecklist} aria-label="Lista de checklists">
          <p className={styles.sidebarTitulo}>Checklists</p>
          <ul className={styles.sidebarLista} role="list">
            {CHECKLISTS.map((cl) => {
              const tot = cl.itens.length;
              const marc = cl.itens.filter((i) => i.id === cl.id ? false : false).length;
              void marc;
              return (
                <li key={cl.id} className={styles.sidebarItem}>
                  <button
                    type="button"
                    className={`${styles.sidebarBtn} ${checklistAtivo.id === cl.id ? styles.sidebarBtnAtivo : ''}`}
                    onClick={() => trocarChecklist(cl)}
                    aria-pressed={checklistAtivo.id === cl.id}
                    aria-label={`Selecionar checklist: ${cl.titulo}`}
                  >
                    <span className={styles.sidebarNome}>{cl.titulo}</span>
                    <ProgressBar
                      valor={checklistAtivo.id === cl.id ? concluidos : 0}
                      max={tot}
                      mostrarTexto={false}
                      variante={checklistAtivo.id === cl.id && cem ? 'sucesso' : 'padrao'}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <section className={styles.areaChecklist} aria-label={`Checklist: ${checklistAtivo.titulo}`}>
        <header className={styles.checklistCabecalho}>
          <h2 className={styles.checklistTitulo}>{checklistAtivo.titulo}</h2>
          <p className={styles.checklistArea}>{checklistAtivo.area}</p>
          <p className={styles.progressoInfo}>
            <span className={styles.progressoDestaque}>{concluidos} de {total}</span> itens concluídos
          </p>
          <ProgressBar
            valor={concluidos}
            max={total}
            mostrarTexto={false}
            variante={progressoVariante}
          />
        </header>

        <ul className={styles.listaItens} role="list">
          {checklistAtivo.itens.map((item) => {
            const checked = marcados.has(item.id);
            return (
              <li
                key={item.id}
                className={`${styles.itemChecklist} ${checked ? styles.itemMarcado : ''}`}
              >
                <input
                  type="checkbox"
                  id={`chk-${item.id}`}
                  className={styles.checkboxInput}
                  checked={checked}
                  onChange={() => toggleItem(item.id)}
                  aria-label={item.descricao}
                />
                <div className={styles.itemConteudo}>
                  <label
                    htmlFor={`chk-${item.id}`}
                    className={`${styles.itemLabel} ${checked ? styles.itemLabelMarcado : ''}`}
                  >
                    {item.descricao}
                  </label>
                  {item.obrigatorio && (
                    <Badge label="Obrigatório" variante="atrasado" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <footer className={styles.rodapeChecklist}>
          {obrigatoriosNaoMarcados.length > 0 && (
            <Alert variante="erro">
              {obrigatoriosNaoMarcados.length === 1
                ? '1 item obrigatório ainda não foi marcado.'
                : `${obrigatoriosNaoMarcados.length} itens obrigatórios ainda não foram marcados.`}
            </Alert>
          )}
          <div className={styles.rodapeAcoes}>
            {cem ? (
              <Button
                variante="primario"
                style={{ backgroundColor: 'var(--cor-verde-sucesso)', borderColor: 'var(--cor-verde-sucesso)' }}
                aria-label="Registrar checklist no sistema"
              >
                Registrar no sistema
              </Button>
            ) : (
              <Button variante="fantasma" aria-label="Salvar rascunho do checklist">
                Salvar rascunho
              </Button>
            )}
          </div>
        </footer>
      </section>
    </div>
  );
}

export default function ManuaisPage() {
  const [abaAtiva, setAbaAtiva] = useState<'manuais' | 'checklists'>('manuais');

  return (
    <main id="conteudo-principal">
      <Breadcrumb items={[{ label: 'Manuais e Checklists' }]} />
      <div className={styles.pagina}>
        <header className={styles.cabecalho}>
          <h1 className={styles.tituloPagina}>Manuais e Checklists</h1>
          <p className={styles.subtituloPagina}>
            Consulte os manuais técnicos e utilize os checklists padronizados dos processos da SECID.
          </p>
        </header>

        <div className={styles.abas} role="tablist" aria-label="Seções de Manuais e Checklists">
          <button
            role="tab"
            type="button"
            className={`${styles.aba} ${abaAtiva === 'manuais' ? styles.abaAtiva : ''}`}
            onClick={() => setAbaAtiva('manuais')}
            aria-selected={abaAtiva === 'manuais'}
            aria-controls="painel-manuais"
            id="aba-manuais"
          >
            Manuais
          </button>
          <button
            role="tab"
            type="button"
            className={`${styles.aba} ${abaAtiva === 'checklists' ? styles.abaAtiva : ''}`}
            onClick={() => setAbaAtiva('checklists')}
            aria-selected={abaAtiva === 'checklists'}
            aria-controls="painel-checklists"
            id="aba-checklists"
          >
            Checklists
          </button>
        </div>

        <div
          id="painel-manuais"
          role="tabpanel"
          aria-labelledby="aba-manuais"
          hidden={abaAtiva !== 'manuais'}
        >
          {abaAtiva === 'manuais' && <AbaManuals />}
        </div>
        <div
          id="painel-checklists"
          role="tabpanel"
          aria-labelledby="aba-checklists"
          hidden={abaAtiva !== 'checklists'}
        >
          {abaAtiva === 'checklists' && <AbaChecklists />}
        </div>
      </div>
    </main>
  );
}
