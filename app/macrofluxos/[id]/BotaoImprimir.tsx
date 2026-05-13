'use client';

import styles from './page.module.css';

export default function BotaoImprimir() {
  return (
    <button
      type="button"
      className={styles.btnImprimir}
      onClick={() => window.print()}
      aria-label="Imprimir fluxograma"
    >
      Imprimir fluxograma
    </button>
  );
}
