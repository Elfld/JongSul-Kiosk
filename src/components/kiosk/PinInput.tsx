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
    <div className={cn('flex justify-center gap-3 my-8', className)}>
      {Array.from({ length }).map((_, index) => {
        const hasValue = index < pinCode.length;

        return (
          <div
            key={index}
            className={cn(
              'w-16 h-20 rounded-[16px] flex items-center justify-center text-[30px] font-bold transition-all',
              hasValue
                ? 'bg-[#e3f2fd] border-2 border-[#1976d2] text-[#1976d2]'
                : 'bg-white border-2 border-gray-300 text-gray-300'
            )}
          >
            {hasValue ? '●' : '·'}
          </div>
        );
      })}
    </div>
  );
}
