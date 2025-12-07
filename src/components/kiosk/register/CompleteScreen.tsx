'use client';

import { KioskLayout, KioskButton, StatusIcon, ProgressTimer } from '@/components/kiosk';

interface CompleteScreenProps {
  onNewRegistration: () => void;
  onTimeout: () => void;
}

export default function CompleteScreen({ onNewRegistration, onTimeout }: CompleteScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[max(20px,2vmin)]">
        <StatusIcon type="success" />

        <h1 className="text-[max(32px,3.7vmin)] font-bold text-[#2c3e50] whitespace-nowrap">
          등록 완료
        </h1>

        <p className="text-[max(20px,2.2vmin)] text-[#6c757d] text-center">
          분실물이 성공적으로 등록되었어요<br />안심하고 돌아가세요
        </p>

        <KioskButton variant="primary" size="medium" onClick={onNewRegistration} fullWidth>
          새로운 등록
        </KioskButton>

        <ProgressTimer duration={5} onComplete={onTimeout} className="w-full" />
      </div>
    </KioskLayout>
  );
}
