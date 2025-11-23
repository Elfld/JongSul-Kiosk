'use client';

import { Delete } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumPadProps {
  onNumberClick: (num: number) => void;
  onDelete: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
  className?: string;
}

export default function NumPad({
  onNumberClick,
  onDelete,
  onSubmit,
  submitDisabled = false,
  className,
}: NumPadProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={cn('w-full max-w-[clamp(300px,55vmin,520px)] mx-auto', className)}>
      <div className="rounded-[16px] overflow-hidden border-2 border-gray-200 bg-white">
        <div className="grid grid-cols-3">
          {/* 숫자 버튼 1-9 */}
          {numbers.map((num, index) => (
            <button
              key={num}
              onClick={() => onNumberClick(num)}
              className={cn(
                'h-[clamp(44px,8vmin,70px)] bg-white hover:bg-gray-50 active:bg-gray-200 text-[clamp(18px,3.5vmin,28px)] font-medium text-[#2c3e50] transition-colors',
                // 오른쪽 테두리: 3의 배수가 아닌 경우에만
                index % 3 !== 2 && 'border-r border-gray-200',
                // 아래 테두리: 마지막 줄(7,8,9)이 아닌 경우에만
                index < 6 && 'border-b border-gray-200'
              )}
            >
              {num}
            </button>
          ))}

          {/* 지우기 버튼 */}
          <button
            onClick={onDelete}
            className="h-[clamp(44px,8vmin,70px)] bg-[#ffebee] hover:bg-[#ffcdd2] active:bg-[#ef9a9a] flex items-center justify-center transition-colors border-r border-t border-gray-200"
          >
            <Delete className="w-[clamp(18px,3.5vmin,24px)] h-[clamp(18px,3.5vmin,24px)] text-[#d32f2f]" />
          </button>

          {/* 0 버튼 */}
          <button
            onClick={() => onNumberClick(0)}
            className="h-[clamp(44px,8vmin,70px)] bg-white hover:bg-gray-50 active:bg-gray-200 text-[clamp(18px,3.5vmin,28px)] font-medium text-[#2c3e50] transition-colors border-r border-t border-gray-200"
          >
            0
          </button>

          {/* 확인 버튼 */}
          <button
            onClick={onSubmit}
            disabled={submitDisabled}
            className="h-[clamp(44px,8vmin,70px)] bg-[#e3f2fd] text-[clamp(14px,2.5vmin,18px)] font-semibold text-[#1976d2] transition-colors border-t border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 hover:enabled:bg-[#bbdefb] active:enabled:bg-[#90caf9]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
