'use client';

import { KioskLayout, KioskButton, StatusIcon, Card } from '@/components/kiosk';

interface ErrorScreenProps {
  onRetry: () => void;
  errorMessage?: string | null;
}

export default function ErrorScreen({ onRetry, errorMessage }: ErrorScreenProps) {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[2vmin] max-w-[clamp(320px,55vmin,500px)] mx-auto">
        <StatusIcon type="warning" />

        <h1 className="text-[clamp(20px,3.5vmin,28px)] font-bold text-[#2c3e50] text-center">
          코드를 확인해주세요
        </h1>

        <p className="text-[clamp(14px,2.5vmin,20px)] text-[#6c757d] text-center leading-relaxed">
          입력하신 코드를 확인할 수 없습니다
          <br />
          다시 입력해주세요
        </p>

        {errorMessage && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-[clamp(11px,1.8vmin,14px)] text-red-600 text-center font-mono break-all">
              {errorMessage}
            </p>
          </div>
        )}

        <KioskButton variant="dark" size="medium" onClick={onRetry} className="w-full mt-[1vmin]">
          다시 시도
        </KioskButton>
      </Card>
    </KioskLayout>
  );
}
