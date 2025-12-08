'use client';

import { useRouter } from 'next/navigation';
import { KioskLayout, KioskButton } from '@/components/kiosk';

export default function KioskMainPage() {
  const router = useRouter();

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-[3vmin]">
        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-[clamp(36px,7vmin,150px)] font-bold text-[#2c3e50] leading-tight">
            인하대 분실물
          </h1>
          <h1 className="text-[clamp(36px,7vmin,150px)] font-bold text-[#2c3e50] leading-tight">
            키오스크
          </h1>
        </div>

        {/* 부제 */}
        <p className="text-[clamp(18px,3.5vmin,70px)] text-[#6c757d] font-medium">
          24시간 분실물 센터
        </p>

        {/* 버튼 영역 */}
        <div className="w-full max-w-[clamp(240px,45vmin,650px)] flex flex-col gap-[2vmin] mt-[2vmin]">
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
