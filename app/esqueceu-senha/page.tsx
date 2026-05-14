'use client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { carregarContas, emailSecidValido } from '@/utils/auth';
import styles from '@/app/auth.module.css';

export default function EsqueceuSenhaPage() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [ok, setOk] = useState(false);
  function enviar(e: FormEvent) { e.preventDefault(); if (!emailSecidValido(email)) { setOk(false); return setMensagem('Informe um e-mail @secid.pr.gov.br válido.'); } const existe = carregarContas().some((c) => c.email.toLowerCase() === email.toLowerCase()); setOk(existe); setMensagem(existe ? `E-mail de redefinição enviado para ${email}.` : 'Se o e-mail existir, enviaremos as instruções de redefinição.'); }
  return <section className={styles.authBg}><form className={styles.card} onSubmit={enviar}><h1 className={styles.title}>Esqueceu sua senha?</h1><p className={styles.subtitle}>Receba um e-mail para redefinição.</p><div className={styles.form}><input type="email" placeholder="Email institucional" value={email} onChange={(e)=>setEmail(e.target.value)} required/><button className={styles.button} type="submit">Enviar e-mail de redefinição</button>{mensagem && <p className={ok ? styles.success : styles.error}>{mensagem}</p>}</div><p className={styles.links}><Link href="/login">Voltar ao login</Link></p></form></section>;
}
