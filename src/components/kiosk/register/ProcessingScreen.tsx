'use client';

import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProcessingScreen() {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[3.5vmin]">
        <h1 className="text-[clamp(28px,7.7vmin,84px)] font-bold text-[#2c3e50]">
          분석 중
        </h1>
        <p className="text-[clamp(16px,4.2vmin,42px)] text-[#6c757d]">
          분실물을 인식하고 있어요...
        </p>
        <div className="mt-[2.8vmin]">
          <LoadingSpinner />
        </div>
      </div>
    </KioskLayout>
  );
}
