'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

interface ModalProps {
  aberto: boolean;
  onFechar: () => void;
  titulo: string;
  children: React.ReactNode;
  tamanho?: 'sm' | 'md' | 'lg';
  rodape?: React.ReactNode;
}

export default function Modal({ aberto, onFechar, titulo, children, tamanho = 'md', rodape }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const prev = document.activeElement as HTMLElement;
    panelRef.current?.focus();
    return () => { prev?.focus(); };
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onFechar();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [aberto, onFechar]);

  if (!aberto) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-titulo" onClick={e => { if (e.target === e.currentTarget) onFechar(); }}>
      <div ref={panelRef} tabIndex={-1} className={`${styles.painel} ${styles[tamanho]}`}>
        <div className={styles.cabecalho}>
          <h2 id="modal-titulo" className={styles.titulo}>{titulo}</h2>
          <button className={styles.fechar} onClick={onFechar} aria-label="Fechar modal">
            <X size={18} />
          </button>
        </div>
        <div className={styles.corpo}>{children}</div>
        {rodape && <div className={styles.rodape}>{rodape}</div>}
      </div>
    </div>
  );
}
