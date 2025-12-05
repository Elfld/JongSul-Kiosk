'use client';

import { KioskLayout, KioskButton, StatusIcon, ProgressTimer } from '@/components/kiosk';

interface CompleteScreenProps {
  onNewRegistration: () => void;
  onTimeout: () => void;
}

export default function CompleteScreen({ onNewRegistration, onTimeout }: CompleteScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[3vh]">
        <StatusIcon type="success" />

        <h1 className="text-[clamp(48px,6vh,80px)] font-bold text-[#2c3e50]">
          등록 완료
        </h1>

        <p className="text-[clamp(24px,3vh,40px)] text-[#6c757d] text-center leading-relaxed">
          분실물이 성공적으로 등록되었어요
          <br />
          안심하고 돌아가세요
        </p>

        <KioskButton variant="primary" size="medium" onClick={onNewRegistration} className="w-[clamp(320px,38vw,480px)]">
          새로운 등록
        </KioskButton>

        <ProgressTimer duration={5} onComplete={onTimeout} className="w-[clamp(360px,42vw,520px)]" />
      </div>
    </KioskLayout>
  );
}
