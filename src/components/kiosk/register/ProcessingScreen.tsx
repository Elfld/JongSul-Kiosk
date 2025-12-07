'use client';

import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProcessingScreen() {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[6vmin]">
        <h1 className="text-[max(36px,14vmin)] font-bold text-[#2c3e50]">
          분석 중
        </h1>
        <p className="text-[max(22px,8vmin)] text-[#6c757d]">
          분실물을 인식하고 있어요...
        </p>
        <div className="mt-[4vmin]">
          <LoadingSpinner />
        </div>
      </div>
    </KioskLayout>
  );
}
