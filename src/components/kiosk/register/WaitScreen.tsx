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
      <div className="flex flex-col items-center gap-[2.5vmin]">
        <h1 className="text-[clamp(28px,5.5vmin,85px)] font-bold text-[#2c3e50] text-center">
          분실물 등록
        </h1>
        <p className="text-[clamp(16px,3vmin,42px)] text-[#6c757d] text-center">
          분실물을 투입구에 넣어주세요
        </p>
        <div className="w-[clamp(240px,45vmin,520px)] h-[clamp(140px,25vmin,320px)] border-4 border-dashed border-gray-300 rounded-[20px] bg-white flex items-center justify-center">
          <Package className="w-[clamp(48px,10vmin,130px)] h-[clamp(48px,10vmin,130px)] text-gray-300" strokeWidth={2} />
        </div>
        <KioskButton variant="primary" onClick={onStart} className="w-[clamp(180px,30vmin,340px)]">
          시작하기
        </KioskButton>
        <KioskButton variant="secondary" onClick={onBack} className="w-[clamp(180px,30vmin,340px)]">
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
