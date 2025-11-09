'use client';

import { Delete } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumPadProps {
  onNumberPress: (num: number) => void;
  onDelete: () => void;
  onConfirm: () => void;
  disabled?: boolean;
  className?: string;
}

export default function NumPad({
  onNumberPress,
  onDelete,
  onConfirm,
  disabled = false,
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
          onClick={() => onNumberPress(num)}
          disabled={disabled}
          className="h-20 bg-white hover:bg-gray-50 text-3xl font-semibold text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {num}
        </button>
      ))}

      {/* 지우기 버튼 */}
      <button
        onClick={onDelete}
        disabled={disabled}
        className="h-20 bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-50"
      >
        <Delete className="w-7 h-7 text-red-500" />
      </button>

      {/* 0 버튼 */}
      <button
        onClick={() => onNumberPress(0)}
        disabled={disabled}
        className="h-20 bg-white hover:bg-gray-50 text-3xl font-semibold text-gray-800 transition-colors disabled:opacity-50"
      >
        0
      </button>

      {/* 확인 버튼 */}
      <button
        onClick={onConfirm}
        disabled={disabled}
        className="h-20 bg-sky-50 hover:bg-sky-100 text-xl font-bold text-sky-600 transition-colors disabled:opacity-50"
      >
        확인
      </button>
    </div>
  );
}
