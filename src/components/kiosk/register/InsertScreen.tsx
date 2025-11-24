'use client';

import { PackageOpen } from 'lucide-react';
import { KioskLayout, KioskButton } from '@/components/kiosk';

interface InsertScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function InsertScreen({ onComplete, onBack }: InsertScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[2.5vmin]">
        <h1 className="text-[clamp(28px,5.5vmin,60px)] font-bold text-[#2c3e50] text-center">
          투입구가 열렸습니다
        </h1>
        <p className="text-[clamp(16px,3vmin,30px)] text-[#6c757d] text-center leading-relaxed">
          분실물을 넣고
          <br />
          투입 완료 버튼을 눌러주세요
        </p>
        <div className="w-[clamp(240px,45vmin,400px)] h-[clamp(140px,25vmin,250px)] border-4 border-[#4caf50] rounded-[20px] bg-white flex items-center justify-center">
          <PackageOpen className="w-[clamp(40px,8vmin,80px)] h-[clamp(40px,8vmin,80px)] text-[#4caf50]" strokeWidth={2} />
        </div>
        <KioskButton variant="primary" onClick={onComplete} className="w-[clamp(180px,30vmin,250px)]">
          투입 완료
        </KioskButton>
        <KioskButton variant="secondary" onClick={onBack} className="w-[clamp(180px,30vmin,250px)]">
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
