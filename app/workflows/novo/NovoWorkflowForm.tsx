'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { TIPOS_WORKFLOW } from '@/data/workflows';
import { OBRAS } from '@/data/obras';
import type { TipoWorkflow } from '@/types';
import Alert from '@/components/ui/Alert';
import { formatarData } from '@/utils/formatters';
import { criarWorkflow } from '@/utils/workflowsStore';
import { useAuth } from '@/contexts/AuthContext';
import styles from './page.module.css';

const MAPEAMENTO_MACROFLUXO_TIPO: Record<string, string> = {
  'conv-analise-proposta': 'analise-proposta-convenio',
  'conv-liberacao-parcela': 'liberacao-parcela',
  'conv-prestacao-contas': 'prestacao-contas-tecnica',
  'obras-vistoria-andamento': 'parecer-vistoria-andamento',
  'obras-recebimento-definitivo': 'parecer-recebimento-obra',
  'obras-aditivo': 'parecer-aditivo',
  'urb-plano-diretor': 'analise-plano-diretor',
  'urb-reurb': 'analise-reurb',
  'adm-parecer-tecnico': 'parecer-analise-projeto',
  'adm-certidao-tecnica': 'parecer-simplificado',
};

function calcularPrazoPrevistoStr(prazoDias: number): string {
  const hoje = new Date();
  const prazo = new Date(hoje);
  prazo.setDate(hoje.getDate() + prazoDias);
  return prazo.toISOString().split('T')[0];
}

function agruparPorArea(tipos: TipoWorkflow[]): Record<string, TipoWorkflow[]> {
  return tipos.reduce<Record<string, TipoWorkflow[]>>((acc, t) => {
    if (!acc[t.area]) acc[t.area] = [];
    acc[t.area].push(t);
    return acc;
  }, {});
}

export default function NovoWorkflowForm() {
  const { usuario } = useAuth();
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get('tipo') ?? '';
  const obraIdParam = searchParams.get('obraId') ?? '';

  const tipoInicial = useMemo(() => {
    if (!tipoParam) return '';
    const direto = TIPOS_WORKFLOW.find((t) => t.id === tipoParam);
    if (direto) return direto.id;
    const porMacrofluxo = MAPEAMENTO_MACROFLUXO_TIPO[tipoParam];
    if (porMacrofluxo) return porMacrofluxo;
    const parcial = TIPOS_WORKFLOW.find((t) =>
      tipoParam.includes(t.id.split('-')[0])
    );
    return parcial?.id ?? '';
  }, [tipoParam]);

  const tituloInicial = useMemo(() => {
    if (!obraIdParam) return '';
    const obra = OBRAS.find((o) => o.id === obraIdParam);
    return obra ? obra.titulo : '';
  }, [obraIdParam]);

  const [tipoSelecionado, setTipoSelecionado] = useState(tipoInicial);
  const [titulo, setTitulo] = useState(tituloInicial);
  const [submetido, setSubmetido] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  const tipoObj = TIPOS_WORKFLOW.find((t) => t.id === tipoSelecionado);
  const prazoStr = tipoObj ? calcularPrazoPrevistoStr(tipoObj.prazoDias) : null;
  const grupos = useMemo(() => agruparPorArea(TIPOS_WORKFLOW), []);

  function validar(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!tipoSelecionado) e.tipo = 'Selecione o tipo de procedimento.';
    if (!titulo.trim()) e.titulo = 'Informe o título do procedimento.';
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validar();
    if (Object.keys(e).length > 0) {
      setErros(e);
      return;
    }
    setErros({});
    if (tipoObj && usuario) {
      criarWorkflow({
        titulo,
        tipo: tipoObj.titulo,
        tipoId: tipoObj.id,
        prazoDias: tipoObj.prazoDias,
        iniciadoPorId: usuario.id,
        iniciadoPorNome: usuario.nome,
      });
    }
    setSubmetido(true);
  }

  if (submetido && tipoObj) {
    return (
      <section className={styles.pagina}>
        <Alert variante="sucesso" titulo="Procedimento aberto com sucesso!">
          O procedimento <strong>&ldquo;{titulo}&rdquo;</strong> do tipo{' '}
          <strong>{tipoObj.titulo}</strong> foi aberto. Prazo previsto:{' '}
          <strong>{prazoStr ? formatarData(prazoStr) : '—'}</strong>.
        </Alert>
        <div className={styles.acoesSucesso}>
          <a href="/workflows" className={styles.btnVoltar}>
            Ver todos os procedimentos
          </a>
          <button
            type="button"
            className={styles.btnNovo}
            onClick={() => {
              setSubmetido(false);
              setTitulo('');
              setTipoSelecionado('');
            }}
          >
            Abrir outro procedimento
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.pagina}>
      <div className={styles.cabecalho}>
        <h1 className={styles.titulo}>Novo procedimento</h1>
        <p className={styles.subtitulo}>
          Preencha os dados para abertura de um novo procedimento.
        </p>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulário de abertura de procedimento"
      >
        <div className={styles.campo}>
          <label htmlFor="tipo-proc" className={styles.label}>
            Tipo de procedimento{' '}
            <span className={styles.obrigatorio} aria-hidden="true">*</span>
          </label>
          <select
            id="tipo-proc"
            className={`${styles.select} ${erros.tipo ? styles.inputErro : ''}`}
            value={tipoSelecionado}
            onChange={(e) => setTipoSelecionado(e.target.value)}
            aria-required="true"
            aria-describedby={erros.tipo ? 'erro-tipo' : undefined}
          >
            <option value="">— Selecione um tipo —</option>
            {Object.entries(grupos).map(([area, tipos]) => (
              <optgroup key={area} label={area}>
                {tipos.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.titulo}
                    {t.prioritario ? ' ⚡' : ''}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {erros.tipo && (
            <span id="erro-tipo" className={styles.msgErro} role="alert">
              {erros.tipo}
            </span>
          )}
        </div>

        <div className={styles.campo}>
          <label htmlFor="titulo-proc" className={styles.label}>
            Título{' '}
            <span className={styles.obrigatorio} aria-hidden="true">*</span>
          </label>
          <input
            id="titulo-proc"
            type="text"
            className={`${styles.input} ${erros.titulo ? styles.inputErro : ''}`}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex.: Análise de proposta — Município de Curitiba"
            aria-required="true"
            aria-describedby={erros.titulo ? 'erro-titulo' : undefined}
            maxLength={200}
          />
          {erros.titulo && (
            <span id="erro-titulo" className={styles.msgErro} role="alert">
              {erros.titulo}
            </span>
          )}
        </div>

        {tipoObj && prazoStr && (
          <div className={styles.infoPrazo} role="status" aria-live="polite">
            <span className={styles.infoPrazoIcone} aria-hidden="true">◷</span>
            <span>
              Prazo previsto:{' '}
              <strong>{formatarData(prazoStr)}</strong>
              {' '}({tipoObj.prazoDias} dias úteis, {tipoObj.etapas} etapas)
            </span>
          </div>
        )}

        <div className={styles.acoes}>
          <button
            type="submit"
            className={styles.btnAbrir}
            aria-label="Abrir procedimento"
          >
            Abrir procedimento
          </button>
          <a href="/workflows" className={styles.btnCancelar}>
            Cancelar
          </a>
        </div>
      </form>
    </section>
  );
}
