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
      <div className="flex flex-col items-center gap-[max(20px,2vmin)]">
        <h1 className="text-[max(32px,3.7vmin)] font-bold text-[#2c3e50] text-center whitespace-nowrap">
          {isOpening ? '투입구를 여는 중...' : '투입구가 열렸습니다'}
        </h1>
        <p className="text-[max(20px,2.2vmin)] text-[#6c757d] text-center whitespace-nowrap">
          분실물을 넣고 투입 완료 버튼을 눌러주세요
        </p>
        <div className={`w-full max-w-[max(280px,37vmin)] h-[max(160px,18vmin)] border-4 ${error ? 'border-red-400' : 'border-[#4caf50]'} rounded-[max(16px,2vmin)] bg-white flex items-center justify-center`}>
          <PackageOpen className={`w-[max(48px,6vmin)] h-[max(48px,6vmin)] ${error ? 'text-red-400' : 'text-[#4caf50]'}`} strokeWidth={2} />
        </div>
        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-[max(12px,1.2vmin)] text-red-600 text-center font-mono break-all">
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
