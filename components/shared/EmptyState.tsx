import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icone?: React.ReactNode;
  titulo: string;
  descricao?: string;
  acao?: React.ReactNode;
}

export default function EmptyState({ icone, titulo, descricao, acao }: EmptyStateProps) {
  return (
    <div className={styles.wrapper} role="status">
      {icone && <div className={styles.icone} aria-hidden="true">{icone}</div>}
      <h3 className={styles.titulo}>{titulo}</h3>
      {descricao && <p className={styles.descricao}>{descricao}</p>}
      {acao && <div className={styles.acao}>{acao}</div>}
    </div>
  );
}
