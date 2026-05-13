import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQProcedimentos from '@/components/FAQProcedimentos';

export default function PerguntasFrequentesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Perguntas Frequentes' }]} />
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <FAQProcedimentos />
      </div>
    </>
  );
}
