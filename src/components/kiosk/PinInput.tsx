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
    <div className={cn('flex justify-center gap-[1vmin] my-[1.5vmin]', className)}>
      {Array.from({ length }).map((_, index) => {
        const isActive = index === pinCode.length && pinCode.length < 6;
        const isFilled = index < pinCode.length;
        const digit = pinCode[index] || '';

        return (
          <div
            key={index}
            className={cn(
              'w-[clamp(40px,7vmin,110px)] h-[clamp(50px,9vmin,145px)] rounded-[clamp(8px,1.5vmin,32px)] flex items-center justify-center text-[clamp(20px,3.5vmin,60px)] font-semibold transition-all',
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
