'use client';

import { KioskLayout, StatusIcon, ProgressTimer, Card } from '@/components/kiosk';

interface CompleteScreenProps {
  onTimeout: () => void;
}

export default function CompleteScreen({ onTimeout }: CompleteScreenProps) {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[clamp(20px,3.5vmin,36px)]">
        <StatusIcon type="party" />

        <div className="text-center">
          <h1 className="text-[clamp(24px,5vmin,48px)] font-bold text-[#2c3e50] mb-[clamp(8px,1.5vmin,16px)] whitespace-nowrap">
            이용해 주셔서 감사합니다
          </h1>
          <p className="text-[clamp(16px,3.5vmin,32px)] text-[#6c757d]">
            잠시 후 처음 화면으로<br />돌아갑니다
          </p>
        </div>

        <ProgressTimer duration={5} onComplete={onTimeout} color="#4caf50" className="w-full" />
      </Card>
    </KioskLayout>
  );
}
