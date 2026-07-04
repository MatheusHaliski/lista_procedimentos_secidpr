import styles from './InstBar.module.css';

export default function InstBar() {
  return (
    <div className={styles.instbar} role="banner" aria-label="Barra institucional">
      <div className={styles.inner}>
        <span className={styles.logoLink} aria-label="Portal institucional">
          <svg width="120" height="20" viewBox="0 0 120 20" fill="none" aria-hidden="true">
            <text x="0" y="15" fontFamily="Montserrat, sans-serif" fontSize="12" fontWeight="600" fill="white">
              Portal Institucional
            </text>
          </svg>
        </span>

        <nav aria-label="Links de acessibilidade do governo" className={styles.links}>
          <button className={styles.link} aria-label="Ativar alto contraste">
            Alto Contraste
          </button>
          <span className={styles.separator} aria-hidden="true">|</span>
          <button className={styles.link} aria-label="Ativar VLibras — tradutor de Libras">
            VLibras
          </button>
          <span className={styles.separator} aria-hidden="true">|</span>
          <a href="#acessibilidade" className={styles.link}>
            Acessibilidade
          </a>
          <span className={styles.separator} aria-hidden="true">|</span>
          <a href="/mapa-do-site" className={styles.link}>
            Mapa do site
          </a>
        </nav>
      </div>
    </div>
  );
}
