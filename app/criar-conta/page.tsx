'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { carregarContas, emailSecidValido, salvarContas } from '@/utils/auth';
import styles from '@/app/auth.module.css';

export default function CriarContaPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function criarConta(e: FormEvent) { e.preventDefault(); setErro(''); if (!emailSecidValido(email)) return setErro('Apenas e-mail @secid.pr.gov.br é permitido.'); const contas = carregarContas(); if (contas.some((c) => c.email.toLowerCase() === email.toLowerCase())) return setErro('Esta conta já existe.'); contas.push({ id: crypto.randomUUID(), nome, setor, email: email.toLowerCase(), senha }); salvarContas(contas); router.replace('/login'); }

  return <section className={styles.authBg}><form className={styles.card} onSubmit={criarConta}><h1 className={styles.title}>Criar conta</h1><p className={styles.subtitle}>Primeiro acesso ao portal SECID.</p><div className={styles.form}><input placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)} required/><input placeholder="Setor" value={setor} onChange={(e)=>setSetor(e.target.value)} required/><input type="email" placeholder="Email institucional" value={email} onChange={(e)=>setEmail(e.target.value)} required/><input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} required/>{erro && <p className={styles.error}>{erro}</p>}<button className={styles.button} type="submit">Criar conta</button></div><p className={styles.links}><Link href="/login">Voltar ao login</Link></p></form></section>;
}
