import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '인하대 분실물 키오스크',
  description: '24시간 분실물 등록 및 수령 서비스',
};

export default function KioskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
