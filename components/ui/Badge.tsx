import styles from './Badge.module.css';

type VarianteBadge =
  | 'no_prazo' | 'atencao' | 'atrasado' | 'devolvido'
  | 'em_andamento' | 'concluido' | 'pendente'
  | 'convenios' | 'obras' | 'urbanismo' | 'administrativo'
  | 'analise' | 'aprovado' | 'prestacao_contas' | 'inadimplente' | 'suspenso'
  | 'paralisada' | 'nao_iniciada';

interface BadgeProps {
  label: string;
  variante?: VarianteBadge;
  className?: string;
}

const MAP_VARIANTE: Record<string, string> = {
  no_prazo:       styles.noPrazo,
  atencao:        styles.atencao,
  atrasado:       styles.atrasado,
  devolvido:      styles.devolvido,
  em_andamento:   styles.emAndamento,
  concluido:      styles.concluido,
  pendente:       styles.pendente,
  convenios:      styles.convenios,
  obras:          styles.obras,
  urbanismo:      styles.urbanismo,
  administrativo: styles.administrativo,
  analise:        styles.pendente,
  aprovado:       styles.noPrazo,
  prestacao_contas: styles.atencao,
  inadimplente:   styles.atrasado,
  suspenso:       styles.devolvido,
  paralisada:     styles.devolvido,
  nao_iniciada:   styles.pendente,
};

export default function Badge({ label, variante = 'pendente', className }: BadgeProps) {
  const varianteClass = MAP_VARIANTE[variante] || styles.pendente;
  return (
    <span className={`${styles.badge} ${varianteClass} ${className || ''}`}>
      {label}
    </span>
  );
}
