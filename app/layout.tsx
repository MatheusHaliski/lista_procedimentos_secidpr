import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import SkipLinks from '@/components/layout/SkipLinks';
import InstBar from '@/components/layout/InstBar';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'Portal SAP SECID — Gestão por Processos',
  description: 'Sistema web interno de gestão por processos e transformação digital da Secretaria de Estado das Cidades do Paraná (SECID-PR).',
  keywords: ['SECID', 'Paraná', 'gestão por processos', 'workflows', 'convênios', 'obras'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={styles.body}>
        <AuthProvider>
          <SkipLinks />
          <InstBar />
          <Header />
          <NavBar />
          <main id="conteudo-principal" className={styles.main} tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
