'use client';

import { useRouter } from 'next/navigation';
import { KioskLayout, KioskButton } from '@/components/kiosk';

export default function KioskMainPage() {
  const router = useRouter();

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-12">
        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-7xl font-bold text-gray-800 leading-tight">
            인하대 분실물
            <br />
            키오스크
          </h1>
        </div>

        {/* 부제 */}
        <p className="text-4xl text-gray-500 font-medium">
          24시간 분실물 센터
        </p>

        {/* 버튼 영역 */}
        <div className="w-full max-w-[400px] flex flex-col gap-8 mt-8">
          <KioskButton
            variant="primary"
            size="large"
            fullWidth
            onClick={() => router.push('/kiosk/register')}
          >
            분실물 등록
          </KioskButton>

          <KioskButton
            variant="secondary"
            size="large"
            fullWidth
            onClick={() => router.push('/kiosk/retrieve')}
          >
            분실물 찾기
          </KioskButton>
        </div>
      </div>
    </KioskLayout>
  );
}
