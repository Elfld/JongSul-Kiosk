'use client';

import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function VerifyingScreen() {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-6xl font-bold text-gray-800">
          코드 확인 중
        </h1>
        <p className="text-3xl text-gray-600">
          잠시만 기다려주세요...
        </p>
        <LoadingSpinner />
      </div>
    </KioskLayout>
  );
}
