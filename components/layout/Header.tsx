'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Search, User, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { usuario, logout } = useAuth();
  const [busca, setBusca] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        <Link href="/macrofluxos" className={styles.marca} aria-label="Portal SAP SECID — página inicial">
          <div className={styles.brasaoPlaceholder}>
            <Image
              src="/govpr.jpg"
              alt="Governo do Estado do Paraná"
              width={40}
              height={40}
              priority
            />
          </div>
          <div className={styles.marcaTexto}>
            <span className={styles.marcaNome}>Secretaria de Estado das Cidades</span>
            <span className={styles.marcaSubtitulo}>SECID-PR — Portal de Gestão por Processos</span>
          </div>
        </Link>

        <div className={styles.acoes}>
          <div className={styles.buscaWrapper} id="busca-global" role="search">
            <label htmlFor="busca-header" className={styles.buscaLabel}>Busca global</label>
            <div className={styles.buscaInputWrapper}>
              <Search size={16} className={styles.buscaIcone} aria-hidden="true" />
              <input
                id="busca-header"
                type="search"
                placeholder="Buscar no portal…"
                value={busca}
                onChange={e => setBusca(e.target.value)}
                className={styles.buscaInput}
                aria-label="Campo de busca global"
              />
            </div>
          </div>

          {usuario && (
            <div className={styles.usuarioWrapper}>
              <button
                className={styles.usuarioBtn}
                onClick={() => setMenuAberto(v => !v)}
                aria-expanded={menuAberto}
                aria-haspopup="true"
                aria-label={`Menu do usuário: ${usuario.nome}`}
              >
                <div className={styles.avatar} aria-hidden="true">
                  <User size={16} />
                </div>
                <div className={styles.usuarioInfo}>
                  <span className={styles.usuarioNome}>{usuario.nome}</span>
                  <span className={styles.usuarioPerfil}>{usuario.perfil}</span>
                </div>
                <ChevronDown size={14} className={menuAberto ? styles.chevronAberto : ''} aria-hidden="true" />
              </button>

              {menuAberto && (
                <div className={styles.dropdown} role="menu" aria-label="Opções do usuário">
                  <button className={styles.dropdownItem} role="menuitem">
                    <Settings size={14} aria-hidden="true" />
                    Configurações
                  </button>
                  <hr className={styles.dropdownDivider} />
                  <button className={styles.dropdownItem} onClick={logout} role="menuitem">
                    <LogOut size={14} aria-hidden="true" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
