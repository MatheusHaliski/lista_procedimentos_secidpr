'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Usuario, Perfil } from '@/types';

const MODULOS_POR_PERFIL: Record<Perfil, string[]> = {
  ADMINISTRADOR: ['macrofluxos', 'workflows', 'manuais', 'cadernos', 'obras', 'convenios', 'admin'],
  GESTOR:        ['macrofluxos', 'workflows', 'manuais', 'cadernos', 'obras', 'convenios'],
  COORDENADOR:   ['macrofluxos', 'workflows', 'manuais', 'cadernos', 'obras', 'convenios'],
  TECNICO:       ['macrofluxos', 'workflows', 'manuais', 'cadernos', 'obras'],
  FISCAL:        ['macrofluxos', 'workflows', 'manuais', 'cadernos', 'obras'],
  CONSULTA:      ['macrofluxos', 'manuais', 'cadernos'],
};

// Usuário demo para desenvolvimento
const USUARIO_DEMO: Usuario = {
  id: 'u1',
  nome: 'Ana Silva',
  email: 'ana.silva@secid.pr.gov.br',
  perfil: 'COORDENADOR',
  setor: 'Superintendência de Convênios',
};

interface AuthState {
  usuario: Usuario | null;
  carregando: boolean;
}

type AuthAcao =
  | { type: 'LOGIN'; payload: Usuario }
  | { type: 'LOGOUT' }
  | { type: 'CARREGADO' };

function authReducer(state: AuthState, acao: AuthAcao): AuthState {
  switch (acao.type) {
    case 'LOGIN':
      return { usuario: acao.payload, carregando: false };
    case 'LOGOUT':
      return { usuario: null, carregando: false };
    case 'CARREGADO':
      return { ...state, carregando: false };
    default:
      return state;
  }
}

interface AuthContextValue {
  usuario: Usuario | null;
  carregando: boolean;
  login: (usuario: Usuario) => void;
  logout: () => void;
  temAcesso: (modulo: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { usuario: USUARIO_DEMO, carregando: false });

  useEffect(() => {
    dispatch({ type: 'CARREGADO' });
  }, []);

  function login(usuario: Usuario) {
    dispatch({ type: 'LOGIN', payload: usuario });
  }

  function logout() {
    dispatch({ type: 'LOGOUT' });
  }

  function temAcesso(modulo: string): boolean {
    if (!state.usuario) return false;
    return MODULOS_POR_PERFIL[state.usuario.perfil].includes(modulo);
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, temAcesso }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}

export { MODULOS_POR_PERFIL };
