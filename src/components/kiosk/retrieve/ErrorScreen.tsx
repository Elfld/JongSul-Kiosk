'use client';

import { KioskLayout, KioskButton, StatusIcon } from '@/components/kiosk';

interface ErrorScreenProps {
  onRetry: () => void;
}

export default function ErrorScreen({ onRetry }: ErrorScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-10">
        <StatusIcon type="warning" />

        <h1 className="text-[60px] font-bold text-[#2c3e50]">
          코드를 확인해주세요
        </h1>

        <p className="text-[24px] text-[#6c757d] text-center leading-relaxed">
          입력하신 코드를 확인할 수 없습니다
          <br />
          다시 입력해주세요
        </p>

        <KioskButton variant="warning" size="large" onClick={onRetry} className="w-[300px]">
          다시 시도
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
