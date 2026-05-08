import { MACROFLUXOS } from '@/data/macrofluxos';
import Breadcrumb from '@/components/layout/Breadcrumb';
import MacrofluxosCliente from './MacrofluxosCliente';

export default function MacrofluxosPage() {
  return (
    <main id="conteudo-principal">
      <Breadcrumb items={[{ label: 'Macrofluxos' }]} />
      <MacrofluxosCliente macrofluxos={MACROFLUXOS} />
    </main>
  );
}
