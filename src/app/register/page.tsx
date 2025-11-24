'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { kioskApi } from '@/lib/api/kiosk';
import type { RegisterStep } from '@/lib/types/kiosk';
import {
  WaitScreen,
  InsertScreen,
  ProcessingScreen,
  ConfirmScreen,
  CompleteScreen,
} from '@/components/kiosk/register';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<RegisterStep>('wait');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // processing 단계에서 registerRequest 실행 후 complete으로 이동
  // (백엔드가 촬영 후 아이템 정보를 반환하지 않으므로 confirm 단계 스킵)
  useEffect(() => {
    if (step === 'processing') {
      setErrorMessage(null);
      kioskApi
        .registerRequest()
        .then(() => {
          // 촬영 요청 성공 → 완료 화면으로
          setStep('complete');
        })
        .catch((err) => {
          // 실패 시 에러 메시지 저장 후 confirm 화면에서 표시
          setErrorMessage(err.message || '등록 요청 실패');
          setStep('confirm');
        });
    }
  }, [step]);

  // 핸들러 함수들
  const handleStart = () => setStep('insert');
  const handleInsertComplete = () => setStep('processing');
  const handleRetry = () => {
    setErrorMessage(null);
    setStep('insert');
  };
  const handleNewRegistration = () => {
    setErrorMessage(null);
    setStep('wait');
  };
  const handleBackToHome = () => router.push('/');

  // step에 따라 화면 렌더링
  switch (step) {
    case 'wait':
      return <WaitScreen onStart={handleStart} onBack={handleBackToHome} />;

    case 'insert':
      return <InsertScreen onComplete={handleInsertComplete} onBack={handleBackToHome} />;

    case 'processing':
      return <ProcessingScreen />;

    case 'confirm':
      // 에러 발생 시 재시도 화면으로 사용
      return (
        <ConfirmScreen
          errorMessage={errorMessage}
          onRetry={handleRetry}
          onBack={handleBackToHome}
        />
      );

    case 'complete':
      return (
        <CompleteScreen
          onNewRegistration={handleNewRegistration}
          onTimeout={handleBackToHome}
        />
      );

    default:
      return null;
  }
}
