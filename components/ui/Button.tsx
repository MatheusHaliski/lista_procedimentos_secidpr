import React from 'react';
import styles from './Button.module.css';

type VarianteBtn = 'primario' | 'secundario' | 'perigo' | 'fantasma';
type TamanhoBtn = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBtn;
  tamanho?: TamanhoBtn;
  children: React.ReactNode;
  carregando?: boolean;
  icone?: React.ReactNode;
}

const VARIANTE_MAP: Record<VarianteBtn, string> = {
  primario:   styles.primario,
  secundario: styles.secundario,
  perigo:     styles.perigo,
  fantasma:   styles.fantasma,
};

const TAMANHO_MAP: Record<TamanhoBtn, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export default function Button({
  variante = 'primario',
  tamanho = 'md',
  children,
  carregando,
  icone,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${VARIANTE_MAP[variante]} ${TAMANHO_MAP[tamanho]} ${className || ''}`}
      disabled={disabled || carregando}
      aria-busy={carregando}
      {...rest}
    >
      {carregando ? (
        <span className={styles.spinner} aria-label="Carregando…" />
      ) : (
        icone && <span className={styles.icone} aria-hidden="true">{icone}</span>
      )}
      {children}
    </button>
  );
}
