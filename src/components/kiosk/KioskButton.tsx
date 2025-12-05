'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface KioskButtonProps {
  variant?: 'primary' | 'secondary' | 'below' | 'warning' | 'success' | 'dark';
  size?: 'large' | 'medium' | 'small';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  compact?: boolean;
  className?: string;
}

export default function KioskButton({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  compact = false,
  className,
}: KioskButtonProps) {
  const [pressed, setPressed] = useState(false);

  // 기본 상태 색상
  const baseColors = {
    primary: 'bg-[#4caf50] text-white',
    secondary: 'bg-white border-2 border-gray-300 text-[#6c757d]',
    below: 'bg-[#59969d] text-white',
    warning: 'bg-[#ff9800] text-white',
    success: 'bg-[#4caf50] text-white',
    dark: 'bg-[#475569] text-white',
  };

  // 눌림 상태 색상
  const pressedColors = {
    primary: 'bg-[#3d8b40] text-white',
    secondary: 'bg-gray-100 border-2 border-gray-300 text-[#6c757d]',
    below: 'bg-[#3d6a6f] text-white',
    warning: 'bg-[#e65100] text-white',
    success: 'bg-[#3d8b40] text-white',
    dark: 'bg-[#1e293b] text-white',
  };

  const sizes = {
    large: 'py-[clamp(24px,3.5vh,40px)] text-[clamp(28px,4vh,48px)]',
    medium: 'py-[clamp(20px,3vh,32px)] text-[clamp(24px,3.5vh,40px)]',
    small: 'py-[clamp(16px,2.5vh,28px)] text-[clamp(20px,3vh,36px)]',
  };

  const getWidthClass = () => {
    if (compact) return 'w-[clamp(220px,40vmin,300px)]';
    if (fullWidth) return 'w-full';
    return 'w-auto px-[clamp(32px,6vmin,48px)]';
  };

  const handlePointerDown = () => {
    if (disabled) return;
    setPressed(true);
  };

  const handlePointerUp = () => {
    if (disabled) return;
    setPressed(false);
    // 떼짐 효과가 보인 후 onClick 실행
    setTimeout(() => {
      onClick?.();
    }, 80);
  };

  const handlePointerLeave = () => {
    setPressed(false);
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      disabled={disabled}
      className={cn(
        'rounded-full font-bold transition-all duration-100',
        pressed ? pressedColors[variant] : baseColors[variant],
        pressed ? 'scale-[0.96]' : 'scale-100',
        sizes[size],
        getWidthClass(),
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}
