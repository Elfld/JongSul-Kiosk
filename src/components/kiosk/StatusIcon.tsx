'use client';

import { Check, AlertCircle, LockOpen, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusIconProps {
  type: 'success' | 'error' | 'warning' | 'unlock' | 'party';
  className?: string;
}

export default function StatusIcon({ type, className }: StatusIconProps) {
  const configs = {
    success: {
      bg: 'bg-[#4caf50]',
      Icon: Check,
    },
    error: {
      bg: 'bg-red-500',
      Icon: AlertCircle,
    },
    warning: {
      bg: 'bg-[#ff9800]',
      Icon: AlertCircle,
    },
    unlock: {
      bg: 'bg-[#4caf50]',
      Icon: LockOpen,
    },
    party: {
      bg: 'bg-[#1976d2]',
      Icon: PartyPopper,
    },
  };

  const config = configs[type];
  const Icon = config.Icon;

  return (
    <div
      className={cn(
        'w-40 h-40 rounded-full flex items-center justify-center',
        config.bg,
        className
      )}
    >
      <Icon className="w-24 h-24 text-white stroke-[3]" />
    </div>
  );
}
