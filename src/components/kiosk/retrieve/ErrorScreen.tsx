'use client';

import { KioskLayout, KioskButton, StatusIcon, Card } from '@/components/kiosk';

interface ErrorScreenProps {
  onRetry: () => void;
  errorMessage?: string | null;
}

export default function ErrorScreen({ onRetry, errorMessage }: ErrorScreenProps) {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[max(20px,2vmin)]">
        <StatusIcon type="warning" />

        <h1 className="text-[max(28px,3vmin)] font-bold text-[#2c3e50] text-center whitespace-nowrap">
          코드를 확인해주세요
        </h1>

        <p className="text-[max(20px,2.2vmin)] text-[#6c757d] text-center">
          입력하신 코드를 확인할 수 없습니다<br />다시 입력해주세요
        </p>

        {errorMessage && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-[max(12px,1.2vmin)] text-red-600 text-center font-mono break-all">
              {errorMessage}
            </p>
          </div>
        )}

        <KioskButton variant="dark" size="medium" onClick={onRetry} className="w-full">
          다시 시도
        </KioskButton>
      </Card>
    </KioskLayout>
  );
}
