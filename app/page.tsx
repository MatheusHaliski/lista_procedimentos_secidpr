'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { limparSessao } from '@/utils/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    limparSessao();
    router.replace('/login');
    router.refresh();
  }, [router]);

  return null;
}
