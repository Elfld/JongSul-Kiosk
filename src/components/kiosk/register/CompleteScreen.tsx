'use client';

import { KioskLayout, KioskButton, StatusIcon, ProgressTimer } from '@/components/kiosk';

interface CompleteScreenProps {
  onNewRegistration: () => void;
  onTimeout: () => void;
}

export default function CompleteScreen({ onNewRegistration, onTimeout }: CompleteScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[clamp(20px,3.5vmin,36px)]">
        <StatusIcon type="success" />

        <h1 className="text-[clamp(28px,6vmin,56px)] font-bold text-[#2c3e50] whitespace-nowrap">
          등록 완료
        </h1>

        <p className="text-[clamp(16px,3.5vmin,32px)] text-[#6c757d] text-center">
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
