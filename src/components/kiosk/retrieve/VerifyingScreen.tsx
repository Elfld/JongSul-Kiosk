'use client';

import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function VerifyingScreen() {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-[60px] font-bold text-[#2c3e50]">
          코드 확인 중
        </h1>
        <p className="text-[30px] text-[#6c757d]">
          잠시만 기다려주세요...
        </p>
        <div className="mt-8">
          <LoadingSpinner />
        </div>
      </div>
    </KioskLayout>
  );
}
