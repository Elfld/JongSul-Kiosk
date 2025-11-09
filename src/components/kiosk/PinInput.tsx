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
    <div className={cn('flex justify-center gap-4 my-6', className)}>
      {Array.from({ length }).map((_, index) => {
        const isActive = index === pinCode.length && pinCode.length < 6;
        const isFilled = index < pinCode.length;

        return (
          <div
            key={index}
            className={cn(
              'w-[60px] h-[70px] rounded-[12px] flex items-center justify-center transition-all',
              isActive
                ? 'bg-white border-[3px] border-[#1976d2]'
                : isFilled
                ? 'bg-white border-2 border-gray-300'
                : 'bg-white border-2 border-gray-300'
            )}
          >
            {/* 빈 상태 - 아무것도 표시 안함 */}
          </div>
        );
      })}
    </div>
  );
}
