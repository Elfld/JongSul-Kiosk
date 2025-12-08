'use client';

import { cn } from '@/lib/utils';

interface KioskLayoutProps {
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export default function KioskLayout({
  children,
  centered = true,
  className,
}: KioskLayoutProps) {
  return (
    <div
      className={cn(
        'min-h-screen h-[100dvh] bg-gray-50',
        centered && 'flex items-center justify-center',
        className
      )}
    >
      <div className="w-full max-w-[1800px] h-full px-[4vmin] py-[3vmin] flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
