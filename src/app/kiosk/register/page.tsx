'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { kioskApi } from '@/lib/api/kiosk';
import { mockAnalysis } from '@/lib/utils/kiosk';
import type { RegisterStep, KioskItemData } from '@/lib/types/kiosk';
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
  const [itemData, setItemData] = useState<KioskItemData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // processing 단계에서 registerRequest 실행 후 목업 데이터 생성하여 confirm으로
  useEffect(() => {
    if (step === 'processing') {
      setErrorMessage(null);
      kioskApi
        .registerRequest()
        .then(async () => {
          // 촬영 요청 성공 → 목업 데이터 생성
          const mockData = await mockAnalysis();
          setItemData(mockData);
          setStep('confirm');
        })
        .catch((err) => {
          // 실패 시 에러 메시지 저장
          setErrorMessage(err.message || '등록 요청 실패');
          setItemData(null);
          setStep('confirm');
        });
    }
  }, [step]);

  // 핸들러 함수들
  const handleStart = () => setStep('insert');
  const handleInsertComplete = () => setStep('processing');
  const handleConfirm = () => setStep('complete');
  const handleRetry = () => {
    setErrorMessage(null);
    setItemData(null);
    setStep('insert');
  };
  const handleNewRegistration = () => {
    setErrorMessage(null);
    setItemData(null);
    setStep('wait');
  };
  const handleBackToHome = () => router.push('/kiosk');

  // step에 따라 화면 렌더링
  switch (step) {
    case 'wait':
      return <WaitScreen onStart={handleStart} onBack={handleBackToHome} />;

    case 'insert':
      return <InsertScreen onComplete={handleInsertComplete} onBack={handleBackToHome} />;

    case 'processing':
      return <ProcessingScreen />;

    case 'confirm':
      // 성공 시 목업 데이터 표시, 실패 시 에러 표시
      return itemData ? (
        <ConfirmScreen
          itemData={itemData}
          onConfirm={handleConfirm}
          onRetry={handleRetry}
        />
      ) : (
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
