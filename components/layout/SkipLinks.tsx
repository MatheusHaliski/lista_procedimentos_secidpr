import styles from './SkipLinks.module.css';

export default function SkipLinks() {
  return (
    <nav aria-label="Links de acessibilidade">
      <a href="#conteudo-principal" className={styles.skipLink}>
        Ir para o conteúdo
      </a>
      <a href="#navegacao-principal" className={styles.skipLink}>
        Ir para a navegação
      </a>
      <a href="#busca-global" className={styles.skipLink}>
        Ir para a busca
      </a>
    </nav>
  );
}
