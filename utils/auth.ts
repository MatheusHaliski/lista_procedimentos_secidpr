import type { Usuario } from '@/types';

const TOKEN_COOKIE = 'secid_token';
const USUARIO_STORAGE = 'secid_usuario';
const CONTAS_STORAGE = 'secid_contas';
const DOMINIO_EMAIL = '@secid.pr.gov.br';

export interface ContaSalva {
  id: string;
  nome: string;
  email: string;
  senha: string;
  setor: string;
}

export function emailSecidValido(email: string): boolean {
  return email.trim().toLowerCase().endsWith(DOMINIO_EMAIL);
}

export function gerarToken(email: string): string {
  return btoa(`${email}:${Date.now()}`);
}

export function salvarToken(token: string): void {
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; SameSite=Lax`;
}

export function removerToken(): void {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function salvarUsuario(usuario: Usuario): void {
  localStorage.setItem(USUARIO_STORAGE, JSON.stringify(usuario));
}

export function carregarUsuario(): Usuario | null {
  const bruto = localStorage.getItem(USUARIO_STORAGE);
  if (!bruto) return null;
  try {
    return JSON.parse(bruto) as Usuario;
  } catch {
    return null;
  }
}

export function limparSessao(): void {
  removerToken();
  localStorage.removeItem(USUARIO_STORAGE);
}

export function carregarContas(): ContaSalva[] {
  const bruto = localStorage.getItem(CONTAS_STORAGE);
  if (!bruto) return [];
  try {
    return JSON.parse(bruto) as ContaSalva[];
  } catch {
    return [];
  }
}

export function salvarContas(contas: ContaSalva[]): void {
  localStorage.setItem(CONTAS_STORAGE, JSON.stringify(contas));
}

export function contaParaUsuario(conta: ContaSalva): Usuario {
  return {
    id: conta.id,
    nome: conta.nome,
    email: conta.email,
    setor: conta.setor,
    perfil: 'CONSULTA',
  };
}
