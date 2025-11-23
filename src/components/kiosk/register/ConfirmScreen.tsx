'use client';

import { Smartphone } from 'lucide-react';
import { KioskLayout, KioskButton } from '@/components/kiosk';
import type { KioskItemData } from '@/lib/types/kiosk';

interface ConfirmScreenProps {
  itemData: KioskItemData;
  onConfirm: () => void;
  onRetry: () => void;
}

export default function ConfirmScreen({ itemData, onConfirm, onRetry }: ConfirmScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[1.5vmin] max-w-[clamp(320px,55vmin,420px)] mx-auto">
        <h1 className="text-[clamp(24px,4.5vmin,48px)] font-bold text-[#2c3e50] text-center">
          등록 정보 확인
        </h1>
        <p className="text-[clamp(14px,2.5vmin,24px)] text-[#6c757d] text-center">
          인식된 정보가 맞는지 확인해주세요
        </p>

        {/* 카드 영역 */}
        <div className="bg-white rounded-[clamp(16px,2.5vmin,24px)] p-[clamp(24px,4.5vmin,40px)] flex flex-col items-center gap-[2vmin] shadow-lg w-full">
          {/* 사진 */}
          <div className="w-[clamp(100px,18vmin,200px)] h-[clamp(100px,18vmin,200px)] bg-gray-100 rounded-[12px] overflow-hidden flex items-center justify-center">
            <Smartphone className="w-[clamp(32px,6vmin,64px)] h-[clamp(32px,6vmin,64px)] text-gray-400" />
          </div>

          {/* 태그 */}
          <div className="flex gap-2">
            {itemData.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-[#e3f2fd] text-[#1976d2] rounded-full text-[clamp(12px,2vmin,18px)] font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* 날짜 */}
          <p className="text-[clamp(12px,2vmin,18px)] text-[#6c757d]">
            {itemData.foundDate}
          </p>

          {/* 위치 */}
          <p className="text-[clamp(14px,2.2vmin,20px)] text-[#2c3e50] font-medium">
            📍 {itemData.location}
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-[1.5vmin] mt-[1vmin] w-full max-w-[clamp(220px,40vmin,320px)] mx-auto">
          <KioskButton variant="primary" fullWidth onClick={onConfirm}>
            네, 맞아요
          </KioskButton>

          <KioskButton variant="secondary" fullWidth onClick={onRetry}>
            아니요, 다시 할게요
          </KioskButton>
        </div>
      </div>
    </KioskLayout>
  );
}
