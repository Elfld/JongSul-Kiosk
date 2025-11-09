'use client';

import { KioskLayout, KioskButton, StatusIcon } from '@/components/kiosk';

interface LockerScreenProps {
  lockerNumber: number;
  onComplete: () => void;
}

export default function LockerScreen({ lockerNumber, onComplete }: LockerScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-10">
        <StatusIcon type="unlock" />

        <h1 className="text-6xl font-bold text-gray-800">
          사물함 {lockerNumber}번이 열렸습니다
        </h1>

        <p className="text-2xl text-gray-600 text-center leading-relaxed">
          분실물을 수령하신 후
          <br />
          문을 닫아주세요
        </p>

        <KioskButton variant="success" size="large" onClick={onComplete}>
          수령 완료
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
