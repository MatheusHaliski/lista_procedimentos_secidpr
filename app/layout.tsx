import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import AppShell from '@/components/layout/AppShell';
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
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
