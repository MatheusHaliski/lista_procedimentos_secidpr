'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { GitBranch, GitPullRequest, BookOpen, FileText, HardHat, Handshake, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './NavBar.module.css';

const NAV_ITEMS = [
  { icon: GitBranch,      label: 'Macrofluxos',    rota: '/macrofluxos',  modulo: 'macrofluxos' },
  { icon: GitPullRequest, label: 'Procedimentos',  rota: '/workflows',    modulo: 'workflows'   },
  { icon: BookOpen,       label: 'Manuais',         rota: '/manuais',      modulo: 'manuais'     },
  { icon: FileText,       label: 'Cadernos',        rota: '/cadernos',     modulo: 'cadernos'    },
  { icon: HardHat,        label: 'Painel de Obras', rota: '/obras',        modulo: 'obras'       },
  { icon: Handshake,      label: 'Convênios',            rota: '/convenios',             modulo: 'convenios'             },
  { icon: ShieldCheck,    label: 'Administração',        rota: '/admin',                 modulo: 'admin'                 },
];

export default function NavBar() {
  const pathname = usePathname();
  const { temAcesso } = useAuth();
  const [mobileAberto, setMobileAberto] = useState(false);

  const itensVisiveis = NAV_ITEMS.filter(item => temAcesso(item.modulo));

  return (
    <nav id="navegacao-principal" className={styles.navbar} aria-label="Navegação principal">
      <div className={styles.inner}>
        <ul className={styles.lista} role="list">
          {itensVisiveis.map(item => {
            const ativo = pathname.startsWith(item.rota);
            const Icone = item.icon;
            return (
              <li key={item.rota}>
                <Link
                  href={item.rota}
                  className={`${styles.link} ${ativo ? styles.linkAtivo : ''}`}
                  aria-current={ativo ? 'page' : undefined}
                >
                  <Icone size={15} aria-hidden="true" className={styles.linkIcone} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className={styles.hamburger}
          onClick={() => setMobileAberto(v => !v)}
          aria-expanded={mobileAberto}
          aria-controls="menu-mobile"
          aria-label={mobileAberto ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileAberto ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileAberto && (
        <div id="menu-mobile" className={styles.menuMobile}>
          <ul role="list">
            {itensVisiveis.map(item => {
              const ativo = pathname.startsWith(item.rota);
              const Icone = item.icon;
              return (
                <li key={item.rota}>
                  <Link
                    href={item.rota}
                    className={`${styles.mobileLinkItem} ${ativo ? styles.mobileLinkAtivo : ''}`}
                    onClick={() => setMobileAberto(false)}
                    aria-current={ativo ? 'page' : undefined}
                  >
                    <Icone size={18} aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
