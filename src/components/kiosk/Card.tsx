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
        'bg-white rounded-[max(16px,2vmin)] shadow-lg p-[max(24px,3vmin)]',
        className
      )}
    >
      {children}
    </div>
  );
}
