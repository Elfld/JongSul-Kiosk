'use client';

import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProcessingScreen() {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-[60px] font-bold text-[#2c3e50]">
          분석 중
        </h1>
        <p className="text-[30px] text-[#6c757d]">
          분실물을 인식하고 있어요...
        </p>
        <div className="mt-8">
          <LoadingSpinner />
        </div>
      </div>
    </KioskLayout>
  );
}
