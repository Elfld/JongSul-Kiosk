'use client';

import { KioskLayout, KioskButton, StatusIcon, Card } from '@/components/kiosk';

interface LockerScreenProps {
  lockerNumber: number;
  onComplete: () => void;
}

export default function LockerScreen({ lockerNumber, onComplete }: LockerScreenProps) {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[2vmin] max-w-[clamp(320px,55vmin,500px)] mx-auto">
        <StatusIcon type="unlock" />

        <h1 className="text-[clamp(20px,3.5vmin,28px)] font-bold text-[#2c3e50] text-center">
          사물함 {lockerNumber}번이 열렸습니다
        </h1>

        <p className="text-[clamp(14px,2.5vmin,22px)] text-[#6c757d] text-center leading-relaxed">
          분실물을 수령하신 후
          <br />
          문을 닫아주세요
        </p>

        <KioskButton variant="success" size="medium" compact onClick={onComplete} className="mt-[1vmin]">
          수령 완료
        </KioskButton>
      </Card>
    </KioskLayout>
  );
}
