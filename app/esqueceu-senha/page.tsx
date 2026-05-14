'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { carregarContas, emailSecidValido } from '@/utils/auth';

export default function EsqueceuSenhaPage() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (!emailSecidValido(email)) return setMensagem('Informe um e-mail @secid.pr.gov.br válido.');
    const existe = carregarContas().some((c) => c.email.toLowerCase() === email.toLowerCase());
    setMensagem(existe ? `E-mail de redefinição enviado para ${email}.` : 'Se o e-mail existir, enviaremos as instruções de redefinição.');
  }

  return <section><h1>Esqueceu sua senha?</h1><form onSubmit={enviar}><input type="email" placeholder="Email institucional" value={email} onChange={(e)=>setEmail(e.target.value)} required/><button type="submit">Enviar e-mail de redefinição</button></form>{mensagem && <p>{mensagem}</p>}<p><Link href="/login">Voltar ao login</Link></p></section>;
}
