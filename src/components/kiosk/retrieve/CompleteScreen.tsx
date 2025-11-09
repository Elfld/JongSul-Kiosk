'use client';

import { KioskLayout, StatusIcon, ProgressTimer, Card } from '@/components/kiosk';

interface CompleteScreenProps {
  onTimeout: () => void;
}

export default function CompleteScreen({ onTimeout }: CompleteScreenProps) {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-6 max-w-[500px] mx-auto">
        <StatusIcon type="party" />

        <div className="text-center">
          <h1 className="text-[28px] font-bold text-[#2c3e50] mb-2">
            이용해 주셔서 감사합니다
          </h1>
          <p className="text-[16px] text-[#6c757d]">
            잠시 후 처음 화면으로
            <br />
            돌아갑니다
          </p>
        </div>

        <ProgressTimer duration={5} onComplete={onTimeout} color="#4caf50" className="w-full mt-4" />
      </Card>
    </KioskLayout>
  );
}
