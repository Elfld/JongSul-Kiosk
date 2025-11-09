'use client';

import { KioskLayout, KioskButton, StatusIcon, ProgressTimer } from '@/components/kiosk';

interface CompleteScreenProps {
  onNewRegistration: () => void;
  onTimeout: () => void;
}

export default function CompleteScreen({ onNewRegistration, onTimeout }: CompleteScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-10">
        <StatusIcon type="success" />

        <h1 className="text-6xl font-bold text-gray-800">
          등록 완료
        </h1>

        <p className="text-2xl text-gray-600 text-center leading-relaxed">
          분실물이 성공적으로 등록되었어요
          <br />
          안심하고 돌아가세요
        </p>

        <KioskButton variant="primary" size="large" onClick={onNewRegistration}>
          새로운 등록
        </KioskButton>

        <ProgressTimer duration={5} onComplete={onTimeout} />
      </div>
    </KioskLayout>
  );
}
