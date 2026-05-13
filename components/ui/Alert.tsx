import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import styles from './Alert.module.css';

type VarianteAlert = 'info' | 'sucesso' | 'atencao' | 'erro';

interface AlertProps {
  variante?: VarianteAlert;
  titulo?: string;
  children: React.ReactNode;
  className?: string;
}

const ICONES: Record<VarianteAlert, React.ReactNode> = {
  info:    <Info size={16} />,
  sucesso: <CheckCircle2 size={16} />,
  atencao: <AlertTriangle size={16} />,
  erro:    <AlertCircle size={16} />,
};

const ROLES: Record<VarianteAlert, string> = {
  info:    'status',
  sucesso: 'status',
  atencao: 'alert',
  erro:    'alert',
};

export default function Alert({ variante = 'info', titulo, children, className }: AlertProps) {
  return (
    <div
      className={`${styles.alert} ${styles[variante]} ${className || ''}`}
      role={ROLES[variante]}
    >
      <span className={styles.icone} aria-hidden="true">{ICONES[variante]}</span>
      <div className={styles.conteudo}>
        {titulo && <strong className={styles.titulo}>{titulo}</strong>}
        <span className={styles.texto}>{children}</span>
      </div>
    </div>
  );
}
