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
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-6xl font-bold text-gray-800 text-center">
          분실물 등록
        </h1>
        <p className="text-3xl text-gray-600 text-center">
          분실물을 투입구에 넣어주세요
        </p>
        <div className="w-[400px] h-[250px] border-4 border-dashed border-gray-300 rounded-3xl bg-white flex items-center justify-center">
          <Package className="w-24 h-24 text-gray-300" />
        </div>
        <KioskButton variant="primary" onClick={onStart}>
          시작하기
        </KioskButton>
        <KioskButton variant="secondary" onClick={onBack}>
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
