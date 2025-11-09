'use client';

import { KioskLayout, StatusIcon, ProgressTimer } from '@/components/kiosk';

interface CompleteScreenProps {
  onTimeout: () => void;
}

export default function CompleteScreen({ onTimeout }: CompleteScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-10">
        <StatusIcon type="party" />

        <div className="text-center">
          <h1 className="text-[60px] font-bold text-[#2c3e50] mb-4">
            이용해 주셔서 감사합니다
          </h1>
          <p className="text-[24px] text-[#6c757d]">
            잠시 후 처음 화면으로
            <br />
            돌아갑니다
          </p>
        </div>

        <ProgressTimer duration={5} onComplete={onTimeout} color="#1976d2" />
      </div>
    </KioskLayout>
  );
}
