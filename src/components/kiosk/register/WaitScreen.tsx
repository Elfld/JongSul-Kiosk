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
      <div className="flex flex-col items-center gap-[3vh]">
        <h1 className="text-[clamp(48px,6vh,80px)] font-bold text-[#2c3e50] text-center">
          분실물 등록
        </h1>
        <p className="text-[clamp(28px,3.5vh,44px)] text-[#6c757d] text-center">
          분실물을 투입구에 넣어주세요
        </p>
        <div className="w-[clamp(400px,50vw,600px)] h-[clamp(240px,20vh,400px)] border-4 border-dashed border-gray-300 rounded-[20px] bg-white flex items-center justify-center">
          <Package className="w-[clamp(80px,10vh,140px)] h-[clamp(80px,10vh,140px)] text-gray-300" strokeWidth={2} />
        </div>
        <KioskButton variant="primary" onClick={onStart} className="w-[clamp(300px,35vw,450px)]">
          시작하기
        </KioskButton>
        <KioskButton variant="secondary" onClick={onBack} className="w-[clamp(300px,35vw,450px)]">
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
