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
          // 응답 전체 로깅 (디버깅용)
          console.log('[등록 API 응답]', {
            status: response.status,
            message: response.message,
            category: response.category,
            image_url: response.image_url,
          });

          // 상태 검증
          if (response.status !== 'success') {
            console.error('[등록 실패] status:', response.status, 'message:', response.message);
            throw new Error(`서버 오류: ${response.message || '알 수 없는 오류'}`);
          }

          // 이미지 URL 검증
          if (!response.image_url) {
            console.error('[등록 실패] image_url이 없음');
            throw new Error('사진을 가져올 수 없습니다');
          }

          // 카테고리 검증
          if (!response.category) {
            console.error('[등록 실패] category가 없음');
            throw new Error('분류 정보를 가져올 수 없습니다');
          }

          // 등록 성공 → 완료 화면으로
          console.log('[등록 성공]');
          const data: RegisteredItemData = {
            photoUrl: response.image_url,
            category: response.category,
            registeredAt: new Date().toISOString(),
            location: LOCATION,
          };
          setItemData(data);
          setStep('complete');
        })
        .catch((err) => {
          // 에러 상세 로깅
          console.error('[등록 에러]', {
            name: err.name,
            message: err.message,
            status: err.status,
            detail: err.detail,
          });

          // 실패 시 에러 메시지 저장하고 wait로 복귀
          let errorMsg = '등록 요청 실패';

          // KioskApiError 처리
          if (err.status === 0) {
            errorMsg = '서버에 연결할 수 없습니다';
          } else if (err.message) {
            errorMsg = err.message;
          }

          setErrorMessage(errorMsg);
          setItemData(null);
          setStep('wait');
        });
    }
  }, [step]);

  // 핸들러 함수들
  const handleRegister = () => {
    console.log('[등록 시작]');
    setStep('processing');
  };

  const handleNewRegistration = () => {
    console.log('[새로운 등록]');
    setErrorMessage(null);
    setItemData(null);
    setStep('wait');
  };

  const handleBackToHome = () => {
    console.log('[홈으로]');
    router.push('/');
  };

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
