'use client';

import { KioskLayout, StatusIcon, ProgressTimer, Card } from '@/components/kiosk';

interface CompleteScreenProps {
  onTimeout: () => void;
}

export default function CompleteScreen({ onTimeout }: CompleteScreenProps) {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[max(20px,2vmin)]">
        <StatusIcon type="party" />

        <div className="text-center">
          <h1 className="text-[max(28px,3vmin)] font-bold text-[#2c3e50] mb-[max(8px,1vmin)] whitespace-nowrap">
            이용해 주셔서 감사합니다
          </h1>
          <p className="text-[max(20px,2.2vmin)] text-[#6c757d]">
            잠시 후 처음 화면으로<br />돌아갑니다
          </p>
        </div>

        <ProgressTimer duration={5} onComplete={onTimeout} color="#4caf50" className="w-full" />
      </Card>
    </KioskLayout>
  );
}
