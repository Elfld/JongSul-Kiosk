'use client';

import Image from 'next/image';
import { KioskLayout, KioskButton, StatusIcon, ProgressTimer, Card } from '@/components/kiosk';
import type { RegisteredItemData } from '@/lib/types/kiosk';

interface CompleteScreenProps {
  itemData: RegisteredItemData | null;
  onNewRegistration: () => void;
  onTimeout: () => void;
}

// ISO 날짜를 한국어 형식으로 변환
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month}월 ${day}일 ${hours}:${minutes}`;
}

export default function CompleteScreen({ itemData, onNewRegistration, onTimeout }: CompleteScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[2.5vmin]">
        <StatusIcon type="success" />

        <h1 className="text-[clamp(28px,5.5vmin,155px)] font-bold text-[#2c3e50]">
          등록 완료
        </h1>

        <p className="text-[clamp(14px,2.5vmin,62px)] text-[#6c757d] text-center leading-relaxed">
          분실물이 등록되었습니다
        </p>

        {/* 등록된 정보 카드 */}
        {itemData && (
          <Card className="flex flex-col items-center gap-[2vmin] w-full max-w-[clamp(320px,55vmin,950px)]">
            {/* 사진 */}
            <div className="w-[clamp(100px,18vmin,475px)] h-[clamp(100px,18vmin,475px)] bg-gray-100 rounded-[12px] overflow-hidden flex items-center justify-center relative">
              <Image
                src={itemData.photoUrl}
                alt="등록된 분실물"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* 카테고리 태그 */}
            <div className="flex gap-2 flex-wrap justify-center">
              <span className="px-3 py-1.5 bg-[#e3f2fd] text-[#1976d2] rounded-full text-[clamp(12px,2vmin,42px)] font-medium">
                {itemData.category}
              </span>
            </div>

            {/* 날짜 */}
            <p className="text-[clamp(12px,2vmin,42px)] text-[#6c757d]">
              {formatDate(itemData.registeredAt)}
            </p>

            {/* 위치 */}
            <p className="text-[clamp(14px,2.2vmin,50px)] text-[#2c3e50] font-medium">
              📍 {itemData.location}
            </p>
          </Card>
        )}

        <KioskButton variant="primary" size="medium" onClick={onNewRegistration} className="w-[clamp(200px,35vmin,695px)]">
          새로운 등록
        </KioskButton>

        <ProgressTimer duration={15} onComplete={onTimeout} className="w-[clamp(220px,40vmin,750px)]" />
      </div>
    </KioskLayout>
  );
}
