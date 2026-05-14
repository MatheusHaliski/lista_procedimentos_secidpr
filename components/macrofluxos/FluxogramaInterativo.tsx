'use client';

import { useState } from 'react';
import type { NoFluxograma } from '@/types';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import styles from './FluxogramaInterativo.module.css';

interface Props {
  nos: NoFluxograma[];
}

export default function FluxogramaInterativo({ nos }: Props) {
  const [noSelecionado, setNoSelecionado] = useState<NoFluxograma | null>(null);
  const [modalPassosAberto, setModalPassosAberto] = useState(false);

  const atores = Array.from(new Set(nos.map((no) => no.responsavel)));

  function selecionarNo(no: NoFluxograma) {
    setNoSelecionado((prev) => (prev?.id === no.id ? null : no));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.acoesFluxo}>
        <button type="button" className={styles.btnPassoAPasso} onClick={() => setModalPassosAberto(true)}>
          Ver passo a passo
        </button>
      </div>
      <div className={styles.fluxograma} role="list" aria-label="Etapas do fluxograma">
        <div className={styles.colunaAtores} aria-label="Atores do processo">
          {atores.map((ator) => (
            <div key={ator} className={styles.atorItem}>{ator}</div>
          ))}
        </div>

        <div className={styles.colunaEtapas}>
        {nos.map((no, idx) => (
          <div key={no.id} className={styles.noWrapper} role="listitem">
            {idx > 0 && (
              <div className={styles.setaWrapper} aria-hidden="true">
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className={styles.seta}>
                  <line x1="12" y1="0" x2="12" y2="24" stroke="#9ca3af" strokeWidth="2" />
                  <polygon points="6,20 12,32 18,20" fill="#9ca3af" />
                </svg>
              </div>
            )}

            <button
              type="button"
              className={`${styles.no} ${styles[`no_${no.tipo}`]} ${noSelecionado?.id === no.id ? styles.noAtivo : ''}`}
              onClick={() => selecionarNo(no)}
              aria-pressed={noSelecionado?.id === no.id}
              aria-label={`${no.tipo === 'inicio' ? 'Início' : no.tipo === 'fim' ? 'Fim' : no.tipo === 'decisao' ? 'Decisão' : `Etapa ${no.posicao ?? idx + 1}`}: ${no.titulo}`}
            >
              {no.tipo === 'inicio' && (
                <div className={styles.noConteudo}>
                  <span className={styles.inicioCirculo} aria-hidden="true">▶</span>
                  <span className={styles.inicioLabel}>{no.titulo}</span>
                </div>
              )}

              {no.tipo === 'normal' && (
                <div className={styles.noConteudo}>
                  <span className={styles.numero} aria-hidden="true">{no.posicao ?? idx + 1}</span>
                  <span className={styles.noTitulo}>{no.titulo}</span>
                </div>
              )}

              {no.tipo === 'decisao' && (
                <div className={styles.decisaoWrapper}>
                  <div className={styles.losangoOuter}>
                    <div className={styles.losangoInner}>
                      <span className={styles.noTitulo}>{no.titulo}</span>
                    </div>
                  </div>
                  {no.caminhos && (
                    <div className={styles.caminhos} aria-label="Caminhos possíveis">
                      {no.caminhos.map((c) => (
                        <Badge key={c.label} label={c.label} variante="atencao" />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {no.tipo === 'fim' && (
                <div className={styles.noConteudo}>
                  <span className={styles.fimIcone} aria-hidden="true">✓</span>
                  <span className={styles.noTitulo}>{no.titulo}</span>
                </div>
              )}
            </button>
          </div>
        ))}
        </div>
      </div>

      <aside className={styles.painel} aria-label="Detalhes do nó selecionado">
        {noSelecionado ? (
          <div className={styles.painelConteudo}>
            <h3 className={styles.painelTitulo}>{noSelecionado.titulo}</h3>
            <dl className={styles.painelDl}>
              <div className={styles.painelItem}>
                <dt className={styles.painelDt}>Tipo</dt>
                <dd className={styles.painelDd}>
                  <Badge
                    label={
                      noSelecionado.tipo === 'inicio' ? 'Início' :
                      noSelecionado.tipo === 'fim' ? 'Fim' :
                      noSelecionado.tipo === 'decisao' ? 'Decisão' : 'Normal'
                    }
                    variante={
                      noSelecionado.tipo === 'inicio' ? 'no_prazo' :
                      noSelecionado.tipo === 'fim' ? 'concluido' :
                      noSelecionado.tipo === 'decisao' ? 'atencao' : 'em_andamento'
                    }
                  />
                </dd>
              </div>
              <div className={styles.painelItem}>
                <dt className={styles.painelDt}>Responsável</dt>
                <dd className={styles.painelDd}>{noSelecionado.responsavel}</dd>
              </div>
              <div className={styles.painelItem}>
                <dt className={styles.painelDt}>Descrição</dt>
                <dd className={styles.painelDd}>{noSelecionado.descricao}</dd>
              </div>
              {noSelecionado.documentos && noSelecionado.documentos.length > 0 && (
                <div className={styles.painelItem}>
                  <dt className={styles.painelDt}>Documentos</dt>
                  <dd className={styles.painelDd}>
                    <ul className={styles.documentosList}>
                      {noSelecionado.documentos.map((doc) => (
                        <li key={doc} className={styles.documentoItem}>{doc}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {noSelecionado.caminhos && noSelecionado.caminhos.length > 0 && (
                <div className={styles.painelItem}>
                  <dt className={styles.painelDt}>Caminhos</dt>
                  <dd className={styles.painelDd}>
                    <ul className={styles.documentosList}>
                      {noSelecionado.caminhos.map((c) => (
                        <li key={c.label} className={styles.documentoItem}>
                          <strong>{c.label}</strong> → nó {c.destino}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        ) : (
          <div className={styles.painelVazio} role="status">
            <span className={styles.painelVazioIcone} aria-hidden="true">⊞</span>
            <p className={styles.painelVazioTexto}>
              Clique em um nó para ver detalhes
            </p>
          </div>
        )}
      </aside>

      <Modal
        aberto={modalPassosAberto}
        onFechar={() => setModalPassosAberto(false)}
        titulo="Passo a passo do fluxo"
        tamanho="md"
      >
        <ol className={styles.listaPassos}>
          {nos.map((no, idx) => (
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
          {!nos.some((no) => no.tipo === 'fim') && (
            <li className={`${styles.itemPasso} ${styles.itemFim}`}>
              <span className={styles.numeroPasso}>✓</span>
              <strong className={styles.tituloPasso}>Fim.</strong>
            </li>
          )}
        </ol>
      </Modal>
    </div>
  );
}
