import { KioskItemData } from '@/lib/types/kiosk';

// 테스트용 지연 함수
export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

// 테스트용 분석 결과 (Mock)
export const mockAnalysis = async (): Promise<KioskItemData> => {
  await delay(2000);
  return {
    id: 'test-1',
    photoUrl: '/images/sample-phone.jpg',
    tags: ['휴대폰', '전자기기'],
    foundDate: '9월 12일 발견',
    location: '하이테크관 2층 분실물센터',
  };
};

// 테스트용 코드 검증 (Mock)
export const mockVerifyCode = async (code: string): Promise<{
  success: boolean;
  lockerNumber?: number;
}> => {
  await delay(1500);
  // 테스트: "123456"만 성공
  if (code === '123456') {
    return { success: true, lockerNumber: 3 };
  }
  return { success: false };
};
