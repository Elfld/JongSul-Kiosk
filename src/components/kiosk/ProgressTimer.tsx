'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressTimerProps {
  duration?: number;
  onComplete: () => void;
  message?: string;
  color?: string;
  className?: string;
}

export default function ProgressTimer({
  duration = 5,
  onComplete,
  message = '초 후 처음 화면으로 돌아갑니다',
  color = '#4caf50',
  className,
}: ProgressTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className={cn('w-full max-w-[400px]', className)}>
      <p className="text-[14px] text-[#6c757d] text-center mb-2">
        {timeLeft}{message}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-1000"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
