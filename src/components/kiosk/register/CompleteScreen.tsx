'use client';

import { KioskLayout, KioskButton, StatusIcon, ProgressTimer } from '@/components/kiosk';

interface CompleteScreenProps {
  onNewRegistration: () => void;
  onTimeout: () => void;
}

export default function CompleteScreen({ onNewRegistration, onTimeout }: CompleteScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[6vmin]">
        <StatusIcon type="success" />

        <h1 className="text-[max(36px,14vmin)] font-bold text-[#2c3e50]">
          등록 완료
        </h1>

        <p className="text-[max(20px,7vmin)] text-[#6c757d] text-center leading-relaxed">
          분실물이 성공적으로 등록되었어요 안심하고 돌아가세요
        </p>

        <KioskButton variant="primary" size="medium" onClick={onNewRegistration} className="w-[max(280px,65vmin)]">
          새로운 등록
        </KioskButton>

        <ProgressTimer duration={5} onComplete={onTimeout} className="w-[max(300px,70vmin)]" />
      </div>
    </KioskLayout>
  );
}
