'use client';

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
  const variants = {
    primary: 'bg-[#4caf50] text-white hover:bg-[#45a049] active:bg-[#3d8b40]',
    secondary: 'bg-white border-2 border-gray-300 text-[#6c757d] hover:bg-gray-50 active:bg-gray-100',
    below: 'bg-[#59969d] text-white hover:bg-[#4a7c82] active:bg-[#3d6a6f]',
    warning: 'bg-[#ff9800] text-white hover:bg-[#f57c00] active:bg-[#e65100]',
    success: 'bg-[#4caf50] text-white hover:bg-[#45a049] active:bg-[#3d8b40]',
    dark: 'bg-[#475569] text-white hover:bg-[#334155] active:bg-[#1e293b]',
  };

  const sizes = {
    large: 'py-[clamp(16px,2.5vmin,24px)] text-[clamp(18px,3vmin,24px)]',
    medium: 'py-[clamp(14px,2.2vmin,20px)] text-[clamp(18px,3vmin,24px)]',
    small: 'py-[clamp(12px,2vmin,16px)] text-[clamp(16px,2.5vmin,20px)]',
  };

  const getWidthClass = () => {
    if (compact) return 'w-[clamp(220px,40vmin,300px)]';
    if (fullWidth) return 'w-full';
    return 'w-auto px-[clamp(32px,6vmin,48px)]';
  };

  const handleClick = () => {
    if (disabled || !onClick) return;
    setTimeout(() => {
      onClick();
    }, 80);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'rounded-full font-bold transition-all duration-100 active:scale-[0.96]',
        variants[variant],
        sizes[size],
        getWidthClass(),
        disabled && 'opacity-50 cursor-not-allowed active:scale-100',
        className
      )}
    >
      {children}
    </button>
  );
}
