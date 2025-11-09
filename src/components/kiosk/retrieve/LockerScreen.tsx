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

        <h1 className="text-[60px] font-bold text-[#2c3e50]">
          사물함 {lockerNumber}번이 열렸습니다
        </h1>

        <p className="text-[24px] text-[#6c757d] text-center leading-relaxed">
          분실물을 수령하신 후
          <br />
          문을 닫아주세요
        </p>

        <KioskButton variant="success" size="large" onClick={onComplete} className="w-[300px]">
          수령 완료
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
