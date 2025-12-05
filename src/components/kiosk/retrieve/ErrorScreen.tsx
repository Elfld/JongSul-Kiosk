'use client';

import { KioskLayout, KioskButton, StatusIcon, Card } from '@/components/kiosk';

interface ErrorScreenProps {
  onRetry: () => void;
  errorMessage?: string | null;
}

export default function ErrorScreen({ onRetry, errorMessage }: ErrorScreenProps) {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[2.5vh] max-w-[clamp(500px,60vw,750px)] mx-auto">
        <StatusIcon type="warning" />

        <h1 className="text-[clamp(36px,4.5vh,60px)] font-bold text-[#2c3e50] text-center">
          코드를 확인해주세요
        </h1>

        <p className="text-[clamp(24px,3vh,40px)] text-[#6c757d] text-center leading-relaxed">
          입력하신 코드를 확인할 수 없습니다
          <br />
          다시 입력해주세요
        </p>

        {errorMessage && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-[clamp(18px,2.2vh,26px)] text-red-600 text-center font-mono break-all">
              {errorMessage}
            </p>
          </div>
        )}

        <KioskButton variant="dark" size="medium" onClick={onRetry} className="w-full mt-[1.5vh]">
          다시 시도
        </KioskButton>
      </Card>
    </KioskLayout>
  );
}
