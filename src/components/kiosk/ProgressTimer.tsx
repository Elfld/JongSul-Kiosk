'use client';

import { useEffect, useState, useRef } from 'react';
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
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      const currentProgress = Math.min(100, (elapsed / duration) * 100);

      setTimeLeft(Math.ceil(remaining));
      setProgress(currentProgress);

      if (elapsed >= duration) {
        onComplete();
      } else {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [duration, onComplete]);

  return (
    <div className={cn('w-full max-w-[400px]', className)}>
      <p className="text-[14px] text-[#6c757d] text-center mb-2">
        {timeLeft}{message}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
