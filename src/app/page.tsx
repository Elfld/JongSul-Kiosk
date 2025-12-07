'use client';

import { useRouter } from 'next/navigation';
import { KioskLayout, KioskButton } from '@/components/kiosk';

export default function KioskMainPage() {
  const router = useRouter();

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[clamp(24px,4vmin,40px)]">
        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-[clamp(32px,7vmin,64px)] font-bold text-[#2c3e50] leading-tight whitespace-nowrap">
            인하대 분실물
          </h1>
          <h1 className="text-[clamp(32px,7vmin,64px)] font-bold text-[#2c3e50] leading-tight whitespace-nowrap">
            키오스크
          </h1>
        </div>

        {/* 부제 */}
        <p className="text-[clamp(18px,4vmin,36px)] text-[#6c757d] font-medium whitespace-nowrap">
          24시간 분실물 센터
        </p>

        {/* 버튼 영역 */}
        <div className="w-full flex flex-col gap-[clamp(16px,3vmin,28px)] mt-[clamp(16px,3vmin,28px)]">
          <KioskButton
            variant="primary"
            size="large"
            fullWidth
            onClick={() => router.push('/register')}
          >
            분실물 등록
          </KioskButton>

          <KioskButton
            variant="below"
            size="large"
            fullWidth
            onClick={() => router.push('/retrieve')}
          >
            분실물 찾기
          </KioskButton>
        </div>
      </div>
    </KioskLayout>
  );
}
