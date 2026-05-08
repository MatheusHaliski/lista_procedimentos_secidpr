import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  valor: number;
  max?: number;
  label?: string;
  mostrarTexto?: boolean;
  variante?: 'padrao' | 'sucesso' | 'atencao' | 'perigo';
}

export default function ProgressBar({
  valor,
  max = 100,
  label,
  mostrarTexto = true,
  variante = 'padrao',
}: ProgressBarProps) {
  const pct = Math.min(Math.round((valor / max) * 100), 100);

  const varianteClass = {
    padrao:  styles.barPadrao,
    sucesso: styles.barSucesso,
    atencao: styles.barAtencao,
    perigo:  styles.barPerigo,
  }[variante];

  return (
    <div className={styles.wrapper}>
      {(label || mostrarTexto) && (
        <div className={styles.topo}>
          {label && <span className={styles.label}>{label}</span>}
          {mostrarTexto && <span className={styles.pct}>{pct}%</span>}
        </div>
      )}
      <div
        className={styles.trilha}
        role="progressbar"
        aria-valuenow={valor}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `Progresso: ${pct}%`}
      >
        <div
          className={`${styles.barra} ${varianteClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
