'use client';

import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProcessingScreen() {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[3vh]">
        <h1 className="text-[clamp(48px,6vh,80px)] font-bold text-[#2c3e50]">
          분석 중
        </h1>
        <p className="text-[clamp(28px,3.5vh,44px)] text-[#6c757d]">
          분실물을 인식하고 있어요...
        </p>
        <div className="mt-[3vh]">
          <LoadingSpinner />
        </div>
      </div>
    </KioskLayout>
  );
}
