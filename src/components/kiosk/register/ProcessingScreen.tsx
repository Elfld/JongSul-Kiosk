'use client';

import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProcessingScreen() {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[2.5vmin]">
        <h1 className="text-[clamp(28px,5.5vmin,85px)] font-bold text-[#2c3e50]">
          분석 중
        </h1>
        <p className="text-[clamp(16px,3vmin,42px)] text-[#6c757d]">
          분실물을 인식하고 있어요...
        </p>
        <div className="mt-[2vmin]">
          <LoadingSpinner />
        </div>
      </div>
    </KioskLayout>
  );
}
