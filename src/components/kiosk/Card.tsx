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
        'bg-white rounded-[max(20px,4vmin)] shadow-lg p-[max(40px,8vmin)]',
        className
      )}
    >
      {children}
    </div>
  );
}
