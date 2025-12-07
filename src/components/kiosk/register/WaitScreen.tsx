'use client';

import { Package } from 'lucide-react';
import { KioskLayout, KioskButton } from '@/components/kiosk';

interface WaitScreenProps {
  onStart: () => void;
  onBack: () => void;
}

export default function WaitScreen({ onStart, onBack }: WaitScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[clamp(20px,3.5vmin,36px)]">
        <h1 className="text-[clamp(28px,6vmin,56px)] font-bold text-[#2c3e50] text-center whitespace-nowrap">
          분실물 등록
        </h1>
        <p className="text-[clamp(16px,3.5vmin,32px)] text-[#6c757d] text-center whitespace-nowrap">
          분실물을 투입구에 넣어주세요
        </p>
        <div className="w-full max-w-[clamp(280px,60vmin,480px)] h-[clamp(160px,30vmin,300px)] border-4 border-dashed border-gray-300 rounded-[clamp(16px,3vmin,24px)] bg-white flex items-center justify-center">
          <Package className="w-[clamp(48px,10vmin,96px)] h-[clamp(48px,10vmin,96px)] text-gray-300" strokeWidth={2} />
        </div>
        <KioskButton variant="primary" onClick={onStart} fullWidth>
          시작하기
        </KioskButton>
        <KioskButton variant="secondary" onClick={onBack} fullWidth>
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
