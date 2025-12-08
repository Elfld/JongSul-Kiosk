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
        'bg-white rounded-[clamp(16px,2.5vmin,56px)] shadow-lg p-[clamp(32px,6vmin,132px)]',
        className
      )}
    >
      {children}
    </div>
  );
}
