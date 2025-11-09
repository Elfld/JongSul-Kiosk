'use client';

import { cn } from '@/lib/utils';

interface KioskButtonProps {
  variant?: 'primary' | 'secondary' | 'warning' | 'success' | 'dark';
  size?: 'large' | 'medium' | 'small';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function KioskButton({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  className,
}: KioskButtonProps) {
  const variants = {
    primary: 'bg-[#4caf50] text-white hover:bg-[#45a049]',
    secondary: 'bg-white border-2 border-gray-300 text-[#6c757d] hover:bg-gray-50',
    warning: 'bg-[#ff9800] text-white hover:bg-[#f57c00]',
    success: 'bg-[#4caf50] text-white hover:bg-[#45a049]',
    dark: 'bg-[#475569] text-white hover:bg-[#334155]',
  };

  const sizes = {
    large: 'py-6 text-[24px]',
    medium: 'py-5 text-[24px]',
    small: 'py-4 text-[20px]',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-full font-bold transition-colors',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : 'w-auto px-12',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}
