'use client';

import { useRouter } from 'next/navigation';
import { Package } from 'lucide-react';
import { KioskLayout, KioskButton } from '@/components/kiosk';

export default function RegisterWaitPage() {
  const router = useRouter();

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-12">
        {/* 타이틀 */}
        <h1 className="text-6xl font-bold text-gray-800 text-center">
          분실물 등록
        </h1>

        {/* 설명 */}
        <p className="text-3xl text-gray-600 text-center">
          분실물을 투입구에 넣어주세요
        </p>

        {/* 박스 아이콘 영역 */}
        <div className="w-[400px] h-[250px] border-4 border-dashed border-gray-300 rounded-3xl bg-white flex items-center justify-center">
          <Package className="w-24 h-24 text-gray-300" />
        </div>

        {/* 시작하기 버튼 */}
        <KioskButton
          variant="primary"
          onClick={() => router.push('/kiosk/register/insert')}
        >
          시작하기
        </KioskButton>

        {/* 처음 화면으로 버튼 */}
        <KioskButton
          variant="secondary"
          onClick={() => router.push('/kiosk')}
        >
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
