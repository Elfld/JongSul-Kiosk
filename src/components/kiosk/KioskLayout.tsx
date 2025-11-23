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
        'h-screen overflow-hidden bg-gray-50',
        centered && 'flex items-center justify-center',
        className
      )}
    >
      <div className="w-full max-w-[768px] h-full px-6 py-6 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
