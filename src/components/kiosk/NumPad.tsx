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
  const buttons = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9,
  ];

  return (
    <div className={cn('grid grid-cols-3 gap-1 max-w-[600px]', className)}>
      {/* 숫자 버튼 1-9 */}
      {buttons.map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num)}
          className="h-20 bg-white hover:bg-gray-50 text-[30px] font-semibold text-[#2c3e50] transition-colors border border-gray-200"
        >
          {num}
        </button>
      ))}

      {/* 지우기 버튼 */}
      <button
        onClick={onDelete}
        className="h-20 bg-[#ffebee] hover:bg-[#ffcdd2] flex items-center justify-center transition-colors border border-gray-200"
      >
        <Delete className="w-7 h-7 text-[#d32f2f]" />
      </button>

      {/* 0 버튼 */}
      <button
        onClick={() => onNumberClick(0)}
        className="h-20 bg-white hover:bg-gray-50 text-[30px] font-semibold text-[#2c3e50] transition-colors border border-gray-200"
      >
        0
      </button>

      {/* 확인 버튼 */}
      <button
        onClick={onSubmit}
        disabled={submitDisabled}
        className="h-20 bg-[#e3f2fd] hover:bg-[#bbdefb] text-[20px] font-bold text-[#1976d2] transition-colors border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        확인
      </button>
    </div>
  );
}
