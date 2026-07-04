import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Rodapé da SECID">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.coluna}>
            <div className={styles.logo} aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" role="img" aria-label="Logotipo do portal">
                <rect width="48" height="48" rx="8" fill="var(--cor-azul-principal)" />
                <text x="24" y="31" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize="18" fontWeight="700" fill="#FFFFFF">SC</text>
              </svg>
            </div>
            <p className={styles.orgNome}>SECID — Secretaria de Estado das Cidades</p>
            <address className={styles.endereco} aria-label="Endereço da SECID">
              Endereço institucional<br />
              Cidade/UF, CEP 00000-000<br />
              Tel: <a href="tel:+550000000000">(00) 0000-0000</a>
            </address>
          </div>

          <div className={styles.coluna}>
            <h3 className={styles.colunaTitle}>Institucional</h3>
            <nav aria-label="Links institucionais">
              <ul className={styles.linksList}>
                <li><a href="#" className={styles.footerLink}>Portal da Transparência</a></li>
                <li><a href="#" className={styles.footerLink}>Ouvidoria</a></li>
                <li><a href="/lgpd" className={styles.footerLink}>LGPD</a></li>
                <li><a href="#" className={styles.footerLink}>Denuncie Corrupção</a></li>
                <li><a href="/mapa-do-site" className={styles.footerLink}>Mapa do site</a></li>
              </ul>
            </nav>
          </div>

          <div className={styles.coluna}>
            <h3 className={styles.colunaTitle}>Portais Institucionais</h3>
            <nav aria-label="Portais institucionais">
              <ul className={styles.linksList}>
                <li><a href="#" className={styles.footerLink}>Portal do Governo</a></li>
                <li><a href="#" className={styles.footerLink}>Portal de Serviços</a></li>
                <li><a href="#" className={styles.footerLink}>Agência de Notícias</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className={styles.rodape}>
          <p>© 2026 SECID — Secretaria de Estado das Cidades</p>
        </div>
      </div>
    </footer>
  );
}
