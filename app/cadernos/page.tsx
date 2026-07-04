'use client';

import { useState, useCallback } from 'react';
import { BookOpen, AlertCircle, Scale, BookMarked, Layers } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import { CADERNOS } from '@/data/cadernos';
import type { Caderno, BlocoEspecialCaderno } from '@/types';
import styles from './page.module.css';

const ICONE_BLOCO: Record<BlocoEspecialCaderno['tipo'], React.ReactNode> = {
  caso_pratico:      <BookOpen size={16} aria-hidden="true" />,
  erro_comum:        <AlertCircle size={16} aria-hidden="true" />,
  referencia_legal:  <Scale size={16} aria-hidden="true" />,
  glossario:         <BookMarked size={16} aria-hidden="true" />,
};

const CLASSE_BLOCO: Record<BlocoEspecialCaderno['tipo'], string> = {
  caso_pratico:     styles.blocoCasoPratico,
  erro_comum:       styles.blocoErroComum,
  referencia_legal: styles.blocoReferenciaLegal,
  glossario:        styles.blocoGlossario,
};

function BlocoEspecial({ bloco }: { bloco: BlocoEspecialCaderno }) {
  return (
    <div
      className={`${styles.blocoCaderno} ${CLASSE_BLOCO[bloco.tipo]}`}
      role="note"
      aria-label={bloco.titulo}
    >
      <div className={styles.blocoCabecalho}>
        {ICONE_BLOCO[bloco.tipo]}
        <p className={styles.blocoNomeTipo}>{bloco.titulo}</p>
      </div>
      <p className={styles.blocoConteudoTexto}>{bloco.conteudo}</p>
    </div>
  );
}

function VisualizadorCaderno({ caderno }: { caderno: Caderno }) {
  const [capituloAtivo, setCapituloAtivo] = useState(caderno.capitulos[0]?.id ?? '');

  const irParaCapitulo = (id: string) => {
    setCapituloAtivo(id);
    document.getElementById(`cap-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.visualizadorCaderno}>
      <div
        className={styles.capaCaderno}
        style={{ background: caderno.corCapa }}
        role="banner"
        aria-label={`Capa do caderno: ${caderno.titulo}`}
      >
        <h2 className={styles.capaTitulo}>{caderno.titulo}</h2>
        <p className={styles.capaArea}>{caderno.area}</p>
      </div>

      <div className={styles.layoutVisualizar}>
        <nav className={styles.sumario} aria-label="Capítulos do caderno">
          <p className={styles.sumarioTitulo}>Capítulos</p>
          <ol className={styles.sumarioLista}>
            {caderno.capitulos.map((cap) => (
              <li key={cap.id}>
                <a
                  href={`#cap-${cap.id}`}
                  className={`${styles.sumarioLink} ${capituloAtivo === cap.id ? styles.sumarioLinkAtivo : ''}`}
                  onClick={(e) => { e.preventDefault(); irParaCapitulo(cap.id); }}
                  aria-current={capituloAtivo === cap.id ? 'location' : undefined}
                >
                  {cap.titulo}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.conteudoCaderno} role="region" aria-label="Conteúdo do caderno">
          {caderno.capitulos.map((cap) => (
            <section key={cap.id} id={`cap-${cap.id}`} className={styles.capitulo}>
              <h3 className={styles.capituloTitulo}>{cap.titulo}</h3>
              <p className={styles.capituloTexto}>{cap.conteudo}</p>
              {cap.blocos && cap.blocos.length > 0 && (
                <div className={styles.blocosCaderno}>
                  {cap.blocos.map((b, i) => (
                    <BlocoEspecial key={i} bloco={b} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CadernosPage() {
  const [cadernoAberto, setCadernoAberto] = useState<Caderno | null>(null);

  const fecharModal = useCallback(() => setCadernoAberto(null), []);

  return (
    <main id="conteudo-principal">
      <Breadcrumb items={[{ label: 'Cadernos Orientativos' }]} />
      <div className={styles.pagina}>
        <header className={styles.cabecalho}>
          <h1 className={styles.tituloPagina}>Cadernos Orientativos</h1>
          <p className={styles.subtituloPagina}>
            Guias temáticos com boas práticas, casos reais e referências técnicas para os processos da SECID.
          </p>
        </header>

        <div className={styles.gridCadernos} aria-label={`${CADERNOS.length} cadernos orientativos`}>
          {CADERNOS.map((caderno) => (
            <article
              key={caderno.id}
              className={styles.cardCapa}
              role="button"
              tabIndex={0}
              aria-label={`Abrir caderno: ${caderno.titulo}`}
              onClick={() => setCadernoAberto(caderno)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setCadernoAberto(caderno);
              }}
            >
              <div
                className={styles.cardHeader}
                style={{ background: caderno.corCapa }}
                aria-hidden="true"
              >
                <h2 className={styles.cardHeaderTitulo}>{caderno.titulo}</h2>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardDescricao}>{caderno.descricao}</p>
                <div className={styles.cardMeta}>
                  <Badge label={caderno.area} variante="pendente" />
                  <span className={styles.cardMetaCapitulos} aria-label={`${caderno.capitulos.length} capítulos`}>
                    <Layers size={12} aria-hidden="true" />
                    {caderno.capitulos.length} {caderno.capitulos.length === 1 ? 'capítulo' : 'capítulos'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {cadernoAberto && (
          <Modal
            aberto={!!cadernoAberto}
            onFechar={fecharModal}
            titulo={cadernoAberto.titulo}
            tamanho="lg"
          >
            <VisualizadorCaderno caderno={cadernoAberto} />
          </Modal>
        )}
      </div>
    </main>
  );
}
