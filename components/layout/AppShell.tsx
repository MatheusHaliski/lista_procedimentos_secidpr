'use client';

import { usePathname } from 'next/navigation';
import SkipLinks from '@/components/layout/SkipLinks';
import InstBar from '@/components/layout/InstBar';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import styles from '@/app/layout.module.css';

const ROTAS_AUTH = ['/login', '/criar-conta', '/esqueceu-senha'];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const telaAuth = ROTAS_AUTH.includes(pathname);

  if (telaAuth) {
    return <main id="conteudo-principal" className={styles.main}>{children}</main>;
  }

  return (
    <>
      <SkipLinks />
      <InstBar />
      <Header />
      <NavBar />
      <main id="conteudo-principal" className={styles.main} tabIndex={-1}>{children}</main>
      <Footer />
    </>
  );
}
