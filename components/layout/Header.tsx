'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Modal from '@/components/ui/Modal';
import styles from './Header.module.css';

export default function Header() {
  const { usuario, logout, atualizarUsuario } = useAuth();
  const router = useRouter();
  const [busca, setBusca] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalBoasVindas, setModalBoasVindas] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('perfil_preenchido') !== '1';
  });
  const [nome, setNome] = useState(usuario?.nome ?? '');
  const [setor, setSetor] = useState(usuario?.setor ?? '');

  function normalizarTexto(valor: string) {
    return valor
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();
  }

  function navegarPorBusca(termoBusca: string) {
    const termo = normalizarTexto(termoBusca);
    if (!termo) return;

    const atalhos: Array<{ termos: string[]; rota: string }> = [
      { termos: ['macro', 'macrofluxo', 'macrofluxos'], rota: '/macrofluxos' },
      { termos: ['procedimento', 'procedimentos'], rota: '/workflows' },
      { termos: ['manual', 'manuais', 'checklist', 'checklists'], rota: '/manuais' },
      { termos: ['caderno', 'cadernos'], rota: '/cadernos' },
      { termos: ['obra', 'obras', 'painel'], rota: '/obras' },
      { termos: ['convenio', 'convenios', 'convênio', 'convênios'], rota: '/convenios' },
      { termos: ['faq', 'pergunta', 'perguntas', 'frequentes'], rota: '/perguntas-frequentes' },
    ];

    const alvo = atalhos.find(({ termos }) => termos.some((item) => termo.includes(item)));
    router.push(alvo?.rota ?? `/macrofluxos?q=${encodeURIComponent(termoBusca.trim())}`);
  }

  function salvarPrimeiroAcesso() {
    atualizarUsuario({ nome, setor });
    localStorage.setItem('perfil_preenchido', '1');
    setModalBoasVindas(false);
  }

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
          <form
            className={styles.buscaWrapper}
            id="busca-global"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              navegarPorBusca(busca);
            }}
          >
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
          </form>

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
                  <button
                    className={styles.dropdownItem}
                    role="menuitem"
                    onClick={() => {
                      setMenuAberto(false);
                      router.push('/perfil');
                    }}
                  >
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

      <Modal
        aberto={modalBoasVindas}
        onFechar={() => {}}
        titulo="Bem-vindo ao Portal SECID-PR"
        rodape={<button className={styles.salvarBoasVindas} onClick={salvarPrimeiroAcesso}>Salvar dados</button>}
      >
        <p className={styles.boasVindasTexto}>Para continuar no primeiro acesso, confirme seus dados de perfil.</p>
        <div className={styles.campo}>
          <label htmlFor="nome-boas-vindas">Nome</label>
          <input id="nome-boas-vindas" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label htmlFor="setor-boas-vindas">Setor</label>
          <input id="setor-boas-vindas" value={setor} onChange={(e) => setSetor(e.target.value)} />
        </div>
      </Modal>
    </header>
  );
}
