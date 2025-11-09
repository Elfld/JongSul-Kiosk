'use client';

import { cn } from '@/lib/utils';

interface KioskButtonProps {
  variant?: 'primary' | 'secondary' | 'warning' | 'success';
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
    primary: 'bg-sky-500 text-white hover:bg-sky-600',
    secondary: 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
    warning: 'bg-orange-500 text-white hover:bg-orange-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
  };

  const sizes = {
    large: 'py-6 text-2xl',
    medium: 'py-5 text-2xl',
    small: 'py-4 text-xl',
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
