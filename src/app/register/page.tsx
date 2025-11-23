'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

  // processing 단계에서 mockAnalysis 실행 후 confirm으로 이동
  useEffect(() => {
    if (step === 'processing') {
      mockAnalysis().then((data) => {
        setItemData(data);
        setStep('confirm');
      });
    }
  }, [step]);

  // 핸들러 함수들
  const handleStart = () => setStep('insert');
  const handleInsertComplete = () => setStep('processing');
  const handleConfirm = () => setStep('complete');
  const handleRetry = () => {
    setStep('wait');
    setItemData(null);
  };
  const handleNewRegistration = () => {
    setStep('wait');
    setItemData(null);
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
      return itemData ? (
        <ConfirmScreen
          itemData={itemData}
          onConfirm={handleConfirm}
          onRetry={handleRetry}
        />
      ) : null;

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
