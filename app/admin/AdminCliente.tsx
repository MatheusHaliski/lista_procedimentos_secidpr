'use client';

import { useAuth } from '@/contexts/AuthContext';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import { formatarDataHora } from '@/utils/formatters';
import { WORKFLOWS_MOCK } from '@/data/workflows';
import type { AuditoriaRegistro } from '@/types';
import {
  GitBranch,
  BookOpen,
  CheckSquare,
  FileText,
  Users,
  BarChart3,
} from 'lucide-react';
import { useState } from 'react';
import styles from './page.module.css';

interface CardGestaoItem {
  id: string;
  titulo: string;
  descricao: string;
  Icone: React.ComponentType<{ size?: number; className?: string }>;
}

const CARDS_GESTAO: CardGestaoItem[] = [
  {
    id: 'macrofluxos',
    titulo: 'Gestão de Macrofluxos',
    descricao: 'Criar, editar, versionar e publicar macrofluxos',
    Icone: GitBranch,
  },
  {
    id: 'manuais',
    titulo: 'Gestão de Manuais',
    descricao: 'Upload de PDF, edição por seções, controle de versão',
    Icone: BookOpen,
  },
  {
    id: 'checklists',
    titulo: 'Gestão de Checklists',
    descricao: 'Criar e editar itens com obrigatoriedade',
    Icone: CheckSquare,
  },
  {
    id: 'cadernos',
    titulo: 'Gestão de Cadernos',
    descricao: 'Editor por capítulo e publicação',
    Icone: FileText,
  },
  {
    id: 'usuarios',
    titulo: 'Gestão de Usuários',
    descricao: 'Associar perfis de acesso por servidor',
    Icone: Users,
  },
  {
    id: 'relatorios',
    titulo: 'Relatórios e Auditoria',
    descricao: 'Relatórios de uso e log de auditoria do sistema',
    Icone: BarChart3,
  },
];

function coletarAuditoria(): (AuditoriaRegistro & { workflowNumero: string })[] {
  const todos = WORKFLOWS_MOCK.flatMap((wf) =>
    wf.auditoria.map((a) => ({ ...a, workflowNumero: wf.numero }))
  );
  todos.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  return todos.slice(0, 20);
}

const LOG_AUDITORIA = coletarAuditoria();

export default function AdminCliente() {
  const { usuario } = useAuth();
  const [alertaModulo, setAlertaModulo] = useState<string | null>(null);

  if (!usuario || usuario.perfil !== 'ADMINISTRADOR') {
    return (
      <main id="conteudo-principal">
        <Breadcrumb items={[{ label: 'Administração' }]} />
        <section className={styles.pagina}>
          <div className={styles.acessoNegado} role="alert">
            <strong>Acesso restrito.</strong> Você não tem permissão para acessar o módulo de administração. Esta área é exclusiva para perfil Administrador.
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="conteudo-principal">
      <Breadcrumb items={[{ label: 'Administração' }]} />

      <section className={styles.pagina}>
        <h1 className={styles.titulo}>Administração</h1>

        {alertaModulo && (
          <div className={styles.alertaInfo} role="alert" aria-live="polite">
            <strong>Informação:</strong> Funcionalidade disponível na próxima versão.
          </div>
        )}

        <div className={styles.gridCards} role="region" aria-label="Módulos de gestão">
          {CARDS_GESTAO.map(({ id, titulo, descricao, Icone }) => (
            <div key={id} className={styles.cardGestao}>
              <div className={styles.cardIcone} aria-hidden="true">
                <Icone size={32} />
              </div>
              <h2 className={styles.cardTitulo}>{titulo}</h2>
              <p className={styles.cardDescricao}>{descricao}</p>
              <Button
                variante="fantasma"
                tamanho="sm"
                onClick={() => setAlertaModulo(id)}
                aria-label={`Acessar ${titulo}`}
              >
                Acessar
              </Button>
            </div>
          ))}
        </div>

        <section className={styles.secaoAuditoria} aria-labelledby="titulo-auditoria">
          <h2 id="titulo-auditoria" className={styles.secaoTitulo}>
            Log de auditoria — últimas atividades
          </h2>
          <div className={styles.tabelaWrapper}>
            <table className={styles.tabela} aria-label="Log de auditoria do sistema">
              <thead>
                <tr>
                  <th scope="col" className={styles.th}>Data/Hora</th>
                  <th scope="col" className={styles.th}>Usuário</th>
                  <th scope="col" className={styles.th}>Procedimento</th>
                  <th scope="col" className={styles.th}>Ação</th>
                  <th scope="col" className={styles.th}>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {LOG_AUDITORIA.map((reg) => (
                  <tr key={reg.id + reg.workflowNumero} className={styles.tr}>
                    <td className={`${styles.td} ${styles.tdMono}`}>
                      {formatarDataHora(reg.timestamp)}
                    </td>
                    <td className={styles.td}>{reg.usuarioNome}</td>
                    <td className={styles.td}>
                      <span className={styles.numero}>{reg.workflowNumero}</span>
                    </td>
                    <td className={styles.td}>{reg.acao}</td>
                    <td className={`${styles.td} ${styles.tdDetalhes}`}>
                      {reg.detalhes ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
