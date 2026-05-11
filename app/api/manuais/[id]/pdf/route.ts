import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

const MANUAL_PDF_PATHS: Record<string, string> = {
  'manual-fiscal-obras': 'docprocedimentos/PROCEDIMENTO - FATURAS/MODELOS DE DOCUMENTOS/aTAREFA - SGPO 1 - FISCAL/EXEMPLO RVO - RELATORIO_EXECUCAO_MEDICAO_VISTORIA_OBRAS.pdf',
  'manual-gestao-convenios': 'docprocedimentos/PROCEDIMENTO - FATURAS/LEGISLACAO - RESOLUCAO/RESOLUCAO 011-2024 - SECID - GESTOR TECNICO-GESTOR ADMINISTRATIVO.pdf',
  'manual-analise-urbanistica': 'docprocedimentos/PROCEDIMENTO - FATURAS/FLUXO DO PROCESSO/SECID - FLUXO FATURA - CONTRATOS PRED_R03.pdf',
  'manual-reurb': 'docprocedimentos/PROCEDIMENTO - FATURAS/CADASTRO NO SGPO/4. PROCEDIMENTOS PARA CADASTRAMENTO DE FATURAS - REVISÃO 2024 - CORREÇÃO_Sugestão Silvia R03.pdf',
  'manual-sistema-workflow': 'docprocedimentos/PROCEDIMENTO - FATURAS/FLUXO DO PROCESSO/SECID - FLUXO FATURA - CONTRATOS PRED_R03.pdf',
};

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const arquivoRelativo = MANUAL_PDF_PATHS[id];

  if (!arquivoRelativo) {
    return NextResponse.json({ erro: 'Manual sem PDF associado.' }, { status: 404 });
  }

  const caminhoCompleto = path.join(process.cwd(), arquivoRelativo);

  try {
    const buffer = await readFile(caminhoCompleto);
    const nomeArquivo = path.basename(arquivoRelativo);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(nomeArquivo)}`,
        'Cache-Control': 'private, max-age=300',
      },
    });
  } catch {
    return NextResponse.json({ erro: 'Arquivo PDF não encontrado no servidor.' }, { status: 404 });
  }
}
