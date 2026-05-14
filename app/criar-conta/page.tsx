'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { carregarContas, emailSecidValido, salvarContas } from '@/utils/auth';

export default function CriarContaPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function criarConta(e: FormEvent) {
    e.preventDefault();
    setErro('');
    if (!emailSecidValido(email)) return setErro('Apenas e-mail @secid.pr.gov.br é permitido.');
    const contas = carregarContas();
    if (contas.some((c) => c.email.toLowerCase() === email.toLowerCase())) return setErro('Esta conta já existe.');
    contas.push({ id: crypto.randomUUID(), nome, setor, email: email.toLowerCase(), senha });
    salvarContas(contas);
    router.push('/login');
  }

  return <section><h1>Criar conta</h1><form onSubmit={criarConta}><input placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)} required/><input placeholder="Setor" value={setor} onChange={(e)=>setSetor(e.target.value)} required/><input type="email" placeholder="Email institucional" value={email} onChange={(e)=>setEmail(e.target.value)} required/><input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} required/>{erro && <p>{erro}</p>}<button type="submit">Criar conta</button></form><p><Link href="/login">Voltar ao login</Link></p></section>;
}
