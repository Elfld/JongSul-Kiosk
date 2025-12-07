'use client';

import { useEffect, useState } from 'react';
import { PackageOpen } from 'lucide-react';
import { KioskLayout, KioskButton } from '@/components/kiosk';
import { kioskApi } from '@/lib/api/kiosk';

interface InsertScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function InsertScreen({ onComplete, onBack }: InsertScreenProps) {
  const [isOpening, setIsOpening] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 화면 진입 시 투입구 열기
  useEffect(() => {
    kioskApi
      .openChute()
      .then(() => {
        setIsOpening(false);
      })
      .catch((err) => {
        setError(err.message || '투입구 열기 실패');
        setIsOpening(false);
      });
  }, []);

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[clamp(20px,3.5vmin,36px)]">
        <h1 className="text-[clamp(28px,6vmin,56px)] font-bold text-[#2c3e50] text-center whitespace-nowrap">
          {isOpening ? '투입구를 여는 중...' : '투입구가 열렸습니다'}
        </h1>
        <p className="text-[clamp(16px,3.5vmin,32px)] text-[#6c757d] text-center whitespace-nowrap">
          분실물을 넣고 투입 완료 버튼을 눌러주세요
        </p>
        <div className={`w-full max-w-[clamp(280px,60vmin,480px)] h-[clamp(160px,30vmin,300px)] border-4 ${error ? 'border-red-400' : 'border-[#4caf50]'} rounded-[clamp(16px,3vmin,24px)] bg-white flex items-center justify-center`}>
          <PackageOpen className={`w-[clamp(48px,10vmin,96px)] h-[clamp(48px,10vmin,96px)] ${error ? 'text-red-400' : 'text-[#4caf50]'}`} strokeWidth={2} />
        </div>
        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-[clamp(12px,2.5vmin,20px)] text-red-600 text-center font-mono break-all">
              {error}
            </p>
          </div>
        )}
        <KioskButton variant="primary" onClick={onComplete} disabled={isOpening} fullWidth>
          {isOpening ? '잠시만...' : '투입 완료'}
        </KioskButton>
        <KioskButton variant="secondary" onClick={onBack} fullWidth>
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
