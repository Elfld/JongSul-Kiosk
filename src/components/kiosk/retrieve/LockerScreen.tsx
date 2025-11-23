'use client';

import { KioskLayout, KioskButton, StatusIcon, Card } from '@/components/kiosk';

interface LockerScreenProps {
  lockerNumber: number;
  onComplete: () => void;
}

export default function LockerScreen({ lockerNumber, onComplete }: LockerScreenProps) {
  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-4 max-w-[400px] mx-auto">
        <StatusIcon type="unlock" />

        <h1 className="text-[24px] font-bold text-[#2c3e50] text-center">
          사물함 {lockerNumber}번이 열렸습니다
        </h1>

        <p className="text-[18px] text-[#6c757d] text-center leading-relaxed">
          분실물을 수령하신 후
          <br />
          문을 닫아주세요
        </p>

        <KioskButton variant="success" size="medium" compact onClick={onComplete} className="mt-1">
          수령 완료
        </KioskButton>
      </Card>
    </KioskLayout>
  );
}
