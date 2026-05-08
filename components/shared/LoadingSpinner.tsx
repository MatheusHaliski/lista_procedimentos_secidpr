import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  tamanho?: 'sm' | 'md' | 'lg';
  mensagem?: string;
}

export default function LoadingSpinner({ tamanho = 'md', mensagem = 'Carregando…' }: LoadingSpinnerProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={`${styles.spinner} ${styles[tamanho]}`} aria-hidden="true" />
      <span className={styles.mensagem}>{mensagem}</span>
    </div>
  );
}
