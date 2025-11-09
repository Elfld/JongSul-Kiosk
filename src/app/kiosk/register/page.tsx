'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, PackageOpen, Smartphone } from 'lucide-react';
import { KioskLayout, KioskButton, StatusIcon, ProgressTimer } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';
import { mockAnalysis } from '@/lib/utils/kiosk';
import type { RegisterStep, KioskItemData } from '@/lib/types/kiosk';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<RegisterStep>('wait');
  const [itemData, setItemData] = useState<KioskItemData | null>(null);

  // processing 단계에서 mockAnalysis 실행 후 confirm으로 이동
  useEffect(() => {
    if (step === 'processing') {
      mockAnalysis().then((data) => {
        setItemData(data);
        setStep('confirm');
      });
    }
  }, [step]);

  // complete 단계에서 5초 후 자동으로 홈으로 복귀
  useEffect(() => {
    if (step === 'complete') {
      const timer = setTimeout(() => {
        router.push('/kiosk');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step, router]);

  // 1. wait 화면 - 대기
  if (step === 'wait') {
    return (
      <KioskLayout>
        <div className="flex flex-col items-center gap-12">
          <h1 className="text-6xl font-bold text-gray-800 text-center">
            분실물 등록
          </h1>
          <p className="text-3xl text-gray-600 text-center">
            분실물을 투입구에 넣어주세요
          </p>
          <div className="w-[400px] h-[250px] border-4 border-dashed border-gray-300 rounded-3xl bg-white flex items-center justify-center">
            <Package className="w-24 h-24 text-gray-300" />
          </div>
          <KioskButton
            variant="primary"
            onClick={() => setStep('insert')}
          >
            시작하기
          </KioskButton>
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

  // 2. insert 화면 - 투입
  if (step === 'insert') {
    return (
      <KioskLayout>
        <div className="flex flex-col items-center gap-12">
          <h1 className="text-6xl font-bold text-gray-800 text-center">
            투입구가 열렸습니다
          </h1>
          <p className="text-3xl text-gray-600 text-center leading-relaxed">
            분실물을 넣고
            <br />
            투입 완료 버튼을 눌러주세요
          </p>
          <div className="w-[400px] h-[250px] border-4 border-sky-500 rounded-3xl bg-white flex items-center justify-center">
            <PackageOpen className="w-20 h-20 text-sky-500" />
          </div>
          <KioskButton
            variant="primary"
            onClick={() => setStep('processing')}
          >
            투입 완료
          </KioskButton>
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

  // 3. processing 화면 - 분석 중
  if (step === 'processing') {
    return (
      <KioskLayout>
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-6xl font-bold text-gray-800">
            분석 중
          </h1>
          <p className="text-3xl text-gray-600">
            분실물을 인식하고 있어요...
          </p>
          <LoadingSpinner />
        </div>
      </KioskLayout>
    );
  }

  // 4. confirm 화면 - 정보 확인
  if (step === 'confirm' && itemData) {
    return (
      <KioskLayout centered={false}>
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl font-bold text-gray-800">
            등록 정보 확인
          </h1>
          <p className="text-2xl text-gray-600">
            인식된 정보가 맞는지 확인해주세요
          </p>

          {/* 카드 영역 */}
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-6 shadow-lg">
            {/* 사진 */}
            <div className="w-[200px] h-[200px] bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
              <Smartphone className="w-16 h-16 text-gray-400" />
            </div>

            {/* 태그 */}
            <div className="flex gap-3">
              {itemData.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-lg font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            {/* 날짜 */}
            <p className="text-lg text-gray-600">
              {itemData.foundDate}
            </p>

            {/* 위치 */}
            <p className="text-xl text-gray-700 font-medium">
              📍 {itemData.location}
            </p>
          </div>

          {/* 버튼 영역 */}
          <div className="flex flex-col gap-4 w-full max-w-[400px] mx-auto">
            <KioskButton
              variant="primary"
              fullWidth
              onClick={() => setStep('complete')}
            >
              네, 맞아요
            </KioskButton>

            <KioskButton
              variant="secondary"
              fullWidth
              onClick={() => {
                setStep('wait');
                setItemData(null);
              }}
            >
              아니요, 다시 할게요
            </KioskButton>
          </div>
        </div>
      </KioskLayout>
    );
  }

  // 5. complete 화면 - 완료
  if (step === 'complete') {
    return (
      <KioskLayout>
        <div className="flex flex-col items-center gap-10">
          <StatusIcon type="success" />

          <h1 className="text-6xl font-bold text-gray-800">
            등록 완료
          </h1>

          <p className="text-2xl text-gray-600 text-center leading-relaxed">
            분실물이 성공적으로 등록되었어요
            <br />
            안심하고 돌아가세요
          </p>

          <KioskButton
            variant="primary"
            size="large"
            onClick={() => {
              setStep('wait');
              setItemData(null);
            }}
          >
            새로운 등록
          </KioskButton>

          <ProgressTimer
            duration={5}
            onComplete={() => router.push('/kiosk')}
          />
        </div>
      </KioskLayout>
    );
  }

  return null;
}
