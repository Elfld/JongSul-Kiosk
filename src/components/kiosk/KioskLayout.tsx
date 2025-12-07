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
      <div className="w-full max-w-[min(600px,70vmin)] px-6 py-8 flex flex-col justify-center mx-auto">
        {children}
      </div>
    </div>
  );
}
