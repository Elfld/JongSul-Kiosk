// lib/api/kiosk.ts

import type {
  PickupRequest,
  KioskPickupResponse,
  LockerCloseRequest,
  LockerCloseResponse,
  ItemRegisterRequest,
  LockerOpenRequest,
  LockerOpenResponse,
} from '@/lib/types/kiosk';

/**
 * Kiosk API 서비스
 *
 * 키오스크 전용 API 호출을 담당합니다.
 * 외부 API 서버로 직접 요청합니다.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
const API_PREFIX = '/main';

/**
 * 키오스크 장비 이름
 * 환경 변수에서 가져오거나 기본값 사용
 */
export const DEVICE_NAME = process.env.NEXT_PUBLIC_DEVICE_NAME || 'kiosk-1';

/**
 * API 에러 클래스
 */
export class KioskApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
    public detail?: string
  ) {
    super(message);
    this.name = 'KioskApiError';
  }
}

/**
 * POST 요청 헬퍼
 */
async function post<T>(endpoint: string, body: unknown): Promise<T> {
  const url = `${API_BASE_URL}${API_PREFIX}${endpoint}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    // 네트워크 에러 (CORS, 서버 다운 등)
    throw new KioskApiError(
      `네트워크 오류: 서버에 연결할 수 없습니다 (${url})`,
      0,
      'Network Error'
    );
  }

  if (!response.ok) {
    // 에러 응답 본문에서 detail 추출 시도
    let detail: string | undefined;
    try {
      const errorBody = await response.json();
      detail = errorBody.detail;
    } catch {
      // JSON 파싱 실패 시 무시
    }

    throw new KioskApiError(
      detail || `API Error: ${response.status} ${response.statusText}`,
      response.status,
      response.statusText,
      detail
    );
  }

  // 빈 응답 처리 (register/request)
  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  return JSON.parse(text);
}

/**
 * Kiosk API 서비스
 */
export const kioskApi = {
  /**
   * 픽업 코드 검증 및 사물함 열기
   * POST /kiosk/pickup
   *
   * @param pickupCode 6자리 픽업 코드
   * @returns 검증 결과 및 아이템 정보
   */
  async pickup(pickupCode: string): Promise<KioskPickupResponse> {
    const body: PickupRequest = {
      pickup_code: pickupCode,
    };
    return post<KioskPickupResponse>('/kiosk/pickup', body);
  },

  /**
   * 사물함 닫기
   * POST /kiosk/locker/close
   *
   * @param pickupCode 픽업 코드 (아이템 식별용)
   * @returns 닫기 결과
   */
  async closeLocker(pickupCode: string): Promise<LockerCloseResponse> {
    const body: LockerCloseRequest = {
      pickup_code: pickupCode,
    };
    return post<LockerCloseResponse>('/kiosk/locker/close', body);
  },

  /**
   * 분실물 등록 촬영 요청
   * POST /kiosk/register/request
   *
   * @param deviceName 장비 이름
   * @param location 수거 위치 (선택)
   * @returns 빈 응답
   */
  async registerRequest(
    deviceName: string = DEVICE_NAME,
    location?: string
  ): Promise<void> {
    const body: ItemRegisterRequest = {
      device_name: deviceName,
      location: location ?? null,
    };
    await post<Record<string, never>>('/kiosk/register/request', body);
  },

  /**
   * 투입구/사물함 열기
   * POST /kiosk/locker/open
   *
   * @param options 열기 옵션
   * @returns 열기 결과
   */
  async openLocker(options: {
    deviceName?: string;
    lockerId?: number;
    openChute?: boolean;
  }): Promise<LockerOpenResponse> {
    const body: LockerOpenRequest = {
      device_name: options.deviceName ?? DEVICE_NAME,
      locker_id: options.lockerId ?? null,
      open_chute: options.openChute ?? false,
    };
    return post<LockerOpenResponse>('/kiosk/locker/open', body);
  },

  /**
   * 투입구 열기 (편의 함수)
   * open_chute: true로 호출
   */
  async openChute(deviceName: string = DEVICE_NAME): Promise<LockerOpenResponse> {
    return this.openLocker({
      deviceName,
      openChute: true,
    });
  },
};
