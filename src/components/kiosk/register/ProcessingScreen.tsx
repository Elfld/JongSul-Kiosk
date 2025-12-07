'use client';

import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProcessingScreen() {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[clamp(20px,3.5vmin,36px)]">
        <h1 className="text-[clamp(28px,6vmin,56px)] font-bold text-[#2c3e50] whitespace-nowrap">
          분석 중
        </h1>
        <p className="text-[clamp(16px,3.5vmin,32px)] text-[#6c757d] whitespace-nowrap">
          분실물을 인식하고 있어요...
        </p>
        <div className="mt-[clamp(16px,3vmin,32px)]">
          <LoadingSpinner />
        </div>
      </div>
    </KioskLayout>
  );
}
