/* Utilitários de formatação */

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarData(data: string): string {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

export function formatarDataHora(dataHora: string): string {
  const d = new Date(dataHora);
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function diasRestantes(prazo: string): number {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataPrazo = new Date(prazo + 'T00:00:00');
  const diff = dataPrazo.getTime() - hoje.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function calcularStatusPrazo(prazo: string): 'no_prazo' | 'atencao' | 'atrasado' {
  const dias = diasRestantes(prazo);
  if (dias < 0) return 'atrasado';
  if (dias <= 2) return 'atencao';
  return 'no_prazo';
}

export function formatarPorcentagem(valor: number): string {
  return `${valor}%`;
}

export function truncarTexto(texto: string, limite: number): string {
  if (texto.length <= limite) return texto;
  return texto.slice(0, limite).trim() + '…';
}
