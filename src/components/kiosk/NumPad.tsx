'use client';

import { useState } from 'react';
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
  const [pressedKey, setPressedKey] = useState<number | string | null>(null);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handlePointerDown = (key: number | string) => {
    setPressedKey(key);
  };

  const handlePointerUp = (callback: () => void) => {
    setPressedKey(null);
    callback();
  };

  const handlePointerLeave = () => {
    setPressedKey(null);
  };

  return (
    <div className={cn('w-full max-w-[clamp(300px,55vmin,1150px)] mx-auto', className)}>
      <div className="rounded-[16px] overflow-hidden border-2 border-gray-200 bg-white select-none">
        <div className="grid grid-cols-3">
          {/* 숫자 버튼 1-9 */}
          {numbers.map((num, index) => (
            <button
              key={num}
              onPointerDown={() => handlePointerDown(num)}
              onPointerUp={() => handlePointerUp(() => onNumberClick(num))}
              onPointerLeave={handlePointerLeave}
              onPointerCancel={handlePointerLeave}
              className={cn(
                'h-[clamp(44px,8vmin,158px)] text-[clamp(18px,3.5vmin,68px)] font-medium text-[#2c3e50] transition-colors duration-75 select-none touch-manipulation',
                pressedKey === num ? 'bg-gray-200' : 'bg-white',
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
            onPointerDown={() => handlePointerDown('delete')}
            onPointerUp={() => handlePointerUp(onDelete)}
            onPointerLeave={handlePointerLeave}
            onPointerCancel={handlePointerLeave}
            className={cn(
              'h-[clamp(44px,8vmin,158px)] flex items-center justify-center transition-colors duration-75 border-r border-t border-gray-200 select-none touch-manipulation',
              pressedKey === 'delete' ? 'bg-[#ef9a9a]' : 'bg-[#ffebee]'
            )}
          >
            <Delete className="w-[clamp(18px,3.5vmin,56px)] h-[clamp(18px,3.5vmin,56px)] text-[#d32f2f]" />
          </button>

          {/* 0 버튼 */}
          <button
            onPointerDown={() => handlePointerDown(0)}
            onPointerUp={() => handlePointerUp(() => onNumberClick(0))}
            onPointerLeave={handlePointerLeave}
            onPointerCancel={handlePointerLeave}
            className={cn(
              'h-[clamp(44px,8vmin,158px)] text-[clamp(18px,3.5vmin,68px)] font-medium text-[#2c3e50] transition-colors duration-75 border-r border-t border-gray-200 select-none touch-manipulation',
              pressedKey === 0 ? 'bg-gray-200' : 'bg-white'
            )}
          >
            0
          </button>

          {/* 확인 버튼 */}
          <button
            onPointerDown={() => !submitDisabled && handlePointerDown('submit')}
            onPointerUp={() => !submitDisabled && handlePointerUp(onSubmit)}
            onPointerLeave={handlePointerLeave}
            onPointerCancel={handlePointerLeave}
            disabled={submitDisabled}
            className={cn(
              'h-[clamp(44px,8vmin,158px)] text-[clamp(14px,2.5vmin,42px)] font-semibold text-[#1976d2] transition-colors duration-75 border-t border-gray-200 select-none touch-manipulation',
              submitDisabled
                ? 'bg-gray-100 text-gray-400'
                : pressedKey === 'submit'
                ? 'bg-[#90caf9]'
                : 'bg-[#e3f2fd]'
            )}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
