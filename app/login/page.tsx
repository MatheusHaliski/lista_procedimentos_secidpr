'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { carregarContas, contaParaUsuario, emailSecidValido, gerarToken } from '@/utils/auth';
import styles from './page.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function entrar(e: FormEvent) {
    e.preventDefault();
    setErro('');
    if (!emailSecidValido(email)) return setErro('Use um e-mail institucional @secid.pr.gov.br.');

    const conta = carregarContas().find((c) => c.email.toLowerCase() === email.toLowerCase() && c.senha === senha);
    if (!conta) return setErro('Credenciais inválidas.');

    login(contaParaUsuario(conta), gerarToken(conta.email));
    router.push('/macrofluxos');
  }

  return (
    <section className={styles.wrapper}>
      <form className={styles.form} onSubmit={entrar}>
        <h1>Login</h1>
        <input type="email" placeholder="Email institucional" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        {erro && <p className={styles.erro}>{erro}</p>}
        <button type="submit">Entrar</button>
        <nav className={styles.links}>
          <Link href="/criar-conta">Primeiro acesso? Criar conta</Link>
          <Link href="/esqueceu-senha">Esqueceu sua senha?</Link>
        </nav>
      </form>
    </section>
  );
}
