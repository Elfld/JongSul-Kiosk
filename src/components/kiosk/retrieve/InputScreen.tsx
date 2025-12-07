'use client';

import { KioskLayout, KioskButton, PinInput, NumPad } from '@/components/kiosk';

interface InputScreenProps {
  pinCode: string;
  onPinChange: (code: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function InputScreen({ pinCode, onPinChange, onSubmit, onBack }: InputScreenProps) {
  return (
    <KioskLayout>
      <div className="flex flex-col gap-[clamp(16px,3vmin,28px)]">
        <h1 className="text-[clamp(28px,6vmin,56px)] font-bold text-[#2c3e50] text-center whitespace-nowrap">
          분실물 수령
        </h1>

        <p className="text-[clamp(16px,3.5vmin,32px)] text-[#6c757d] text-center">
          홈페이지에서 발급받은<br />비밀번호 6자리를 입력해주세요
        </p>

        <PinInput pinCode={pinCode} />

        <NumPad
          onNumberClick={(num) => {
            if (pinCode.length < 6) {
              onPinChange(pinCode + num);
            }
          }}
          onDelete={() => {
            if (pinCode.length > 0) {
              onPinChange(pinCode.slice(0, -1));
            }
          }}
          onSubmit={onSubmit}
          submitDisabled={pinCode.length !== 6}
        />

        <KioskButton
          variant="secondary"
          fullWidth
          onClick={onBack}
          className="mt-[clamp(12px,2vmin,24px)]"
        >
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
