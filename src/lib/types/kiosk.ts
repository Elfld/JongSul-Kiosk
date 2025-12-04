// ============================================================
// UI 상태 타입
// ============================================================

export type RegisterStep =
  | 'wait'
  | 'insert'
  | 'processing'
  | 'confirm'
  | 'complete';

export type RetrieveStep =
  | 'input'
  | 'verifying'
  | 'error'
  | 'locker'
  | 'complete';

// ============================================================
// API 공통 타입
// ============================================================

export interface TagResponse {
  id: number;
  name: string;
}

export interface ItemResponse {
  id: number;
  photo_url: string;
  location?: string | null;
  locker_id?: number | null;
  device_name?: string | null;
  status: string;
  registered_at: string;
  tags: TagResponse[];
}

// ============================================================
// API Request 타입
// ============================================================

/** POST /kiosk/pickup */
export interface PickupRequest {
  pickup_code: string;
}

/** POST /kiosk/locker/close */
export interface LockerCloseRequest {
  pickup_code: string;
}

/** POST /kiosk/register/request */
export interface ItemRegisterRequest {
  device_name: string;
  location?: string | null;
}

/** POST /kiosk/locker/open */
export interface LockerOpenRequest {
  device_name: string;
  locker_id?: number | null;
  open_chute?: boolean;
}

// ============================================================
// API Response 타입
// ============================================================

/** POST /kiosk/pickup 응답 */
export interface KioskPickupResponse {
  message: string;
  item: ItemResponse;
}

/** POST /kiosk/locker/close 응답 */
export interface LockerCloseResponse {
  message: string;
  locker_id: number;
  device_name: string;
}

/** POST /kiosk/locker/open 응답 */
export interface LockerOpenResponse {
  message: string;
  locker_id: number | null;
  device_name: string;
  aws_request_id?: string | null;
}

// ============================================================
// 에러 타입
// ============================================================

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

// ============================================================
// UI용 변환 타입 (기존 호환)
// ============================================================

export interface KioskItemData {
  id: string;
  photoUrl: string;
  tags: string[];
  foundDate: string;
  location: string;
}

export interface PickupCodeData {
  code: string;
  lockerNumber: number;
}
