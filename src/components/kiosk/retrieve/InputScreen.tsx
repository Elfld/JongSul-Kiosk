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
      <div className="flex flex-col gap-[4vmin]">
        <h1 className="text-[max(32px,12vmin)] font-bold text-[#2c3e50] text-center">
          분실물 수령
        </h1>

        <p className="text-[max(20px,7vmin)] text-[#6c757d] text-center leading-relaxed">
          홈페이지에서 발급받은 비밀번호 6자리를 입력해주세요
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
          className="mx-auto"
        />

        <KioskButton
          variant="secondary"
          fullWidth
          onClick={onBack}
          className="max-w-[70vmin] mt-[4vmin] mx-auto"
        >
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
