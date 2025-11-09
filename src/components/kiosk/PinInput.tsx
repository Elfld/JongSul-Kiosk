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
        const digit = pinCode[index] || '';

        return (
          <div
            key={index}
            className={cn(
              'w-16 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold transition-all',
              hasValue
                ? 'bg-sky-100 border-2 border-sky-500 text-sky-700'
                : 'bg-white border-2 border-gray-300 text-gray-300'
            )}
          >
            {hasValue ? digit : '·'}
          </div>
        );
      })}
    </div>
  );
}
