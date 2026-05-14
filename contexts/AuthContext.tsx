'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Usuario, Perfil } from '@/types';
import { carregarUsuario, limparSessao, salvarToken, salvarUsuario } from '@/utils/auth';

const MODULOS_POR_PERFIL: Record<Perfil, string[]> = {
  ADMINISTRADOR: ['macrofluxos', 'workflows', 'manuais', 'cadernos', 'obras', 'convenios', 'perguntas-frequentes', 'admin'],
  GESTOR:        ['macrofluxos', 'workflows', 'manuais', 'cadernos', 'obras', 'convenios', 'perguntas-frequentes'],
  COORDENADOR:   ['macrofluxos', 'workflows', 'manuais', 'cadernos', 'obras', 'convenios', 'perguntas-frequentes'],
  TECNICO:       ['macrofluxos', 'workflows', 'manuais', 'cadernos', 'obras', 'perguntas-frequentes'],
  FISCAL:        ['macrofluxos', 'workflows', 'manuais', 'cadernos', 'obras', 'perguntas-frequentes'],
  CONSULTA:      ['macrofluxos', 'workflows', 'manuais', 'cadernos', 'obras', 'perguntas-frequentes'],
};

interface AuthState {
  usuario: Usuario | null;
  carregando: boolean;
}

type AuthAcao =
  | { type: 'LOGIN'; payload: Usuario }
  | { type: 'LOGOUT' }
  | { type: 'CARREGADO'; payload: Usuario | null };

function authReducer(state: AuthState, acao: AuthAcao): AuthState {
  switch (acao.type) {
    case 'LOGIN':
      return { usuario: acao.payload, carregando: false };
    case 'LOGOUT':
      return { usuario: null, carregando: false };
    case 'CARREGADO':
      return { usuario: acao.payload, carregando: false };
    default:
      return state;
  }
}

interface AuthContextValue {
  usuario: Usuario | null;
  carregando: boolean;
  login: (usuario: Usuario, token: string) => void;
  logout: () => void;
  atualizarUsuario: (dados: Partial<Usuario>) => void;
  temAcesso: (modulo: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { usuario: null, carregando: true });

  useEffect(() => {
    dispatch({ type: 'CARREGADO', payload: carregarUsuario() });
  }, []);

  function login(usuario: Usuario, token: string) {
    salvarToken(token);
    salvarUsuario(usuario);
    dispatch({ type: 'LOGIN', payload: usuario });
  }

  function logout() {
    limparSessao();
    dispatch({ type: 'LOGOUT' });
  }

  function atualizarUsuario(dados: Partial<Usuario>) {
    if (!state.usuario) return;
    const atualizado = { ...state.usuario, ...dados };
    salvarUsuario(atualizado);
    dispatch({ type: 'LOGIN', payload: atualizado });
  }

  function temAcesso(modulo: string): boolean {
    if (!state.usuario) return false;
    return MODULOS_POR_PERFIL[state.usuario.perfil].includes(modulo);
  }

  return <AuthContext.Provider value={{ ...state, login, logout, atualizarUsuario, temAcesso }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}

export { MODULOS_POR_PERFIL };
