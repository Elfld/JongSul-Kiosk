'use client';

import { useRouter } from 'next/navigation';
import { PackageOpen } from 'lucide-react';
import { KioskLayout, KioskButton } from '@/components/kiosk';

export default function RegisterInsertPage() {
  const router = useRouter();

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-12">
        {/* 타이틀 */}
        <h1 className="text-6xl font-bold text-gray-800 text-center">
          투입구가 열렸습니다
        </h1>

        {/* 설명 */}
        <p className="text-3xl text-gray-600 text-center leading-relaxed">
          분실물을 넣고
          <br />
          투입 완료 버튼을 눌러주세요
        </p>

        {/* 열린 박스 아이콘 영역 */}
        <div className="w-[400px] h-[250px] border-4 border-sky-500 rounded-3xl bg-white flex items-center justify-center">
          <PackageOpen className="w-20 h-20 text-sky-500" />
        </div>

        {/* 투입 완료 버튼 */}
        <KioskButton
          variant="primary"
          onClick={() => router.push('/kiosk/register/processing')}
        >
          투입 완료
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
