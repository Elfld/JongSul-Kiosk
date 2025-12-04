'use client';

import { Check, X, LockOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusIconProps {
  type: 'success' | 'error' | 'warning' | 'unlock' | 'party';
  className?: string;
}

export default function StatusIcon({ type, className }: StatusIconProps) {
  const configs = {
    success: {
      bg: 'bg-[#e8f5e9]',
      iconColor: 'text-[#4caf50]',
      Icon: Check,
    },
    error: {
      bg: 'bg-[#ffebee]',
      iconColor: 'text-[#e53935]',
      Icon: X,
    },
    warning: {
      bg: 'bg-[#ffebee]',
      iconColor: 'text-[#e53935]',
      Icon: X,
    },
    unlock: {
      bg: 'bg-[#e3f2fd]',
      iconColor: 'text-[#1976d2]',
      Icon: LockOpen,
    },
    party: {
      bg: 'bg-[#e8f5e9]',
      iconColor: 'text-[#4caf50]',
      Icon: Check,
    },
  };

  const config = configs[type];
  const Icon = config.Icon;

  return (
    <div
      className={cn(
        'w-[clamp(64px,12vmin,96px)] h-[clamp(64px,12vmin,96px)] rounded-full flex items-center justify-center',
        config.bg,
        className
      )}
    >
      <Icon className={cn('w-[clamp(32px,6vmin,48px)] h-[clamp(32px,6vmin,48px)] stroke-[2.5]', config.iconColor)} />
    </div>
  );
}
