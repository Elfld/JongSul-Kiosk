'use client';

import { Smartphone } from 'lucide-react';
import { KioskLayout, KioskButton, Card, StatusIcon } from '@/components/kiosk';
import type { KioskItemData } from '@/lib/types/kiosk';

interface ConfirmScreenProps {
  itemData?: KioskItemData;
  errorMessage?: string | null;
  onConfirm?: () => void;
  onRetry: () => void;
  onBack?: () => void;
}

export default function ConfirmScreen({
  itemData,
  errorMessage,
  onConfirm,
  onRetry,
  onBack
}: ConfirmScreenProps) {
  // 에러 화면
  if (errorMessage || !itemData) {
    return (
      <KioskLayout>
        <Card className="flex flex-col items-center gap-[2vmin] max-w-[clamp(320px,55vmin,500px)] mx-auto">
          <StatusIcon type="warning" />

          <h1 className="text-[clamp(20px,3.5vmin,28px)] font-bold text-[#2c3e50] text-center">
            등록에 실패했습니다
          </h1>

          <p className="text-[clamp(14px,2.5vmin,20px)] text-[#6c757d] text-center leading-relaxed">
            촬영 요청 중 문제가 발생했습니다
            <br />
            다시 시도해주세요
          </p>

          {errorMessage && (
            <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-[clamp(11px,1.8vmin,14px)] text-red-600 text-center font-mono break-all">
                {errorMessage}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-[1.5vmin] mt-[1vmin] w-full">
            <KioskButton variant="primary" fullWidth onClick={onRetry}>
              다시 시도
            </KioskButton>

            {onBack && (
              <KioskButton variant="secondary" fullWidth onClick={onBack}>
                처음으로
              </KioskButton>
            )}
          </div>
        </Card>
      </KioskLayout>
    );
  }

  // 확인 화면 (목업 데이터 표시)
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
          <div className="flex gap-2 flex-wrap justify-center">
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
          {onConfirm && (
            <KioskButton variant="primary" fullWidth onClick={onConfirm}>
              네, 맞아요
            </KioskButton>
          )}

          <KioskButton variant="secondary" fullWidth onClick={onRetry}>
            아니요, 다시 할게요
          </KioskButton>
        </div>
      </div>
    </KioskLayout>
  );
}
