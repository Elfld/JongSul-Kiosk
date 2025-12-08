'use client';

import { KioskLayout, Card } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function VerifyingScreen() {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[2vmin] max-w-[clamp(320px,55vmin,850px)] mx-auto">
        <LoadingSpinner />
        <h1 className="text-[clamp(20px,3.5vmin,52px)] font-bold text-[#2c3e50] text-center">
          코드 확인 중
        </h1>
        <p className="text-[clamp(14px,2.5vmin,38px)] text-[#6c757d] text-center">
          잠시만 기다려주세요...
        </p>
      </Card>
    </KioskLayout>
  );
}
