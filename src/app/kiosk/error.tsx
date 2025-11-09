'use client';

import { useEffect } from 'react';
import { KioskLayout, KioskButton } from '@/components/kiosk';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-5xl font-bold text-gray-800">
          오류가 발생했습니다
        </h1>
        <p className="text-2xl text-gray-600 text-center">
          잠시 후 다시 시도해주세요
        </p>
        <KioskButton variant="primary" onClick={reset}>
          다시 시도
        </KioskButton>
        <KioskButton
          variant="secondary"
          onClick={() => (window.location.href = '/kiosk')}
        >
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
