'use client';

import { Package } from 'lucide-react';
import { KioskLayout, KioskButton } from '@/components/kiosk';

interface WaitScreenProps {
  onRegister: () => void;
  onBack: () => void;
  errorMessage?: string | null;
}

export default function WaitScreen({ onRegister, onBack, errorMessage }: WaitScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[2.5vmin]">
        <h1 className="text-[clamp(28px,5.5vmin,155px)] font-bold text-[#2c3e50] text-center">
          분실물 등록
        </h1>
        <p className="text-[clamp(16px,3vmin,75px)] text-[#6c757d] text-center">
          분실물을 투입구에 넣고
          <br />
          등록하기 버튼을 눌러주세요
        </p>
        <div className="w-[clamp(240px,45vmin,900px)] h-[clamp(140px,25vmin,550px)] border-4 border-dashed border-gray-300 rounded-[20px] bg-white flex items-center justify-center">
          <Package className="w-[clamp(48px,10vmin,225px)] h-[clamp(48px,10vmin,225px)] text-gray-300" strokeWidth={2} />
        </div>

        {errorMessage && (
          <div className="w-full max-w-[clamp(240px,45vmin,900px)] p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-[clamp(11px,1.8vmin,32px)] text-red-600 text-center font-mono break-all">
              {errorMessage}
            </p>
          </div>
        )}

        <KioskButton variant="primary" onClick={onRegister} className="w-[clamp(180px,30vmin,590px)]">
          등록하기
        </KioskButton>
        <KioskButton variant="secondary" onClick={onBack} className="w-[clamp(180px,30vmin,590px)]">
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
