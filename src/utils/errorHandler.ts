import { GLog } from '../assets/js/common';

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: unknown;
}

export class ErrorHandler {
  static handle(error: unknown): ErrorResponse {
    if (error instanceof Error) {
      return {
        message: error.message,
        details: error.stack
      };
    }
    
    if (typeof error === 'string') {
      return {
        message: error
      };
    }

    return {
      message: '알 수 없는 오류가 발생했습니다.',
      details: error
    };
  }

  static log(error: unknown, context?: string): void {
    const errorResponse = this.handle(error);
    GLog.e(`${context || 'Error'}: ${errorResponse.message}`, errorResponse.details);
  }

  static isNetworkError(error: unknown): boolean {
    return error instanceof Error && 
           (error.message.includes('network') || 
            error.message.includes('Network Error'));
  }

  static isAuthError(error: unknown): boolean {
    return error instanceof Error && 
           (error.message.includes('401') || 
            error.message.includes('403') ||
            error.message.includes('unauthorized'));
  }
} 