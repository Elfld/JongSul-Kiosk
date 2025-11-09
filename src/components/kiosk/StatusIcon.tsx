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
      bg: 'bg-sky-500',
      Icon: Check,
    },
    error: {
      bg: 'bg-red-500',
      Icon: AlertCircle,
    },
    warning: {
      bg: 'bg-orange-500',
      Icon: AlertCircle,
    },
    unlock: {
      bg: 'bg-green-500',
      Icon: LockOpen,
    },
    party: {
      bg: 'bg-sky-500',
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
