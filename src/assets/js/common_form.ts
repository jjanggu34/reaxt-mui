/**
 * @fileoverview 이 파일은 폼 유요성 검사 함수 모음
 *
 * 주요 기능:
 * - 이메일 형식이 올바른지 검사하는 validateEmail 함수
 * - 비밀번호의 최소 길이를 확인하는 validatePassword 함수
 *
 * 사용 예시:
 * import CommonFORM from '@assets/js/common_form';
 *
 * @author 
 * @version 1.0.0
 */

/**
 * 이메일 유효성 검사 함수
 *
 * @param {string} email - 검사할 이메일 주소
 * @returns {{ isValid: boolean; errorMessage?: string }} 이메일이 유효하면 isValid가 true, 그렇지 않으면 false와 에러 메시지를 반환합니다.
 */
export function validateEmail(email: string): { isValid: boolean; errorMessage?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      return { isValid: true };
    } else {
      return { isValid: false, errorMessage: '올바른 이메일 주소가 아닙니다.' };
    }
  }
  
  /**
   * 비밀번호 유효성 검사 함수
   *
   * 최소 길이를 기본 8자로 설정합니다.
   *
   * @param {string} password - 검사할 비밀번호
   * @param {number} [minLength=8] - 비밀번호의 최소 길이 (기본값: 8)
   * @returns {{ isValid: boolean; errorMessage?: string }} 비밀번호가 유효하면 isValid가 true, 그렇지 않으면 false와 에러 메시지를 반환합니다.
   */
  export function validatePassword(
    password: string,
    minLength: number = 8
  ): { isValid: boolean; errorMessage?: string } {
    if (password.length >= minLength) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        errorMessage: `비밀번호는 최소 ${minLength}자 이상이어야 합니다.`,
      };
    }
  }
  