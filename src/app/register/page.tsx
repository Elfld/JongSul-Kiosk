'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { kioskApi, LOCATION } from '@/lib/api/kiosk';
import type { RegisterStep, RegisteredItemData } from '@/lib/types/kiosk';
import {
  WaitScreen,
  ProcessingScreen,
  CompleteScreen,
} from '@/components/kiosk/register';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<RegisterStep>('wait');
  const [itemData, setItemData] = useState<RegisteredItemData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // processing 단계에서 registerRequest 실행 후 complete로 이동
  useEffect(() => {
    if (step === 'processing') {
      setErrorMessage(null);
      setItemData(null);

      kioskApi
        .registerRequest()
        .then((response) => {
          if (response.status === 'success' && response.image_url && response.category) {
            // 등록 성공 → 완료 화면으로
            const data: RegisteredItemData = {
              photoUrl: response.image_url,
              category: response.category,
              registeredAt: new Date().toISOString(),
              location: LOCATION,
            };
            setItemData(data);
            setStep('complete');
          } else {
            // API는 성공했지만 데이터 누락 또는 에러 상태
            throw new Error(response.message || '등록에 실패했습니다');
          }
        })
        .catch((err) => {
          // 실패 시 에러 메시지 저장하고 wait로 복귀
          setErrorMessage(err.message || '등록 요청 실패');
          setItemData(null);
          setStep('wait');
        });
    }
  }, [step]);

  // 핸들러 함수들
  const handleRegister = () => setStep('processing');
  const handleNewRegistration = () => {
    setErrorMessage(null);
    setItemData(null);
    setStep('wait');
  };
  const handleBackToHome = () => router.push('/');

  // step에 따라 화면 렌더링
  switch (step) {
    case 'wait':
      return (
        <WaitScreen
          onRegister={handleRegister}
          onBack={handleBackToHome}
          errorMessage={errorMessage}
        />
      );

    case 'processing':
      return <ProcessingScreen />;

    case 'complete':
      return (
        <CompleteScreen
          itemData={itemData}
          onNewRegistration={handleNewRegistration}
          onTimeout={handleBackToHome}
        />
      );

    default:
      return null;
  }
}
