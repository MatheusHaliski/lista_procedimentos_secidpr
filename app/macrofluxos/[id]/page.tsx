import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MACROFLUXOS } from '@/data/macrofluxos';
import type { AreaMacrofluxo } from '@/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import FluxogramaInterativo from '@/components/macrofluxos/FluxogramaInterativo';
import BotaoImprimir from './BotaoImprimir';
import styles from './page.module.css';

const LABELS_AREA: Record<AreaMacrofluxo, string> = {
  convenios: 'Convênios',
  obras: 'Obras',
  urbanismo: 'Urbanismo e Habitação',
  administrativo: 'Administrativo',
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MacrofluxoDetalhePage({ params }: Props) {
  const { id } = await params;
  const macrofluxo = MACROFLUXOS.find((m) => m.id === id);

  if (!macrofluxo) {
    notFound();
  }

  const labelArea = LABELS_AREA[macrofluxo.area];

  return (
    <main id="conteudo-principal">
      <Breadcrumb
        items={[
          { label: 'Macrofluxos', href: '/macrofluxos' },
          { label: labelArea },
          { label: macrofluxo.titulo },
        ]}
      />

      <section className={styles.pagina}>
        <div className={styles.cabecalho}>
          <div className={styles.cabecalhoTopo}>
            <Badge label={labelArea} variante={macrofluxo.area} />
            <span className={styles.versao}>versão {macrofluxo.versao}</span>
          </div>
          <h1 className={styles.titulo}>{macrofluxo.titulo}</h1>
          <p className={styles.descricao}>{macrofluxo.descricao}</p>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <span aria-hidden="true">⊞</span> {macrofluxo.etapas} etapas
            </span>
            <span className={styles.metaItem}>
              <span aria-hidden="true">◷</span> Prazo típico: {macrofluxo.prazoTipico} dias úteis
            </span>
          </div>
        </div>

        <div className={styles.acoes}>
          <Link
            href={`/workflows/novo?tipo=${macrofluxo.id}`}
            className={styles.btnIniciar}
            aria-label={`Iniciar procedimento baseado em ${macrofluxo.titulo}`}
          >
            Iniciar procedimento
          </Link>
          <BotaoImprimir />
        </div>

        <FluxogramaInterativo nos={macrofluxo.nos} />
      </section>
    </main>
  );
}
