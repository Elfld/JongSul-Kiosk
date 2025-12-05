'use client';

import { KioskLayout, StatusIcon, ProgressTimer, Card } from '@/components/kiosk';

interface CompleteScreenProps {
  onTimeout: () => void;
}

export default function CompleteScreen({ onTimeout }: CompleteScreenProps) {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[2.5vh] max-w-[clamp(500px,60vw,750px)] mx-auto">
        <StatusIcon type="party" />

        <div className="text-center">
          <h1 className="text-[clamp(36px,4.5vh,60px)] font-bold text-[#2c3e50] mb-[0.8vh]">
            이용해 주셔서 감사합니다
          </h1>
          <p className="text-[clamp(24px,3vh,40px)] text-[#6c757d]">
            잠시 후 처음 화면으로
            <br />
            돌아갑니다
          </p>
        </div>

        <ProgressTimer duration={5} onComplete={onTimeout} color="#4caf50" className="w-full mt-[1.5vh]" />
      </Card>
    </KioskLayout>
  );
}
