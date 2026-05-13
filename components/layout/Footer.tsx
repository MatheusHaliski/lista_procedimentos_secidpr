import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Rodapé da SECID-PR">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.coluna}>
            <div className={styles.logo} aria-label="Governo do Estado do Paraná">
              <Image
                src="/govpr.jpg"
                alt="Governo do Estado do Paraná"
                width={48}
                height={48}
              />
            </div>
            <p className={styles.orgNome}>SECID — Secretaria de Estado das Cidades</p>
            <address className={styles.endereco} aria-label="Endereço da SECID">
              Rua Eurípedes Garcez do Nascimento, 1195<br />
              Ahú, Curitiba-PR, CEP 80540-280<br />
              Tel: <a href="tel:+554132507200">(41) 3250-7200</a>
            </address>
          </div>

          <div className={styles.coluna}>
            <h3 className={styles.colunaTitle}>Institucional</h3>
            <nav aria-label="Links institucionais">
              <ul className={styles.linksList}>
                <li><a href="https://www.transparencia.pr.gov.br" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Portal da Transparência</a></li>
                <li><a href="https://www.ouvidoria.pr.gov.br" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Ouvidoria</a></li>
                <li><a href="/lgpd" className={styles.footerLink}>LGPD</a></li>
                <li><a href="https://www.cge.pr.gov.br" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Denuncie Corrupção</a></li>
                <li><a href="/mapa-do-site" className={styles.footerLink}>Mapa do site</a></li>
              </ul>
            </nav>
          </div>

          <div className={styles.coluna}>
            <h3 className={styles.colunaTitle}>Governo do Paraná</h3>
            <nav aria-label="Portais do governo">
              <ul className={styles.linksList}>
                <li><a href="https://www.parana.pr.gov.br" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>parana.pr.gov.br</a></li>
                <li><a href="https://www.pia.pr.gov.br" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>pia.pr.gov.br</a></li>
                <li><a href="https://www.aen.pr.gov.br" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Agência de Notícias</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className={styles.rodape}>
          <p>© 2026 Governo do Estado do Paraná — SECID | Desenvolvido pela <strong>CELEPAR</strong></p>
        </div>
      </div>
    </footer>
  );
}
