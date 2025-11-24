'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { kioskApi } from '@/lib/api/kiosk';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // verifying 단계에서 kioskApi.pickup 실행 후 결과에 따라 전환
  useEffect(() => {
    if (step === 'verifying') {
      setErrorMessage(null);
      kioskApi
        .pickup(pinCode)
        .then((response) => {
          // 성공: 사물함 번호 저장 후 locker 화면으로
          const lockerId = response.item.locker_id;
          if (lockerId != null) {
            setLockerNumber(lockerId);
            setStep('locker');
          } else {
            // locker_id가 없는 경우 (예외 상황)
            setErrorMessage('사물함이 배정되지 않은 아이템입니다 (locker_id: null)');
            setStep('error');
          }
        })
        .catch(async (error) => {
          // 실패: 에러 메시지 저장 후 에러 화면으로
          let message = error.message || '알 수 없는 오류';
          if (error.status) {
            message = `[${error.status}] ${message}`;
          }
          setErrorMessage(message);
          setStep('error');
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
      return <ErrorScreen onRetry={handleRetry} errorMessage={errorMessage} />;

    case 'locker':
      return lockerNumber ? (
        <LockerScreen
          lockerNumber={lockerNumber}
          pickupCode={pinCode}
          onComplete={handleLockerComplete}
        />
      ) : null;

    case 'complete':
      return <CompleteScreen onTimeout={handleBackToHome} />;

    default:
      return null;
  }
}
