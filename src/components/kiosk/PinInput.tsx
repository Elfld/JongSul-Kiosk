'use client';

import { cn } from '@/lib/utils';

interface PinInputProps {
  length?: number;
  pinCode: string;
  className?: string;
}

export default function PinInput({
  length = 6,
  pinCode,
  className,
}: PinInputProps) {
  return (
    <div className={cn('flex justify-center gap-[max(8px,1vmin)] my-[max(12px,1.5vmin)]', className)}>
      {Array.from({ length }).map((_, index) => {
        const isActive = index === pinCode.length && pinCode.length < 6;
        const isFilled = index < pinCode.length;
        const digit = pinCode[index] || '';

        return (
          <div
            key={index}
            className={cn(
              'w-[max(50px,5vmin)] h-[max(64px,6vmin)] rounded-[max(8px,1vmin)] flex items-center justify-center text-[max(20px,2vmin)] font-semibold transition-all',
              isActive
                ? 'bg-white border-[3px] border-[#1976d2] text-[#1976d2]'
                : isFilled
                ? 'bg-white border-2 border-gray-300 text-[#2c3e50]'
                : 'bg-white border-2 border-gray-300 text-transparent'
            )}
          >
            {digit}
          </div>
        );
      })}
    </div>
  );
}
