
## 🎯 Claude Code에게 보낼 지시사항
```
이 파일은 세 페이지의 코드를 각각 단일 코드로 만든 파일이야.
1. src/app/kiosk/page.tsx
2. src/app/kiosk/register/page.tsx
3. src/app/kiosk/retrieve/page.tsx
위 세 페이지의 코드를 모듈화 없이 작성한 거야. 피그마 디자인의 요소들을 조금씩 개선해서 그대로 코드로 옮겨온 것이니, 지금 프로젝트의 코드 디자인 말고 해당 코드를 이용하도록 해.
지시를 용이하기 위해 단일 파일로 만든 것이니, 현재 프로젝트 구조처럼 리팩토링해서 프로젝트의 구조를 개선시켜야해. 방식은 똑같게, 디자인만 수정하는거야.


완료되면 테스트하고 결과 알려줘.

아래 부분이 코드야.

### 1. 메인 페이지 (src/app/kiosk)
```

'use client';

import { useRouter } from 'next/navigation';

export default function KioskMainPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-8">
      <div className="w-full max-w-[700px] flex flex-col items-center gap-12">
        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-[72px] font-bold text-[#2c3e50] leading-tight">
            인하대 분실물
          </h1>
          <h1 className="text-[72px] font-bold text-[#2c3e50] leading-tight">
            키오스크
          </h1>
        </div>

        {/* 부제 */}
        <p className="text-[36px] text-[#6c757d] font-medium">
          24시간 분실물 센터
        </p>

        {/* 버튼 영역 */}
        <div className="w-full max-w-[400px] flex flex-col gap-8 mt-8">
          {/* 분실물 등록 버튼 */}
          <button
            onClick={() => router.push('/kiosk/register')}
            className="w-full bg-[#4caf50] text-white py-6 rounded-full text-[24px] font-bold hover:bg-[#45a049] transition-colors"
          >
            분실물 등록
          </button>

          {/* 분실물 찾기 버튼 */}
          <button
            onClick={() => router.push('/kiosk/retrieve')}
            className="w-full bg-white border-2 border-[#d0d0d0] text-[#5c7a8a] py-6 rounded-full text-[24px] font-semibold hover:bg-gray-50 transition-colors"
          >
            분실물 찾기
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### 2. 등록 페이지 (src/app/kiosk/register)
```
```
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, PackageOpen, Smartphone, Check } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { delay } from '@/lib/utils/kiosk';

type RegisterStep = 'wait' | 'insert' | 'processing' | 'confirm' | 'complete';

interface ItemData {
  tags: string[];
  foundDate: string;
  location: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<RegisterStep>('wait');
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [timeLeft, setTimeLeft] = useState(5);

  // 시작하기
  const handleStart = () => {
    setStep('insert');
  };

  // 투입 완료
  const handleInsertComplete = async () => {
    setStep('processing');

    // 2초 후 분석 완료
    await delay(2000);
    setItemData({
      tags: ['휴대폰', '전자기기'],
      foundDate: '9월 12일 발견',
      location: '하이테크관 2층 분실물센터',
    });
    setStep('confirm');
  };

  // 확인
  const handleConfirm = () => {
    setStep('complete');
    startTimer();
  };

  // 다시 하기
  const handleRetry = () => {
    setItemData(null);
    setStep('wait');
  };

  // 새로운 등록
  const handleNewRegister = () => {
    setItemData(null);
    setStep('wait');
  };

  // 처음 화면으로
  const handleHome = () => {
    router.push('/kiosk');
  };

  // 타이머 시작
  const startTimer = () => {
    let remaining = 5;
    const interval = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        router.push('/kiosk');
      }
    }, 1000);
  };

  return (
    <>
      {/* 1. 대기 화면 */}
      {step === 'wait' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-8">
          <div className="w-full max-w-[600px] flex flex-col items-center gap-12">
            <h1 className="text-[60px] font-bold text-[#2c3e50] text-center">
              분실물 등록
            </h1>

            <p className="text-[30px] text-[#6c757d] text-center">
              분실물을 투입구에 넣어주세요
            </p>

            {/* 박스 영역 */}
            <div className="w-[400px] h-[250px] border-4 border-dashed border-gray-300 rounded-[24px] bg-white flex items-center justify-center">
              <Package className="w-24 h-24 text-gray-300" strokeWidth={2} />
            </div>

            {/* 시작하기 버튼 */}
            <button
              onClick={handleStart}
              className="w-[250px] bg-[#4caf50] text-white py-5 rounded-full text-[24px] font-bold hover:bg-[#45a049] transition-colors"
            >
              시작하기
            </button>

            {/* 처음 화면으로 버튼 */}
            <button
              onClick={handleHome}
              className="w-[250px] bg-white border-2 border-gray-300 text-[#6c757d] py-4 rounded-full text-[20px] font-semibold hover:bg-gray-50 transition-colors"
            >
              처음 화면으로
            </button>
          </div>
        </div>
      )}

      {/* 2. 투입 화면 */}
      {step === 'insert' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-8">
          <div className="w-full max-w-[600px] flex flex-col items-center gap-12">
            <h1 className="text-[60px] font-bold text-[#2c3e50] text-center">
              투입구가 열렸습니다
            </h1>

            <p className="text-[30px] text-[#6c757d] text-center leading-relaxed">
              분실물을 넣고
              <br />
              투입 완료 버튼을 눌러주세요
            </p>

            {/* 열린 박스 영역 */}
            <div className="w-[400px] h-[250px] border-4 border-[#4caf50] rounded-[24px] bg-white flex items-center justify-center">
              <PackageOpen className="w-20 h-20 text-[#4caf50]" strokeWidth={2} />
            </div>

            {/* 투입 완료 버튼 */}
            <button
              onClick={handleInsertComplete}
              className="w-[250px] bg-[#4caf50] text-white py-5 rounded-full text-[24px] font-bold hover:bg-[#45a049] transition-colors"
            >
              투입 완료
            </button>

            {/* 처음 화면으로 버튼 */}
            <button
              onClick={handleHome}
              className="w-[250px] bg-white border-2 border-gray-300 text-[#6c757d] py-4 rounded-full text-[20px] font-semibold hover:bg-gray-50 transition-colors"
            >
              처음 화면으로
            </button>
          </div>
        </div>
      )}

      {/* 3. 분석 중 화면 */}
      {step === 'processing' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-[60px] font-bold text-[#2c3e50]">분석 중</h1>
            <p className="text-[30px] text-[#6c757d]">
              분실물을 인식하고 있어요...
            </p>
            <div className="mt-8">
              <LoadingSpinner />
            </div>
          </div>
        </div>
      )}

      {/* 4. 정보 확인 화면 */}
      {step === 'confirm' && itemData && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-8">
          <div className="w-full max-w-[600px] flex flex-col gap-8 py-12">
            <h1 className="text-[48px] font-bold text-[#2c3e50]">
              등록 정보 확인
            </h1>

            <p className="text-[24px] text-[#6c757d]">
              인식된 정보가 맞는지 확인해주세요
            </p>

            {/* 카드 */}
            <div className="bg-white rounded-[24px] p-8 flex flex-col items-center gap-6 shadow-lg">
              {/* 사진 영역 */}
              <div className="w-[200px] h-[200px] bg-gray-100 rounded-[16px] overflow-hidden flex items-center justify-center">
                <Smartphone className="w-16 h-16 text-gray-400" />
              </div>

              {/* 태그 */}
              <div className="flex gap-3">
                {itemData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-[#e3f2fd] text-[#1976d2] rounded-full text-[18px] font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 날짜 */}
              <p className="text-[18px] text-[#6c757d]">{itemData.foundDate}</p>

              {/* 위치 */}
              <p className="text-[20px] text-[#2c3e50] font-medium">
                📍 {itemData.location}
              </p>
            </div>

            {/* 버튼 영역 */}
            <div className="flex flex-col gap-4 w-full max-w-[400px] mx-auto mt-4">
              <button
                onClick={handleConfirm}
                className="w-full bg-[#4caf50] text-white py-4 rounded-full text-[20px] font-bold hover:bg-[#45a049] transition-colors"
              >
                네, 맞아요
              </button>

              <button
                onClick={handleRetry}
                className="w-full bg-white border-2 border-gray-300 text-[#6c757d] py-4 rounded-full text-[20px] font-semibold hover:bg-gray-50 transition-colors"
              >
                아니요, 다시 할게요
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. 등록 완료 화면 */}
      {step === 'complete' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-10">
            {/* 체크 아이콘 */}
            <div className="w-40 h-40 bg-[#4caf50] rounded-full flex items-center justify-center">
              <Check className="w-24 h-24 text-white" strokeWidth={3} />
            </div>

            {/* 타이틀 */}
            <h1 className="text-[60px] font-bold text-[#2c3e50]">등록 완료</h1>

            {/* 설명 */}
            <p className="text-[24px] text-[#6c757d] text-center leading-relaxed">
              분실물이 성공적으로 등록되었어요
              <br />
              안심하고 돌아가세요
            </p>

            {/* 새로운 등록 버튼 */}
            <button
              onClick={handleNewRegister}
              className="w-[300px] bg-[#4caf50] text-white py-5 rounded-full text-[24px] font-bold hover:bg-[#45a049] transition-colors"
            >
              새로운 등록
            </button>

            {/* 프로그레스 바 */}
            <div className="w-[400px] mt-8">
              <p className="text-[14px] text-[#6c757d] text-center mb-2">
                {timeLeft}초 후 처음 화면으로 돌아갑니다
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#4caf50] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

---

### 3. 찾기 페이지 (src/app/kiosk/retrieve)
```
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockOpen, PartyPopper, AlertCircle, Delete } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { delay } from '@/lib/utils/kiosk';

type RetrieveStep = 'input' | 'verifying' | 'error' | 'locker' | 'complete';

export default function RetrievePage() {
  const router = useRouter();
  const [step, setStep] = useState<RetrieveStep>('input');
  const [pinCode, setPinCode] = useState('');
  const [lockerNumber, setLockerNumber] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(5);

  // 숫자 입력
  const handleNumberPress = (num: number) => {
    if (pinCode.length < 6) {
      setPinCode(pinCode + num);
    }
  };

  // 지우기
  const handleDelete = () => {
    setPinCode(pinCode.slice(0, -1));
  };

  // 확인
  const handleConfirm = async () => {
    if (pinCode.length !== 6) return;

    setStep('verifying');

    // 1.5초 대기
    await delay(1500);

    // 코드 검증 (123456만 성공)
    if (pinCode === '123456') {
      setLockerNumber(3);
      setStep('locker');
    } else {
      setStep('error');
    }
  };

  // 다시 시도
  const handleRetry = () => {
    setPinCode('');
    setStep('input');
  };

  // 수령 완료
  const handlePickupComplete = () => {
    setStep('complete');
    startTimer();
  };

  // 처음 화면으로
  const handleHome = () => {
    router.push('/kiosk');
  };

  // 타이머 시작
  const startTimer = () => {
    let remaining = 5;
    const interval = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        router.push('/kiosk');
      }
    }, 1000);
  };

  return (
    <>
      {/* 1. 코드 입력 화면 */}
      {step === 'input' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-8">
          <div className="w-full max-w-[600px] flex flex-col gap-8 py-12">
            <h1 className="text-[60px] font-bold text-[#2c3e50]">분실물 수령</h1>

            <p className="text-[24px] text-[#6c757d] text-center leading-relaxed">
              홈페이지에서 발급받은
              <br />
              비밀번호 6자리를 입력해주세요
            </p>

            {/* PIN 입력 박스 */}
            <div className="flex justify-center gap-3 my-8">
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const hasValue = index < pinCode.length;
                return (
                  <div
                    key={index}
                    className={`w-16 h-20 rounded-[16px] flex items-center justify-center text-[30px] font-bold transition-all ${
                      hasValue
                        ? 'bg-[#e3f2fd] border-2 border-[#1976d2] text-[#1976d2]'
                        : 'bg-white border-2 border-gray-300 text-gray-300'
                    }`}
                  >
                    {hasValue ? '●' : '·'}
                  </div>
                );
              })}
            </div>

            {/* 숫자 키패드 */}
            <div className="grid grid-cols-3 gap-1 max-w-[600px] mx-auto">
              {/* 숫자 1-9 */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberPress(num)}
                  className="h-20 bg-white hover:bg-gray-50 text-[30px] font-semibold text-[#2c3e50] transition-colors border border-gray-200"
                >
                  {num}
                </button>
              ))}

              {/* 지우기 버튼 */}
              <button
                onClick={handleDelete}
                className="h-20 bg-[#ffebee] hover:bg-[#ffcdd2] flex items-center justify-center transition-colors border border-gray-200"
              >
                <Delete className="w-7 h-7 text-[#d32f2f]" />
              </button>

              {/* 0 버튼 */}
              <button
                onClick={() => handleNumberPress(0)}
                className="h-20 bg-white hover:bg-gray-50 text-[30px] font-semibold text-[#2c3e50] transition-colors border border-gray-200"
              >
                0
              </button>

              {/* 확인 버튼 */}
              <button
                onClick={handleConfirm}
                className="h-20 bg-[#e3f2fd] hover:bg-[#bbdefb] text-[20px] font-bold text-[#1976d2] transition-colors border border-gray-200"
              >
                확인
              </button>
            </div>

            {/* 처음 화면으로 */}
            <button
              onClick={handleHome}
              className="w-full max-w-[400px] mx-auto bg-white border-2 border-gray-300 text-[#6c757d] py-4 rounded-full text-[20px] font-semibold hover:bg-gray-50 transition-colors mt-4"
            >
              처음 화면으로
            </button>
          </div>
        </div>
      )}

      {/* 2. 확인 중 화면 */}
      {step === 'verifying' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-[60px] font-bold text-[#2c3e50]">코드 확인 중</h1>
            <p className="text-[30px] text-[#6c757d]">잠시만 기다려주세요...</p>
            <div className="mt-8">
              <LoadingSpinner />
            </div>
          </div>
        </div>
      )}

      {/* 3. 오류 화면 */}
      {step === 'error' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-10">
            {/* 경고 아이콘 */}
            <div className="w-40 h-40 bg-[#ff9800] rounded-full flex items-center justify-center">
              <AlertCircle className="w-24 h-24 text-white" strokeWidth={3} />
            </div>

            {/* 타이틀 */}
            <h1 className="text-[60px] font-bold text-[#2c3e50]">
              코드를 확인해주세요
            </h1>

            {/* 설명 */}
            <p className="text-[24px] text-[#6c757d] text-center leading-relaxed">
              입력하신 코드를 확인할 수 없습니다
              <br />
              다시 입력해주세요
            </p>

            {/* 다시 시도 버튼 */}
            <button
              onClick={handleRetry}
              className="w-[300px] bg-[#ff9800] text-white py-5 rounded-full text-[24px] font-bold hover:bg-[#f57c00] transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      )}

      {/* 4. 사물함 개방 화면 */}
      {step === 'locker' && lockerNumber && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-10">
            {/* 자물쇠 아이콘 */}
            <div className="w-40 h-40 bg-[#4caf50] rounded-full flex items-center justify-center">
              <LockOpen className="w-24 h-24 text-white" strokeWidth={3} />
            </div>

            {/* 타이틀 */}
            <h1 className="text-[60px] font-bold text-[#2c3e50]">
              사물함 {lockerNumber}번이 열렸습니다
            </h1>

            {/* 설명 */}
            <p className="text-[24px] text-[#6c757d] text-center leading-relaxed">
              분실물을 수령하신 후
              <br />
              문을 닫아주세요
            </p>

            {/* 수령 완료 버튼 */}
            <button
              onClick={handlePickupComplete}
              className="w-[300px] bg-[#4caf50] text-white py-5 rounded-full text-[24px] font-bold hover:bg-[#45a049] transition-colors"
            >
              수령 완료
            </button>
          </div>
        </div>
      )}

      {/* 5. 완료 화면 */}
      {step === 'complete' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-10">
            {/* 축하 아이콘 */}
            <div className="w-40 h-40 bg-[#1976d2] rounded-full flex items-center justify-center">
              <PartyPopper className="w-24 h-24 text-white" />
            </div>

            {/* 메시지 */}
            <div className="text-center">
              <h1 className="text-[48px] font-bold text-[#2c3e50] mb-4">
                이용해 주셔서 감사합니다
              </h1>
              <p className="text-[24px] text-[#6c757d]">
                잠시 후 처음 화면으로
                <br />
                돌아갑니다
              </p>
            </div>

            {/* 프로그레스 바 */}
            <div className="w-[400px] mt-8">
              <p className="text-[14px] text-[#6c757d] text-center mb-2">
                {timeLeft}초 후 처음 화면으로 돌아갑니다
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#1976d2] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

---
