'use client';

import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProcessingScreen() {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[max(20px,2vmin)]">
        <h1 className="text-[max(32px,3.7vmin)] font-bold text-[#2c3e50] whitespace-nowrap">
          분석 중
        </h1>
        <p className="text-[max(20px,2.2vmin)] text-[#6c757d] whitespace-nowrap">
          분실물을 인식하고 있어요...
        </p>
        <div className="mt-[max(16px,2vmin)]">
          <LoadingSpinner />
        </div>
      </div>
    </KioskLayout>
  );
}
