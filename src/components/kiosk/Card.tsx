'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-[24px] shadow-lg p-12',
        className
      )}
    >
      {children}
    </div>
  );
}
