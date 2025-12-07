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
      <div className="flex flex-col gap-[1.5vmin]">
        <h1 className="text-[clamp(24px,4.5vmin,68px)] font-bold text-[#2c3e50] text-center">
          분실물 수령
        </h1>

        <p className="text-[clamp(14px,2.5vmin,34px)] text-[#6c757d] text-center leading-relaxed">
          홈페이지에서 발급받은
          <br />
          비밀번호 6자리를 입력해주세요
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
          className="max-w-[clamp(220px,40vmin,430px)] mt-[2vmin] mx-auto"
        >
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
