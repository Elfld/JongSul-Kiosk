'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockVerifyCode } from '@/lib/utils/kiosk';
import type { RetrieveStep } from '@/lib/types/kiosk';
import {
  InputScreen,
  VerifyingScreen,
  ErrorScreen,
  LockerScreen,
  CompleteScreen,
} from '@/components/kiosk/retrieve';

export default function RetrievePage() {
  const router = useRouter();
  const [step, setStep] = useState<RetrieveStep>('input');
  const [pinCode, setPinCode] = useState('');
  const [lockerNumber, setLockerNumber] = useState<number | null>(null);

  // verifying 단계에서 mockVerifyCode 실행 후 결과에 따라 전환
  useEffect(() => {
    if (step === 'verifying') {
      mockVerifyCode(pinCode).then((result) => {
        if (result.success && result.lockerNumber) {
          setLockerNumber(result.lockerNumber);
          setStep('locker');
        } else {
          setStep('error');
        }
      });
    }
  }, [step, pinCode]);

  // 핸들러 함수들
  const handlePinChange = (code: string) => setPinCode(code);

  const handleSubmit = () => {
    if (pinCode.length === 6) {
      setStep('verifying');
    }
  };

  const handleRetry = () => {
    setPinCode('');
    setStep('input');
  };

  const handleLockerComplete = () => setStep('complete');

  const handleBackToHome = () => router.push('/');

  // step에 따라 화면 렌더링
  switch (step) {
    case 'input':
      return (
        <InputScreen
          pinCode={pinCode}
          onPinChange={handlePinChange}
          onSubmit={handleSubmit}
          onBack={handleBackToHome}
        />
      );

    case 'verifying':
      return <VerifyingScreen />;

    case 'error':
      return <ErrorScreen onRetry={handleRetry} />;

    case 'locker':
      return lockerNumber ? (
        <LockerScreen
          lockerNumber={lockerNumber}
          onComplete={handleLockerComplete}
        />
      ) : null;

    case 'complete':
      return <CompleteScreen onTimeout={handleBackToHome} />;

    default:
      return null;
  }
}
