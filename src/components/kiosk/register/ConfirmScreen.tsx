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
      <div className="flex flex-col items-center gap-8 max-w-[420px] mx-auto">
        <h1 className="text-[48px] font-bold text-[#2c3e50] text-center">
          등록 정보 확인
        </h1>
        <p className="text-[24px] text-[#6c757d] text-center">
          인식된 정보가 맞는지 확인해주세요
        </p>

        {/* 카드 영역 */}
        <div className="bg-white rounded-[24px] p-8 flex flex-col items-center gap-6 shadow-lg w-full">
          {/* 사진 */}
          <div className="w-[200px] h-[200px] bg-gray-100 rounded-[16px] overflow-hidden flex items-center justify-center">
            <Smartphone className="w-16 h-16 text-gray-400" />
          </div>

          {/* 태그 */}
          <div className="flex gap-3">
            {itemData.tags.map((tag) => (
              <span key={tag} className="px-4 py-2 bg-[#e3f2fd] text-[#1976d2] rounded-full text-[18px] font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* 날짜 */}
          <p className="text-[18px] text-[#6c757d]">
            {itemData.foundDate}
          </p>

          {/* 위치 */}
          <p className="text-[20px] text-[#2c3e50] font-medium">
            📍 {itemData.location}
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-8 mt-8 w-full max-w-[320px] mx-auto">
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
