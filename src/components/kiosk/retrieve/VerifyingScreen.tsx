'use client';

import { KioskLayout, Card } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function VerifyingScreen() {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[5vmin] w-full mx-auto">
        <LoadingSpinner />
        <h1 className="text-[max(28px,10vmin)] font-bold text-[#2c3e50] text-center">
          코드 확인 중
        </h1>
        <p className="text-[max(20px,7vmin)] text-[#6c757d] text-center">
          잠시만 기다려주세요...
        </p>
      </Card>
    </KioskLayout>
  );
}
