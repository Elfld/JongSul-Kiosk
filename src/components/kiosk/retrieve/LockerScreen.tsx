'use client';

import { useEffect, useRef, useState } from 'react';
import { KioskLayout, KioskButton, StatusIcon, Card, ProgressTimer } from '@/components/kiosk';
import { kioskApi } from '@/lib/api/kiosk';

interface LockerScreenProps {
  lockerNumber: number;
  pickupCode: string;
  onComplete: () => void;
}

const TIMEOUT_SECONDS = 60;

export default function LockerScreen({ lockerNumber, pickupCode, onComplete }: LockerScreenProps) {
  const [isClosing, setIsClosing] = useState(false);
  const hasClosedRef = useRef(false);

  // 사물함 닫기 처리
  const handleClose = async () => {
    if (hasClosedRef.current || isClosing) return;

    hasClosedRef.current = true;
    setIsClosing(true);

    try {
      await kioskApi.closeLocker(pickupCode);
    } catch (error) {
      // 닫기 실패해도 완료 처리 (사용자 경험 우선)
      console.error('Failed to close locker:', error);
    }

    onComplete();
  };

  // 타이머 만료 시 자동 닫기
  const handleTimeout = () => {
    handleClose();
  };

  // 컴포넌트 언마운트 시 닫기 시도
  useEffect(() => {
    return () => {
      if (!hasClosedRef.current) {
        kioskApi.closeLocker(pickupCode).catch(() => {});
      }
    };
  }, [pickupCode]);

  return (
    <KioskLayout>
      <Card className="flex flex-col items-center gap-[2vmin] max-w-[clamp(320px,55vmin,650px)] mx-auto">
        <StatusIcon type="unlock" />

        <h1 className="text-[clamp(20px,3.5vmin,38px)] font-bold text-[#2c3e50] text-center">
          사물함 {lockerNumber}번이 열렸습니다
        </h1>

        <p className="text-[clamp(14px,2.5vmin,30px)] text-[#6c757d] text-center leading-relaxed">
          분실물을 수령하신 후
          <br />
          문을 닫아주세요
        </p>

        <ProgressTimer
          duration={TIMEOUT_SECONDS}
          onComplete={handleTimeout}
        />

        <KioskButton
          variant="success"
          size="medium"
          compact
          onClick={handleClose}
          disabled={isClosing}
          className="mt-[1vmin]"
        >
          {isClosing ? '닫는 중...' : '수령 완료'}
        </KioskButton>
      </Card>
    </KioskLayout>
  );
}
