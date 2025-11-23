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
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-[40px] font-bold text-[#2c3e50] text-center">
          투입구가 열렸습니다
        </h1>
        <p className="text-[22px] text-[#6c757d] text-center leading-relaxed">
          분실물을 넣고
          <br />
          투입 완료 버튼을 눌러주세요
        </p>
        <div className="w-[320px] h-[180px] border-4 border-[#4caf50] rounded-[20px] bg-white flex items-center justify-center">
          <PackageOpen className="w-14 h-14 text-[#4caf50]" strokeWidth={2} />
        </div>
        <KioskButton variant="primary" onClick={onComplete} className="w-[220px]">
          투입 완료
        </KioskButton>
        <KioskButton variant="secondary" onClick={onBack} className="w-[220px]">
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
