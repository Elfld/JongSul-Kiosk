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
      <div className="flex flex-col items-center gap-[6vmin]">
        <h1 className="text-[max(36px,14vmin)] font-bold text-[#2c3e50] text-center">
          분실물 등록
        </h1>
        <p className="text-[max(22px,8vmin)] text-[#6c757d] text-center">
          분실물을 투입구에 넣어주세요
        </p>
        <div className="w-[max(300px,70vmin)] h-[max(180px,40vmin)] border-4 border-dashed border-gray-300 rounded-[max(20px,4vmin)] bg-white flex items-center justify-center">
          <Package className="w-[max(60px,18vmin)] h-[max(60px,18vmin)] text-gray-300" strokeWidth={2} />
        </div>
        <KioskButton variant="primary" onClick={onStart} className="w-[max(250px,60vmin)]">
          시작하기
        </KioskButton>
        <KioskButton variant="secondary" onClick={onBack} className="w-[max(250px,60vmin)]">
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
