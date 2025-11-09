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
