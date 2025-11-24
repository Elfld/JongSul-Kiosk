'use client';

import { AlertTriangle } from 'lucide-react';
import { KioskLayout, KioskButton, Card, StatusIcon } from '@/components/kiosk';

interface ConfirmScreenProps {
  errorMessage?: string | null;
  onRetry: () => void;
  onBack: () => void;
}

export default function ConfirmScreen({ errorMessage, onRetry, onBack }: ConfirmScreenProps) {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[2vmin] max-w-[clamp(320px,55vmin,500px)] mx-auto">
        <StatusIcon type="warning" />

        <h1 className="text-[clamp(20px,3.5vmin,28px)] font-bold text-[#2c3e50] text-center">
          등록에 실패했습니다
        </h1>

        <p className="text-[clamp(14px,2.5vmin,20px)] text-[#6c757d] text-center leading-relaxed">
          촬영 요청 중 문제가 발생했습니다
          <br />
          다시 시도해주세요
        </p>

        {errorMessage && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-[clamp(11px,1.8vmin,14px)] text-red-600 text-center font-mono break-all">
              {errorMessage}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-[1.5vmin] mt-[1vmin] w-full">
          <KioskButton variant="primary" fullWidth onClick={onRetry}>
            다시 시도
          </KioskButton>

          <KioskButton variant="secondary" fullWidth onClick={onBack}>
            처음으로
          </KioskButton>
        </div>
      </Card>
    </KioskLayout>
  );
}
