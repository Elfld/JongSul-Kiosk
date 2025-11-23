'use client';

import { KioskLayout, Card } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function VerifyingScreen() {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-4 max-w-[400px] mx-auto">
        <LoadingSpinner />
        <h1 className="text-[24px] font-bold text-[#2c3e50] text-center">
          코드 확인 중
        </h1>
        <p className="text-[16px] text-[#6c757d] text-center">
          잠시만 기다려주세요...
        </p>
      </Card>
    </KioskLayout>
  );
}
