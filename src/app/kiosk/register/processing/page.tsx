'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';
import { mockAnalysis } from '@/lib/utils/kiosk';

export default function RegisterProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    async function analyze() {
      await mockAnalysis(); // 2초 대기
      router.push('/kiosk/register/confirm');
    }

    analyze();
  }, [router]);

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-6xl font-bold text-gray-800">
          분석 중
        </h1>
        <p className="text-3xl text-gray-600">
          분실물을 인식하고 있어요...
        </p>
        <LoadingSpinner />
      </div>
    </KioskLayout>
  );
}
