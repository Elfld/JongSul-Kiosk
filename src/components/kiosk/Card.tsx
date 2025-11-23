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
        'bg-white rounded-[clamp(16px,2.5vmin,24px)] shadow-lg p-[clamp(20px,4vmin,48px)]',
        className
      )}
    >
      {children}
    </div>
  );
}
