'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './page.module.css';

export default function PerfilPage() {
  const { usuario, atualizarUsuario } = useAuth();
  const [nome, setNome] = useState(usuario?.nome ?? '');
  const [setor, setSetor] = useState(usuario?.setor ?? '');
  const [email, setEmail] = useState(usuario?.email ?? '');
  const [salvo, setSalvo] = useState(false);

  function salvar() {
    atualizarUsuario({ nome, setor, email });
    setSalvo(true);
  }

  return (
    <section className={styles.pagina}>
      <h1>Editar perfil</h1>
      <div className={styles.form}>
        <label>Nome<input value={nome} onChange={(e) => setNome(e.target.value)} /></label>
        <label>E-mail<input value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Setor<input value={setor} onChange={(e) => setSetor(e.target.value)} /></label>
        <button onClick={salvar}>Salvar alterações</button>
        {salvo && <p>Dados atualizados com sucesso.</p>}
      </div>
    </section>
  );
}
