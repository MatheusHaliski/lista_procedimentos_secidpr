import { Suspense } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import NovoWorkflowForm from './NovoWorkflowForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function NovoWorkflowPage() {
  return (
    <main id="conteudo-principal">
      <Breadcrumb
        items={[
          { label: 'Procedimentos', href: '/workflows' },
          { label: 'Novo procedimento' },
        ]}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <NovoWorkflowForm />
      </Suspense>
    </main>
  );
}
