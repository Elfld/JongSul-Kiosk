'use client';

import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProcessingScreen() {
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
