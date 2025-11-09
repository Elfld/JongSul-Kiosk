type ClassValue = string | number | boolean | undefined | null | ClassValue[];

/**
 * Tailwind CSS 클래스명을 병합하는 유틸리티 함수
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter((x) => typeof x === 'string' && x.length > 0)
    .join(' ')
    .trim();
}
