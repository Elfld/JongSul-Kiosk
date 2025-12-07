'use client';

import { KioskLayout, Card } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function VerifyingScreen() {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[clamp(20px,3.5vmin,36px)]">
        <LoadingSpinner />
        <h1 className="text-[clamp(24px,5vmin,48px)] font-bold text-[#2c3e50] text-center whitespace-nowrap">
          코드 확인 중
        </h1>
        <p className="text-[clamp(16px,3.5vmin,32px)] text-[#6c757d] text-center whitespace-nowrap">
          잠시만 기다려주세요...
        </p>
      </Card>
    </KioskLayout>
  );
}
