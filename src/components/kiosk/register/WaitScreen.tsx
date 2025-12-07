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
      <div className="flex flex-col items-center gap-[max(20px,2vmin)]">
        <h1 className="text-[max(32px,3.7vmin)] font-bold text-[#2c3e50] text-center whitespace-nowrap">
          분실물 등록
        </h1>
        <p className="text-[max(20px,2.2vmin)] text-[#6c757d] text-center whitespace-nowrap">
          분실물을 투입구에 넣어주세요
        </p>
        <div className="w-full max-w-[max(280px,37vmin)] h-[max(160px,18vmin)] border-4 border-dashed border-gray-300 rounded-[max(16px,2vmin)] bg-white flex items-center justify-center">
          <Package className="w-[max(48px,6vmin)] h-[max(48px,6vmin)] text-gray-300" strokeWidth={2} />
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
